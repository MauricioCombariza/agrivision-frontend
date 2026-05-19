# Censo Vivo — Plan del MVP
> AgriVision | Abril 2026
> Hipótesis central: la certeza de exportación no viene de predecir el futuro — viene de saber exactamente qué tienes hoy, y de que tu historia te diga cuánto vas a tener la próxima semana.

---

## La idea en una sola frase

El Censo Vivo es la combinación de dos motores que se alimentan mutuamente:

```
MOTOR 1 — EL OJO                     MOTOR 2 — LA MEMORIA
Computer Vision                       XGBoost sobre históricos

"¿Qué tengo HOY?"              +      "¿Qué voy a tener en 14 días?"
Foto → estado de cada planta          Datos históricos + estado actual → proyección

                    ↓ se validan mutuamente ↓

        "¿Puedo confirmar este pedido? SÍ / BORDERLINE / NO"
```

Cada semana, el censo da el estado real → XGBoost proyecta con ese dato. Cuando llega la semana proyectada, el nuevo censo confirma o corrige la predicción. El modelo aprende. La precisión mejora.

---

## Por qué este diseño resuelve el problema del Día 1

El problema clásico del agtech: sin históricos, no hay modelo. Sin modelo, no hay valor. Sin valor, no hay cliente.

El Censo Vivo lo resuelve con dos fases paralelas:

| Fase | Qué usa | Qué entrega | Cuándo |
|------|---------|-------------|--------|
| **Fase A — Biológica** | Solo el censo de hoy + tabla de tiempos biológicos conocidos | Proyección basada en fisiología (sin ML) | Día 1 |
| **Fase B — Estadística** | Históricos del cliente (Excel/planillas) + estado actual del censo | Proyección XGBoost calibrada al cliente | Semana 3–4 |
| **Fase C — Validada** | Fase A + B + ciclos de comparación | Proyección con error medido y reduciéndose | Mes 2+ |

En la Fase A el modelo no existe — la biología calcula. En la Fase B llega XGBoost. En la Fase C el bucle de validación cierra: la predicción de hace dos semanas se compara con el censo de hoy y el modelo se actualiza.

---

## Arquitectura técnica del MVP

```
┌─────────────────────────────────────────────────────────────────┐
│  CAMPO                                                           │
│                                                                  │
│  Operador                                                        │
│  → Celular Android (PWA)                                         │
│  → Foto 640×640 por cama                                         │
│  → POST a backend                                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  BACKEND — FastAPI en Hetzner VPS (ya configurado)              │
│                                                                  │
│  /infer    → YOLOv8n: foto → conteo por estado fisiológico      │
│  /census   → guarda conteo por cama / lote / fecha              │
│  /upload   → ingesta CSV histórico del cliente                   │
│  /predict  → XGBoost: estado actual + histórico → proyección    │
│  /validate → compara predicción pasada vs censo real actual      │
└──────┬────────────────────────────────┬───────────────────────-─┘
       │                                │
┌──────▼──────────┐          ┌──────────▼─────────────┐
│  ML LAYER       │          │  DATA LAYER            │
│                 │          │                        │
│  YOLOv8n        │          │  PostgreSQL             │
│  (5 estados     │          │  · tabla: censos       │
│   fisiológicos) │          │  · tabla: históricos   │
│                 │          │  · tabla: predicciones │
│  XGBoost        │          │  · tabla: validaciones │
│  (producción    │          │                        │
│   T+7/14/21)    │          │  MinIO: imágenes raw   │
└─────────────────┘          └────────────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────┐
│  DASHBOARD — Streamlit (MVP) → Next.js (producción)             │
│                                                                  │
│  Vista 1: Censo hoy — inventario por estado y por lote          │
│  Vista 2: Proyección — tallos esperados en 7 / 14 / 21 días     │
│  Vista 3: Validación — error acumulado del modelo               │
│  Vista 4: Decisión — ¿puedo confirmar este pedido?              │
└─────────────────────────────────────────────────────────────────┘
```

---

## El modelo de datos: qué guarda cada motor

### Motor 1 — Censo Vivo (CV)

Cada foto genera un registro con:

```
censo_registro
─────────────────────────────────────────
finca_id        → ID de la finca
lote_id         → ej. "Bloque 3 - Nave 2"
variedad        → "Rosa Freedom"
fecha           → 2026-04-25
estado_1        → plantas en estado 0–20% apertura
estado_2        → plantas en estado 20–40%
estado_3        → plantas en estado 40–60%
estado_4        → plantas en estado 60–80%
estado_5        → plantas en estado 80–100% (punto de corte)
imagen_path     → ruta en MinIO
confidence_avg  → promedio de confianza del modelo (0–1)
validado_por    → NULL / "jefe_produccion" / "fundador"
```

### Motor 2 — XGBoost (predictor)

**Features de entrada:**

| Grupo | Feature | Fuente |
|-------|---------|--------|
| **Estado actual** | Conteo por estado (5 valores) | Censo Vivo |
| **Distribución** | Varianza entre estados del lote | Censo Vivo |
| **Tiempo** | Semana del año (sin/cos), días hasta próxima temporada alta | Calendario |
| **Histórico reciente** | Producción real últimas 4 semanas (mismo lote) | Planillas cliente |
| **Histórico anual** | Producción misma semana, año anterior y anterior | Planillas cliente |
| **Ambiente** | Temperatura semanal promedio, altitud finca (fijo) | Open-Meteo API (gratis) |
| **Velocidad de avance** | Diferencia de estado entre censo anterior y actual | Censo Vivo |

**Target variable (qué predice):**

```
Y = tallos cosechables en T+7   (predicción a 1 semana)
Y = tallos cosechables en T+14  (predicción a 2 semanas) ← la más útil comercialmente
Y = tallos cosechables en T+21  (predicción a 3 semanas)
```

**Por qué walk-forward validation (no split aleatorio):**

En series de tiempo, el split aleatorio filtra el futuro al pasado — el modelo aprende a hacer trampa. El walk-forward obliga al modelo a predecir solo con lo que sabía en ese momento:

```
Semana 1:  [datos] → predice semana 3
Semana 2:  [datos + sem 1] → predice semana 4
Semana 3:  [datos + sem 1-2] → predice semana 5 + valida predicción de semana 3
...
Semana N:  [datos + sem 1..N-1] → predice semana N+2 + valida N semanas de errores
```

---

## El bucle de validación: cómo el sistema aprende

Este es el motor de mejora continua. Es simple y automatizable desde la semana 3.

```
LUNES
  XGBoost genera predicción para T+14
  Guarda en tabla: predicciones(fecha_predicción, fecha_target, lote, tallos_proyectados)

DOS SEMANAS DESPUÉS (LUNES)
  Censo Vivo captura el estado real del lote
  Sistema extrae el conteo de estado_5 (plantas en punto de corte)
  Compara: error = |proyectado - real| / real × 100

SI error > 25% por 2 semanas seguidas:
  → Alerta al fundador: "Modelo desajustado en Lote 3 — revisar"
  → Reentrenar XGBoost con los últimos 8 ciclos

CADA 4 SEMANAS (automático):
  Reentrenamiento completo con todos los datos acumulados
  Comparar MAPE nuevo vs anterior
  Registrar en tabla: versiones_modelo(fecha, mape, n_observaciones)
```

**Métricas del bucle:**

| Métrica | Fórmula | Objetivo MVP | Objetivo mes 3 |
|---------|---------|-------------|----------------|
| MAPE (error promedio) | Σ\|real-pred\|/real / n | < 25% | < 15% |
| Ciclos con error > 30% | Conteo | < 2 seguidos | 0 |
| Velocidad de mejora | MAPE semana N / MAPE semana 1 | — | < 0.6 (mejora 40%) |

---

## Pasos del MVP — Secuencia de construcción

### Paso 0 — Dataset (Semanas 1–2)
*Antes de escribir una línea de código del producto*

**Qué hacer:**
- Anotar 400–600 imágenes de flores colombianas en 5 estados fisiológicos
  - Estado 1: botón cerrado 0–20%
  - Estado 2: botón abriendo 20–40%
  - Estado 3: semi-abierta 40–60% ← la más crítica comercialmente
  - Estado 4: casi abierta 60–80%
  - Estado 5: punto de corte / listo 80–100%
- Herramienta: LabelImg o Roboflow (gratis hasta 10K imágenes)
- Formato: YOLO (.txt con bounding boxes normalizados)
- Distribución objetivo: al menos 80 imágenes por clase, con variedad de luz y ángulo

**Criterio de avance:** 400+ imágenes anotadas y validadas por el jefe de producción de un cliente actual.

---

### Paso 1 — Modelo CV (Semana 2–3)

**Qué construir:**
```python
# Entrenar YOLOv8n (nano — 3.2M params, 6MB, rápido en mobile)
from ultralytics import YOLO
model = YOLO("yolov8n.pt")  # punto de partida pre-entrenado (COCO)
model.train(
    data="flores.yaml",     # dataset propio
    epochs=50,
    imgsz=640,
    batch=16,
    name="flores_v1"
)
```

**flores.yaml:**
```yaml
path: ./dataset
train: images/train
val: images/val
nc: 5
names: ["estado_1", "estado_2", "estado_3", "estado_4", "estado_5"]
```

**Validación antes de producción:**
- Sesión ciega con jefe de producción: 50 fotos sin mostrar predicción
- El jefe clasifica manualmente → comparar con modelo
- Umbral mínimo: 80% concordancia para avanzar. 85% para cobrar.

**Exportar a ONNX** (para servir desde FastAPI sin GPU):
```python
model.export(format="onnx", optimize=True)
```

---

### Paso 2 — Backend mínimo (Semana 3)

**FastAPI — 4 endpoints para el MVP:**

```python
# endpoint 1: inferencia
POST /infer
  body: { image: base64, lote_id, variedad, finca_id }
  response: { estado_1: 12, estado_2: 45, estado_3: 89,
              estado_4: 34, estado_5: 8, confidence_avg: 0.87 }

# endpoint 2: guardar censo
POST /census
  body: resultado del /infer + fecha + operador_id
  response: { censo_id, guardado: true }

# endpoint 3: subir histórico del cliente
POST /historical
  body: CSV con columnas: fecha, lote, variedad, tallos_cosechados
  response: { filas_importadas: 156, rango: "2023-01-01 / 2025-12-31" }

# endpoint 4: proyección
GET /predict?lote_id=3&variedad=freedom&horizon=14
  response: { tallos_proyectados: 3840, intervalo: [3200, 4480],
              modelo: "xgb_v3", mape_actual: 0.17 }
```

**Base de datos (PostgreSQL — esquema mínimo):**

```sql
CREATE TABLE censos (
  id SERIAL PRIMARY KEY,
  finca_id INT, lote_id TEXT, variedad TEXT,
  fecha DATE,
  estado_1 INT, estado_2 INT, estado_3 INT, estado_4 INT, estado_5 INT,
  confidence_avg FLOAT,
  validado BOOLEAN DEFAULT FALSE
);

CREATE TABLE historicos (
  id SERIAL PRIMARY KEY,
  finca_id INT, lote_id TEXT, variedad TEXT,
  semana DATE,
  tallos_cosechados INT
);

CREATE TABLE predicciones (
  id SERIAL PRIMARY KEY,
  finca_id INT, lote_id TEXT,
  fecha_prediccion DATE,  -- cuándo se hizo la predicción
  fecha_target DATE,      -- para cuándo es la predicción (T+14)
  tallos_proyectados INT,
  intervalo_bajo INT,
  intervalo_alto INT,
  modelo_version TEXT
);

CREATE TABLE validaciones (
  id SERIAL PRIMARY KEY,
  prediccion_id INT REFERENCES predicciones(id),
  tallos_reales INT,      -- del censo que llegó en fecha_target
  error_pct FLOAT,
  fecha_validacion DATE
);
```

---

### Paso 3 — App de campo (Semana 3–4)

**PWA (Progressive Web App) — no Play Store, funciona en cualquier Android:**

La app de campo tiene exactamente tres pantallas:

```
PANTALLA 1 — Captura
  [ Botón grande: 📷 FOTOGRAFIAR CAMA ]
  Selector: Lote → Nave → Variedad
  Sin login complejo: PIN de 4 dígitos por operador

PANTALLA 2 — Resultado (aparece en < 10 segundos)
  ┌─────────────────────────────┐
  │  Lote 3 · Rosa Freedom      │
  │  Fotos: 4 · Plantas: ~188   │
  │                             │
  │  Estado 1  ░░░░░░    12%    │
  │  Estado 2  ████░░    28%    │
  │  Estado 3  ████████  40%    │ ← destacado
  │  Estado 4  ████      15%    │
  │  Estado 5  ██         5%    │
  │                             │
  │  ⚠️ Ninguna alerta hoy      │
  │  [ GUARDAR ] [ NUEVA FOTO ] │
  └─────────────────────────────┘

PANTALLA 3 — Confirmación
  "Guardado ✓ — Semana 17, Lote 3"
```

**Stack:** HTML + Vanilla JS + service worker (sin framework — reduce complejidad para el MVP). La cámara usa `getUserMedia()`. El envío es un `fetch()` al backend.

---

### Paso 4 — Dashboard gerencial (Semana 4)

**Streamlit para el MVP (2–3 días de desarrollo):**

**Vista 1: Censo de hoy**

```python
# Tabla de inventario por lote
st.subheader("Inventario fisiológico — hoy")
df = query_today_census(finca_id)
st.dataframe(df[["lote", "variedad", "estado_3+4+5", "dias_al_corte_estimado"]])
```

Columna `dias_al_corte_estimado` = calculada con tabla biológica hardcodeada:

```python
TIEMPO_BIOLOGICO = {
    ("Rosa Freedom", "estado_3", 2600): (8, 14),   # (min, max) días al corte
    ("Rosa Freedom", "estado_4", 2600): (4, 8),
    ("Rosa Freedom", "estado_5", 2600): (1, 3),
    ("Clavel Nobbio", "estado_3", 2400): (10, 16),
    # ... completar por variedad × altitud
}
```

**Vista 2: Proyección (aparece desde semana 3)**

```
┌─────────────────────────────────────────────────────┐
│  PROYECCIÓN — próximas 3 semanas                    │
│                                                      │
│  Semana 19 (en 7 días):    1.240 tallos  (±18%)    │
│  Semana 20 (en 14 días):   3.840 tallos  (±14%)  ← │
│  Semana 21 (en 21 días):   2.100 tallos  (±22%)    │
│                                                      │
│  Modelo: XGBoost v3 · Error histórico: 16.2%        │
└─────────────────────────────────────────────────────┘
```

---

### Paso 5 — XGBoost (Semana 4–6)

**Solo se activa cuando hay dos condiciones:**
1. El cliente entregó su histórico (≥ 1 año de producción por lote)
2. Hay al menos 3 censos capturados del mismo lote (para calcular velocidad de avance)

**Preparación de features:**

```python
def build_features(lote_id, finca_id, target_horizon=14):
    # Features del censo actual
    censo = get_latest_census(lote_id)
    features = {
        "e1": censo.estado_1, "e2": censo.estado_2,
        "e3": censo.estado_3, "e4": censo.estado_4, "e5": censo.estado_5,
        "varianza_estados": np.std([censo.e1, ..., censo.e5]),
        
        # Velocidad de avance vs censo anterior
        "delta_e3": censo.estado_3 - get_prev_census(lote_id, weeks=1).estado_3,
        
        # Tiempo (encodificado cíclicamente para capturar estacionalidad)
        "semana_sin": np.sin(2 * np.pi * censo.fecha.isocalendar().week / 52),
        "semana_cos": np.cos(2 * np.pi * censo.fecha.isocalendar().week / 52),
        "dias_a_san_valentin": days_to_next_holiday("san_valentin", censo.fecha),
        
        # Histórico del cliente (producción de lote en semanas equivalentes)
        "prod_semana_pasada": get_historical_production(lote_id, offset=-1),
        "prod_hace_2_semanas": get_historical_production(lote_id, offset=-2),
        "prod_mismo_periodo_año_anterior": get_historical_production(lote_id, year=-1),
        
        # Ambiente
        "temp_promedio_semana": get_weather(finca_id, "temperature_mean"),
        "altitud": get_finca_metadata(finca_id)["altitud"],
    }
    return features
```

**Entrenamiento inicial:**

```python
from xgboost import XGBRegressor

# Construir dataset con walk-forward
X, y = build_walkforward_dataset(finca_id, lote_id, horizon=14)

model = XGBRegressor(
    n_estimators=200,
    max_depth=4,          # profundidad baja para evitar overfitting con pocos datos
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], early_stopping_rounds=20)
```

**Mínimo de datos para activar XGBoost:**

| Escenario | Datos mínimos | Qué predice | Confianza esperada |
|-----------|--------------|-------------|-------------------|
| Solo histórico (sin censo) | 1 año de planillas | Promedio por temporada | Baja (25-35% error) |
| Histórico + 2 censos | 1 año + 2 capturas | Ajuste al estado actual | Media (18-25% error) |
| Histórico + 6 censos | 1 año + 6 capturas | Proyección calibrada | Alta (<15% error) |
| Solo censo (sin histórico) | 4+ censos | Tendencia reciente | Media (20-30% error) |

**Cuando no hay suficientes datos:** mostrar la proyección biológica (Fase A) con una nota: *"Proyección basada en fisiología de la variedad — el modelo estadístico se activará en la semana X con sus datos históricos."*

---

### Paso 6 — Bucle de validación automático (Semana 7+)

Este paso se programa una sola vez y corre solo cada lunes:

```python
# cron: cada lunes a las 7am
def run_weekly_validation():
    # Para cada predicción hecha hace exactamente 14 días
    predictions_to_validate = db.query("""
        SELECT * FROM predicciones
        WHERE fecha_target = CURRENT_DATE
        AND validada = FALSE
    """)
    
    for pred in predictions_to_validate:
        # El censo de hoy es la verdad
        actual_census = db.query("""
            SELECT SUM(estado_5) as listos
            FROM censos
            WHERE lote_id = %s AND fecha = CURRENT_DATE
        """, pred.lote_id)
        
        if actual_census:
            error_pct = abs(pred.tallos_proyectados - actual_census.listos) / actual_census.listos
            db.insert("validaciones", {
                "prediccion_id": pred.id,
                "tallos_reales": actual_census.listos,
                "error_pct": error_pct,
                "fecha_validacion": date.today()
            })
            
            # Alerta si el error es demasiado alto dos semanas seguidas
            if check_consecutive_high_errors(pred.lote_id, threshold=0.25, n=2):
                send_whatsapp_alert(
                    f"Modelo desajustado en {pred.lote_id}: "
                    f"error {error_pct:.0%} dos semanas seguidas. Revisar."
                )
    
    # Reentrenamiento mensual
    if date.today().day == 1:  # primer lunes del mes
        retrain_all_models()
```

---

## Lo que más valor genera — La pantalla única del MVP

De todo lo que puede hacer el sistema, **una sola pantalla resuelve el 80% del dolor del gerente:**

```
┌──────────────────────────────────────────────────────────────┐
│            ¿PUEDO CONFIRMAR ESTE PEDIDO?                     │
│                    Finca El Rosal │ Lunes 25 de abril        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Tu pedido de Miami:  5.000 Rosa Freedom │ Semana 20        │
│                                                              │
│  Lo que tienes hoy:                                          │
│    Estado 3 (8-14 días):   960 plantas                      │
│    Estado 4 (4-8 días):    640 plantas                      │
│    Estado 5 (1-3 días):    112 plantas                      │
│                                                              │
│  Proyección semana 20:   4.720 tallos  (±14%)               │
│  Rango posible:          [4.060 – 5.380]                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ⚠️  BORDERLINE                                     │    │
│  │  El rango toca el pedido pero el centro queda       │    │
│  │  280 tallos por debajo.                             │    │
│  │                                                     │    │
│  │  Opciones:                                          │    │
│  │  A) Confirmar 4.500 y cubrir el resto con otro lote │    │
│  │  B) Activar Bloque B (estimado +650 tallos)         │    │
│  │  C) Confirmar los 5.000 asumiendo el riesgo         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Por qué esta pantalla es el MVP:**
- El gerente llega con UN número: el pedido que tiene que confirmar
- La pantalla le devuelve UN veredicto: VERDE / AMARILLO / ROJO
- Le da exactamente las opciones que puede tomar en los próximos 30 minutos
- No necesita entender CV ni XGBoost — necesita saber si puede llamar a Miami

**Las reglas de semáforo:**

| Estado | Condición | Qué hace el gerente |
|--------|-----------|-------------------|
| VERDE | Proyección mínima ≥ pedido | Confirma confiado |
| AMARILLO | Rango cubre el pedido pero proyección central < pedido | Confirma con plan B preparado |
| ROJO | Rango máximo < pedido | Negocia el volumen antes de confirmar |

---

## Foco máximo para el MVP — Qué NO construir todavía

El mayor riesgo del MVP es construir demasiado. Estas son las cosas que se ven importantes pero no son el núcleo:

| Tentación | Por qué no todavía |
|-----------|-------------------|
| Dashboard con muchos gráficos y filtros | El gerente necesita UN número, no un BI |
| Detección de enfermedades en el MVP | Es alto valor pero requiere dataset diferente — separar en sprint 2 |
| Módulo de logística (QR / pallets) | Es el problema #3 — resolver #1 primero |
| Notificaciones push automáticas | El WhatsApp del fundador es más confiable en esta etapa |
| Integración con ERP del cliente | No existe o es tan complejo que bloquea el piloto |
| App en Play Store | La PWA funciona igual y no requiere aprobación |
| Múltiples variedades desde el inicio | Comenzar con las 2-3 variedades del primer cliente, escalar después |

**El criterio de construcción para el MVP:**
> Si no ayuda al gerente a responder "¿puedo confirmar este pedido esta semana?", no entra al MVP.

---

## Secuencia de valor por semana

```
SEMANA 1
  Fundador en campo → fotos del cultivo
  LabelImg → anotar 200 imágenes
  Valor entregado: cero aún

SEMANA 2
  Completar 400 imágenes anotadas
  Entrenar YOLOv8n — validar con jefe de producción
  Valor entregado: demo interna

SEMANA 3 ← PRIMER VALOR REAL
  PWA en el celular del operador → captura en campo
  FastAPI /infer funcionando
  Dashboard Streamlit: "tienes 960 plantas en estado 3"
  Tabla biológica: "listas en 8-14 días → ~960 tallos semana 3"
  ★ El gerente ve sus flores en datos por primera vez

SEMANA 4
  Histórico del cliente cargado en PostgreSQL
  Primera proyección XGBoost (aunque sea imprecisa)
  "Proyección: 4.720 tallos semana 20 (±25%)"

SEMANA 6 ← PRIMERA DECISIÓN REAL CON DATOS
  El gerente abre el dashboard antes de llamar a Miami
  Confirma un pedido con los datos de AgriVision
  ★ Este es el momento de retención permanente

SEMANA 8
  Primera validación: predicción semana 6 vs censo real
  Error medido, documentado, modelo reentrenado
  MAPE primera versión: 20-25% (normal)

MES 3
  6 ciclos de validación completados
  MAPE < 15% (objetivo)
  El gerente confirma pedidos sin llamar al fundador primero
  ★ Este es el momento de proponer renovación anual
```

---

## Stack técnico recomendado para el MVP

| Componente | Tecnología | Razón |
|-----------|-----------|-------|
| CV Model | YOLOv8n (Ultralytics) | Nano = 6MB, rápido, state-of-art en detección objetos |
| Backend | FastAPI + Python 3.11 | Ya conocido, rápido de construir, async |
| App de campo | PWA (HTML+JS vanilla) | Sin Play Store, funciona en cualquier Android, 0 fricción |
| Dashboard | Streamlit → Next.js | Streamlit para MVP rápido, migrar cuando haya >3 clientes |
| Base de datos | PostgreSQL (Hetzner) | Ya configurado en el VPS existente |
| ML predictor | XGBoost 2.0 | Robusto con pocos datos, interpretable, sin GPU |
| Imágenes | MinIO (ya configurado) | Ya está en el stack |
| Inferencia | ONNX Runtime | Serve el modelo CV sin dependencia de PyTorch en producción |
| Weather API | Open-Meteo | Gratis, sin key, retorna temperatura histórica y actual |
| Cron | APScheduler dentro de FastAPI | Sin servicios adicionales, reentrenamiento automático |

**Costo de infraestructura del MVP:** < $15 USD/mes (VPS Hetzner CX31 ya existente)

---

## Criterios de salida de cada fase

| Fase | Criterio de salida | Cómo medirlo |
|------|--------------------|-------------|
| Paso 0 (Dataset) | 400+ imágenes anotadas, 80+ por clase | Contar archivos en LabelImg |
| Paso 1 (CV) | Accuracy ≥ 80% en validación con jefe de producción | Sesión de 50 fotos ciegas |
| Paso 2 (Backend) | /infer responde en < 10 segundos con resultado correcto | Test manual con 10 fotos |
| Paso 3 (App) | Operador captura y recibe resultado sin ayuda del fundador | Observar sin intervenir |
| Paso 4 (Dashboard) | Gerente abre el dashboard y entiende qué tiene en su cultivo | Preguntarle sin explicarle |
| Paso 5 (XGBoost) | Primera proyección generada con datos reales | Log del sistema |
| Paso 6 (Validación) | Primera comparación proyección vs real documentada | Tabla validaciones |
| **★ MVP completo** | **El gerente consulta el dashboard antes de llamar a Miami** | **Observación directa** |

---

## Preguntas que deben responderse antes de empezar el Paso 0

1. **¿Qué variedades tiene el primer cliente piloto y en qué altitud está la finca?** La tabla biológica del Paso 3 depende de esto — construirla para las variedades reales, no para las genéricas.

2. **¿El primer cliente tiene planillas o Excel de producción histórica?** Preguntar específicamente: ¿tienen registros semana a semana por lote y variedad? Si solo tienen totales mensuales, el XGBoost tardará más en calibrarse.

3. **¿El operador de campo usa Android o iPhone?** La PWA funciona en ambos, pero el comportamiento de la cámara varía. Confirmar el modelo de teléfono para probar antes del Día Cero.

4. **¿El jefe de producción puede dar 2 horas para validar el modelo antes del lanzamiento?** La sesión de validación ciega (Paso 1) es crítica — sin ella, el modelo puede lanzarse con un error de clase que el fundador no detecta pero el cliente sí.

5. **¿Cuántos lotes piloto empezamos?** Recomendación: 2-3 lotes máximo en el primer mes. El error en el primer lote sirve para calibrar el modelo antes de expandir.

---

*censo_vivo.md — AgriVision | Abril 2026*

---

*Fuentes de respaldo:*
- *XGBoost crop yield prediction con time series: PMC / PLOS ONE 2024–2026*
- *YOLOv8 flower phenological classification: MDPI Agronomy 2023, Ultralytics 2025*
- *Accuracy flores con CV: hasta 96.77% (ScienceDirect 2025)*
- *Tiempo biológico Rosa Freedom: conocimiento de dominio del fundador*

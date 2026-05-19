# Modelo Operativo Piloto — AgriVision
> Flujo completo: Alistamiento → Ejecución → Cierre | Tiempo total: 12 semanas

---

## ALISTAMIENTO — Semanas 1–2
*Todo lo que debe estar listo antes de pisar la finca. Si falla aquí, falla frente al cliente.*

| Componente | Qué se prepara | Criterio de salida |
|------------|---------------|-------------------|
| **Modelo CV** | Anotar 400–600 imágenes · Entrenar YOLOv8n · Exportar a ONNX | mAP@0.5 ≥ 0.75 en dataset de validación |
| **App de campo** | PWA offline (3 pantallas) · Endpoint `/infer` < 10 segundos · Upload con confirmación visual | Demo interna: foto → clasificación → dashboard en < 2 minutos |
| **Backend** | FastAPI + PostgreSQL (censos, históricos, predicciones, validaciones) · MinIO para imágenes | 4 endpoints respondiendo: `/infer`, `/census`, `/historical`, `/predict` |
| **Dashboard** | Streamlit: inventario por estado por lote · Pantalla semáforo "¿Puedo confirmar el pedido?" | Gerente puede leer el inventario sin explicación del fundador |
| **QR de campo** | 6 QR plastificados (uno por cama) · Resistentes a humedad · Costo < $30K COP | QR escaneados correctamente por la PWA en prueba interna |

---

## EJECUCIÓN PILOTO — Fila 1: Del primer contacto al primer dato (Semanas 3–6)

```
  AGRIVISION          CLIENTE            ●AGRIVISION●        TRABAJADOR           JEFE PROD.         ●AGRIVISION●
  ┌────────────┐    ┌────────────┐       ┌────────────┐    ┌────────────┐       ┌────────────┐       ┌────────────┐
  │            │    │            │       │            │    │            │       │            │       │            │
  │  PASO 1    │    │  PASO 2    │       │  PASO 3    │    │  PASO 4    │       │  PASO 5    │       │  PASO 6    │
  │            │    │            │       │  DÍA CERO  │    │            │       │            │       │            │
  └────────────┘    └────────────┘       └────────────┘    └────────────┘       └────────────┘       └────────────┘
        │                 │                    │                 │                    │                    │
        ▼                 ▼                    ▼                 ▼                    ▼                    ▼
   Prospecto          Entrega            Onboarding          Primera             Validación          Primera
   calificado         históricos         completo            captura             del modelo          proyección
   firma contrato     del cliente        en finca            autónoma            ciega               XGBoost
```

---

### PASO 1 — AgriVision · Semana 3

> **● Momento clave: firma del contrato pilot**

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Contacto por red directa del fundador (costo $0)
- Calificación del prospecto: finca 100–200 ha · exporta activamente · ya vivió una pérdida por proyección incorrecta
- Demo con imágenes reales de la finca ya procesadas (antes de firmar)
- Firma del contrato piloto + Pacto de Datos
- Cobro del setup fee: $3M–$8M COP (único)
- Solicitud formal: "Para el Día Cero necesito tus históricos de producción en Excel — al menos un año por lote"

**Indicadores:**
- Base objetivo: 60–120 fincas de +100 ha en Sabana Norte
- Setup fee recaudado antes de construir nada

---

### PASO 2 — Cliente · Semana 3 (antes del Día Cero)

**Quién actúa:** Gerente + Jefe de producción

**Qué ocurre:**
- Cliente entrega Excel o planillas de producción histórica (mínimo 1 año por lote y variedad)
- Confirma el lote y las 6 camas piloto
- Da acceso al listado de variedades activas y altitud de la finca
- *Si no tiene históricos: AgriVision activa proyección biológica pura como puente*

**Indicadores:**
- ≥ 12 meses de registros por lote → XGBoost se activa semana 4–5
- < 6 meses o sin registros → proyección biológica primero, histórico se construye desde cero con los censos

---

### PASO 3 — AgriVision · Semana 3 · **DÍA CERO EN FINCA**

> **● Momento clave: el gerente ve sus flores en datos por primera vez**

**Quién actúa:** Fundador (AgriVision) · dura 1 día completo en finca

**Qué ocurre:**

| Hora | Actividad | Actor |
|------|-----------|-------|
| 8:00 | Reunión gerente + jefe: definir las 6 camas piloto | Todos |
| 8:30 | Instalar app (link WhatsApp) en los teléfonos de los trabajadores | Trabajadores |
| 9:00 | Pegar QR plastificados en postes de las 6 camas | Jefe + fundador |
| 9:30 | **Sesión de validación ciega:** 50 fotos → modelo clasifica → jefe valida sin ver el resultado | Jefe de producción |
| 10:30 | Si ≥ 80% concordancia → primer recorrido con video guiado | Trabajador + fundador |
| 11:00 | ★ **Gerente ve su cultivo en el dashboard por primera vez** | Gerente |
| 11:30 | Trabajadores graban las 6 camas solos — fundador observa sin intervenir | Trabajadores |
| 13:00 | Fundador procesa históricos del cliente → carga en el sistema | Fundador |
| 14:30 | Configurar asignaciones de camas por trabajador | Jefe + fundador |
| 15:00 | Explicar incentivo WiFi: "✓ 6/6 camas grabadas = WiFi del descanso" | Trabajadores |
| 15:30 | Acuerdos semana 1: protocolo de captura, frecuencia, canal WhatsApp de soporte | Todos |

**Criterio de salida del Día Cero:**
- CV ≥ 80% concordancia → piloto lanza
- Trabajadores completaron las 6 camas solos al menos una vez
- Dashboard activo con datos reales de la finca
- Histórico del cliente cargado en el sistema

---

### PASO 4 — Trabajadores de base · Semanas 4–6

**Quién actúa:** Equipo de campo (3–5 trabajadores)

**Qué ocurre:**
- Lunes: jefe asigna camas del día en la app
- Cada trabajador recorre sus 6 camas asignadas con video guiado (~14 minutos totales)
- Escanea QR del poste → graba 30–40 seg caminando → app confirma "Cama ✓"
- Videos guardados offline en el teléfono
- Al pasar por área administrativa: upload automático al WiFi
- Pantalla "✓ 6/6 camas grabadas" = llave para WiFi del descanso
- En caso de ausencia de un compañero: escanea el QR de la cama sin asignar → "¿Cubriendo a alguien?" → queda registrado bajo su nombre

**Indicadores KPI:**
- Meta semana 4: ≥ 60% días con captura (3/5 días)
- Meta semana 6: ≥ 80% días autónomos (4/5 días sin recordatorio)
- Señal de alerta: < 50% en semana 4 → intervención inmediata

---

### PASO 5 — Jefe de producción · Semanas 3–6 (continuo)

**Quién actúa:** Jefe de producción

**Qué ocurre:**
- Valida clasificaciones del modelo en la app ("¿Esto es correcto?") → cada corrección es dato de entrenamiento
- Recibe notificación cuando cada trabajador sube sus 6 camas del día
- Detecta si algún trabajador lleva 2 días sin capturar → avisa al fundador
- Consulta el inventario por lote en el dashboard antes de responder preguntas del gerente

**Indicadores KPI:**
- Concordancia CV mes 1: ≥ 85% en validaciones continuas
- Frecuencia de uso dashboard: ≥ 3 veces/semana

---

### PASO 6 — AgriVision · Semana 4–5

> **● Momento clave: activación del predictor XGBoost**

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Procesa histórico del cliente → construye features de entrenamiento
- Activa XGBoost cuando hay ≥ 3 censos capturados + histórico cargado
- Primera proyección T+14 generada con intervalo de confianza
- Envía primer resumen semanal al gerente (WhatsApp + link dashboard):
  ```
  📊 SEMANA 1 — Finca El Rosal | [Fecha]
  Camas capturadas: 6/6
  Rosa Freedom — Lote 3:
    Estado 3: 960 plantas → listos en 8-14 días
    Estado 4: 640 plantas → listos en 4-8 días
  Proyección semana [N+2]: ~3.840 tallos (±22%)
  Modelo en calibración — precisión mejora cada semana.
  ```
- Reunión virtual 30 min con gerente y jefe: revisar primera proyección, escuchar dudas

**Indicadores KPI:**
- MAPE primera proyección: < 30% aceptable (modelo muy nuevo)
- Si histórico insuficiente: proyección biológica activa como puente

---

## EJECUCIÓN PILOTO — Fila 2: Validación y uso real (Semanas 7–10)

```
  SISTEMA (auto)      GERENTE             ●AGRIVISION●        SISTEMA (auto)       JEFE + TRABAJ.     ●AGRIVISION●
  ┌────────────┐    ┌────────────┐       ┌────────────┐    ┌────────────┐       ┌────────────┐       ┌────────────┐
  │            │    │            │       │            │    │            │       │            │       │            │
  │  PASO 7    │    │  PASO 8    │       │  PASO 9    │    │  PASO 10   │       │  PASO 11   │       │  PASO 12   │
  │            │    │            │       │            │    │            │       │            │       │            │
  └────────────┘    └────────────┘       └────────────┘    └────────────┘       └────────────┘       └────────────┘
        │                 │                    │                 │                    │                    │
        ▼                 ▼                    ▼                 ▼                    ▼                    ▼
  Predicción T+14    Primera decisión    Bucle de            Reentrenamiento     Captura              Reporte
  generada cada      de exportación      validación          mensual             continua             mensual
  lunes              con datos           pred. vs real       automático          semanas 7-10         al gerente
```

---

### PASO 7 — Sistema automático · Cada lunes desde semana 5

**Quién actúa:** Backend AgriVision (proceso automático)

**Qué ocurre:**
- Compara predicción de hace 14 días con censo real de hoy
- Calcula MAPE y lo registra en tabla `validaciones`
- Genera nueva predicción T+14 para cada lote activo
- Si MAPE > 25% dos semanas seguidas: alerta push al fundador → intervención manual

**Indicadores KPI:**
- MAPE semana 7–8: < 20% (objetivo intermedio)
- MAPE semana 10: < 15% (objetivo comercial)

---

### PASO 8 — Gerente (Cliente) · Semana 6 en adelante

> **● Momento clave: primera decisión de exportación con datos**

**Quién actúa:** Gerente general de la finca

**Qué ocurre:**
- Abre el dashboard antes de llamar a Miami para confirmar un pedido
- Consulta la pantalla "¿Puedo confirmar este pedido?" → VERDE / AMARILLO / ROJO
- Toma la decisión con datos reales de su cultivo, no con estimación del agrónomo
- *Este momento es la validación del product-market fit*

**Indicadores KPI:**
- Meta semana 6: ≥ 1 apertura del dashboard ligada a una decisión de exportación
- Meta mes 3: ≥ 3 consultas/semana antes de confirmar pedidos
- Señal de pivot: cero uso en semana 5 → activar resumen automático por WhatsApp

---

### PASO 9 — AgriVision · Semana 8

> **● Momento clave: reentrenamiento + propuesta comercial**

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Reentrenamiento mensual de YOLOv8n con correcciones del jefe de producción acumuladas
- Reentrenamiento de XGBoost con 4+ semanas de datos reales de la finca
- Reunión mensual con gerente (30 min): proyectado vs. real vs. ROI
- **Si no hay firma todavía:** reunión de diagnóstico → identificar objeción real y resolverla
- **Si el modelo falla:** alerta transparente al cliente con plan de corrección

---

### PASO 10 — Sistema automático · Semanas 7–10 (continuo)

**Quién actúa:** Backend AgriVision (proceso automático)

**Qué ocurre:**
- Reentrenamiento automático el primer lunes de cada mes
- Comparación mAP nuevo modelo vs. anterior → deploy solo si mejora
- Log en tabla `versiones_modelo` (fecha, mAP, clientes afectados)
- Envío automático del resumen semanal al gerente cada viernes

**Indicadores:**
- Versión del modelo activa: siempre la de mayor mAP validado
- Uptime del sistema: > 99%

---

### PASO 11 — Jefe de producción + Trabajadores · Semanas 7–10 (continuo)

**Quién actúa:** Equipo de campo

**Qué ocurre:**
- Trabajadores: captura diaria autónoma, 6 camas, sin supervisión del fundador
- Jefe: asigna camas en la mañana, valida anomalías, asigna coberturas por ausencias
- Sistema: detecta si hay camas sin capturar 2 días seguidos → alerta al jefe
- WiFi de cafetería: incentivo diario activo (pantalla "✓ 6/6" al jefe hasta que se instale el router)

**Indicadores KPI:**
- Meta: ≥ 90% días con captura sin recordatorio

---

### PASO 12 — AgriVision · Cada viernes (semanas 7–10)

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Revisión silenciosa de métricas de uso (20 minutos, sin molestar al cliente):
  - KPI 1: frecuencia de captura autónoma
  - KPI 3: uso del dashboard por el gerente
  - KPI 4: evolución del MAPE
- Si hay señal de alerta en cualquier KPI: contacto inmediato con el jefe de producción
- Preparación del reporte mensual para el gerente

---

## CIERRE PILOTO — Semanas 11–12

```
  AGRIVISION          CLIENTE             ●DECISIÓN●          AGRIVISION
  ┌────────────┐    ┌────────────┐       ╔════════════╗      ┌────────────┐
  │            │    │            │       ║            ║      │            │
  │  PASO 13   │    │  PASO 14   │       ║  PASO 15   ║      │  PASO 16   │
  │            │    │            │       ║            ║      │            │
  └────────────┘    └────────────┘       ╚════════════╝      └────────────┘
        │                 │                    │                    │
        ▼                 ▼                    ▼                    ▼
  Informe de          Gerente             Firma contrato       Facturación
  impacto 90 días     evalúa y            o define             y activación
  presentado          decide              ajustes              del plan
```

---

### PASO 13 — AgriVision · Semana 11

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Construye el informe de impacto de los 90 días:
  ```
  INFORME DE IMPACTO — 90 días | Finca [Nombre]

  ADOPCIÓN
  Camas capturadas:        N × 6 = [total]
  Días con captura ≥ 80%:  X de 60 días laborales
  Trabajadores activos:    N / N del equipo

  PRECISIÓN DEL MODELO
  Concordancia CV mes 1:   [X]%
  Concordancia CV mes 3:   [Y]%
  MAPE proyección semana 4: [X]%
  MAPE proyección mes 3:    [Y]%

  IMPACTO EN EL NEGOCIO
  Decisiones de exportación con datos:  [N]
  Pérdidas evitadas estimadas:          $[X]M COP
  Horas de conteo manual ahorradas:     [N]h
  Costo del servicio (3 meses):         $[X]M COP
  ROI del piloto:                       [X]:1
  ```

---

### PASO 14 — Cliente · Semana 12

**Quién actúa:** Gerente general (Cliente)

**Qué ocurre:**
- Recibe y revisa el informe de impacto
- Reunión de cierre (45 min) con el fundador:
  1. Lo que el sistema hizo en 90 días
  2. Lo que eso valió en dinero concreto
  3. La pregunta: ¿continuamos?
- Evalúa tres opciones:
  - **Contrato full:** $80K–$150K COP/ha/mes, todos los lotes activos
  - **Expansión:** añadir módulo de alertas de enfermedades o logística QR
  - **Pivot:** ajustes específicos antes de renovar

---

### PASO 15 — Decisión · Semana 12

> **● Momento clave: el piloto se convierte en negocio**

| Escenario | Condición | Acción |
|-----------|-----------|--------|
| **✅ CONTINÚA** | ROI ≥ 10:1 · MAPE < 15% · Gerente usa el dashboard 3+/semana | Firma contrato full. Contratar primer empleado comercial. Buscar cliente 2. |
| **📈 ESCALA** | Cliente quiere más lotes o módulos adicionales | Propuesta de expansión en 2 semanas. Router WiFi en cafetería al firmar. |
| **🔄 PIVOT** | Valor percibido pero con fricción específica | Diagnóstico de la objeción → ajuste puntual → contrato condicionado a mejora |
| **❌ NO RENUEVA** | Sin valor percibido | Reunión de aprendizaje. No ajustar el precio — ajustar el producto. Documentar antes de cliente 2. |

---

### PASO 16 — AgriVision · Semana 12

**Quién actúa:** Fundador (AgriVision)

**Qué ocurre:**
- Firma del contrato full + primer mes de facturación
- Instalación del router WiFi en cafetería (si contrato mayor) — TP-Link ~$150K COP
- Activación del módulo de alertas de enfermedades (si se contrató)
- Solicitud de referido: *"¿Hay algún colega en el sector que podría beneficiarse de esto?"*
- Inicio del proceso de captación del cliente 2 con el caso de uso documentado

---

## Resumen visual del flujo completo

```
SEMANAS  1    2    3         4    5    6         7    8    9   10        11   12
         ├─────────┤         ├─────────────────────────────────┤         ├─────┤
         ALISTAMIENTO        EJECUCIÓN PILOTO                             CIERRE

         Modelo CV   ──────► Día Cero ──────► 1ª Proyección ──────► Informe ──► Firma
         App + QR            Firma           XGBoost activo          90 días     contrato
         Backend             contrato        MAPE calibrándose        ROI         full
         Dashboard           piloto          Gerente usa datos        documentado

         ├──────────────────────────────────────────────────────────────────────────┤
                                    TIEMPO TOTAL PILOTO: 12 SEMANAS
```

---

## Flujo operativo semanal en régimen activo (semanas 4–10)

| Día | Actor | Acción |
|-----|-------|--------|
| **Lunes** | Sistema | Comparación predicción T-14 vs censo real → MAPE calculado → nueva predicción T+14 |
| **Lunes** | Jefe de producción | Asigna camas del día a trabajadores en la app |
| **Mar–Jue** | Trabajadores | Recorrido con video guiado · upload al pasar por WiFi admin · pantalla "✓ 6/6" |
| **Mar–Jue** | Jefe de producción | Valida clasificaciones en la app · recibe alertas de upload · consulta inventario |
| **Viernes** | Sistema | Genera resumen semanal → envío automático al gerente (WhatsApp + dashboard) |
| **Viernes** | Gerente | Consulta dashboard antes de confirmar pedidos de la semana siguiente |
| **Viernes** | AgriVision | Revisión silenciosa de métricas de uso (20 min) |
| **1er lunes del mes** | AgriVision | Reentrenamiento YOLOv8n + XGBoost · reporte mensual al gerente |

---

*flujo_modelo_operativo_piloto.md — AgriVision | Abril 2026*
*Referencia cruzada: prueba_piloto.md · workframe_mvp.md · captura_campo.md · proceso.md*

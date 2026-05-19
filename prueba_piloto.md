# Prueba Piloto — AgriVision
> Estructuración piloto | Abril 2026
> Contexto: primera finca floricultora, Sabana Norte · 6 camas piloto · 12 semanas

---

## 1. Objetivo de la prueba piloto

Validar que un gerente de floricultora colombiana **cambia su comportamiento de confirmación de pedidos de exportación** cuando tiene acceso a un censo fisiológico en tiempo real y una proyección de producción generada por XGBoost — y que ese cambio de comportamiento ocurre con un sistema que los trabajadores de base adoptan sin supervisión constante.

El piloto no busca demostrar que la tecnología funciona en un laboratorio. Busca demostrar que funciona en el campo real, con teléfonos Android básicos, trabajadores de base, WiFi solo en administración, y un gerente que hoy toma decisiones basadas en estimaciones del agrónomo.

**El criterio último de éxito del piloto:**
> El gerente consulta el dashboard antes de llamar a Miami para confirmar un pedido — sin que el fundador se lo recuerde. Y lo paga.

**Decisión que habilita el piloto:**
Al final de las 12 semanas, el gerente decide entre tres caminos:
- **Continuar → Contrato full** a precio estándar ($80K–$150K COP/ha/mes)
- **Escalar → Expandir** a más lotes o módulos (detección de enfermedades, logística)
- **Pivot → Ajustar** el modelo antes de buscar el siguiente cliente

---

## 2. Hipótesis a validar

Las hipótesis están ordenadas por riesgo — las que pueden matar el negocio si fallan van primero.

### H1 — Adopción de captura por los trabajadores de base *(riesgo CRÍTICO)*
> "Si los trabajadores de base usan la app con el protocolo de video guiado + QR en postes + incentivo WiFi de cafetería, entonces capturarán sus camas asignadas ≥ 4 días por semana de forma autónoma a partir de la semana 2."

**Por qué es crítica:** sin capturas regulares no hay censo, sin censo no hay proyección, sin proyección no hay valor para el gerente. Todo el sistema colapsa si el eslabón del trabajador de base no funciona.

**Condición de pivot si falla:** reducir a 3 camas con captura supervisada, o cambiar al protocolo de captura pasiva con acelerómetro para reducir aún más la fricción.

---

### H2 — Precisión del modelo CV en campo real *(riesgo CRÍTICO)*
> "Si el modelo YOLOv8n entrenado con el dataset inicial clasifica estados fisiológicos de flores colombianas en condiciones reales de campo (luz variable, ángulos distintos, flores parcialmente cubiertas), entonces alcanzará ≥ 80% de concordancia con la validación del jefe de producción."

**Por qué es crítica:** si la clasificación es incorrecta, el censo es incorrecto, la proyección es incorrecta y el gerente toma una decisión peor que antes. El modelo debe ser confiable antes de que el gerente lo use para compromisos reales.

**Condición de pivot si falla:** lanzar el modelo como "asistente que el jefe corrige" — cada corrección es dato de entrenamiento. Activar la proyección biológica pura (sin CV) como puente mientras se recolectan más imágenes anotadas.

---

### H3 — Cambio de comportamiento del gerente *(riesgo ALTO)*
> "Si el gerente tiene acceso al censo en tiempo real y a la proyección XGBoost en el dashboard, entonces consultará los datos antes de confirmar al menos 1 pedido de exportación durante las primeras 6 semanas — sin que el fundador se lo recuerde."

**Por qué es alta:** si el gerente tiene los datos pero no los usa, el product-market fit no está validado. El dato llega pero no cambia la decisión. Eso implica que hay una barrera de adopción diferente (confianza en el dato, hábito de uso, formato del dashboard) que hay que resolver antes de escalar.

**Condición de pivot si falla:** mover el output del dashboard al canal que el gerente ya usa (WhatsApp). En lugar de que el gerente abra una app, el sistema le envía el resumen semanal con el semáforo VERDE/AMARILLO/ROJO directo al chat.

---

### H4 — Calidad de los históricos para XGBoost *(riesgo MEDIO)*
> "Si el cliente entrega registros históricos de producción por lote y variedad (≥ 1 año), entonces el modelo XGBoost generará proyecciones con MAPE < 25% en la semana 4 del piloto."

**Por qué es media:** si los históricos son incompletos o inconsistentes, el XGBoost no se activa a tiempo y la propuesta de valor de proyección se retrasa semanas. El negocio no muere pero el valor del piloto llega más tarde.

**Condición de pivot si falla:** activar la proyección biológica pura (tabla de constantes por variedad × altitud × temperatura) como sustituto temporal. Construir el histórico desde cero con los primeros censos del piloto.

---

### H5 — Disposición a pagar *(riesgo MEDIO)*
> "Si el gerente percibe valor real en las primeras 4 semanas del piloto, entonces firmará un contrato de pago antes de la semana 8 — aunque sea a precio de piloto ($50K COP/ha/mes)."

**Por qué es media:** el ROI de AgriVision vs. el costo del servicio es de 10:1 o más. Si el gerente no firma, el problema no es de precio — es de percepción de valor o de confianza. Eso es un problema comercial, no técnico.

**Condición de pivot si falla:** ofrecer el modelo S1-3 (Socio de Datos) — 3 meses gratis a cambio de co-propiedad del modelo. Solo si el cliente es estratégicamente valioso y el modelo estándar no funciona para él.

---

## 3. Criterios de Éxito — KPIs con metas

### KPI 1 — Frecuencia de captura autónoma
Valida: **H1** (adopción trabajadores de base)

| | |
|--|--|
| **Cálculo** | (días con ≥ 1 captura válida por trabajador) ÷ (días laborales del período) × 100 |
| **Fuente** | Registros automáticos en tabla `censos` (fecha, trabajador_id, cama_id) |
| **Meta semana 2** | ≥ 60% (al menos 3 de 5 días, primeros hábitos formándose) |
| **Meta semana 4** | ≥ 80% (≥ 4 de 5 días sin recordatorio del fundador) |
| **Meta mes 3** | ≥ 90% sostenido |
| **Señal de pivot** | < 50% en semana 3 → activar protocolo de intervención inmediata |

---

### KPI 2 — Concordancia modelo CV vs. experto humano
Valida: **H2** (precisión del modelo en campo real)

| | |
|--|--|
| **Cálculo** | (capturas donde jefe de producción valida "correcto") ÷ (total capturas en sesión de validación ciega) × 100 |
| **Fuente** | Sesión de validación ciega en Día Cero: 50 imágenes reales, jefe clasifica sin ver el resultado del modelo |
| **Meta Día Cero** | ≥ 80% concordancia para lanzar el piloto con el cliente |
| **Meta mes 1** | ≥ 85% en validaciones continuas (jefe corrige en la app) |
| **Meta mes 3** | ≥ 90% (modelo mejorado con correcciones del piloto) |
| **Señal de pivot** | < 70% en Día Cero → no lanzar hasta reentrenar. Activar proyección biológica pura como puente |

---

### KPI 3 — Uso del dashboard por el gerente
Valida: **H3** (cambio de comportamiento del gerente)

| | |
|--|--|
| **Cálculo** | Número de aperturas del dashboard con duración > 30 segundos por semana |
| **Fuente** | Logs de sesión del dashboard (usuario_id, timestamp, duración) |
| **Meta semana 4** | ≥ 2 aperturas/semana |
| **Meta semana 6** | ≥ 1 apertura documentada antes de una confirmación de pedido |
| **Meta mes 3** | ≥ 3 aperturas/semana, al menos 1 ligada a decisión de exportación |
| **Señal de pivot** | 0 aperturas en semana 3 → activar resumen semanal automático por WhatsApp |

---

### KPI 4 — Error del modelo de proyección (MAPE)
Valida: **H4** (calidad de históricos y precisión de XGBoost)

| | |
|--|--|
| **Cálculo** | MAPE = Σ \| (real − proyectado) / real \| ÷ n × 100, calculado semanalmente sobre los ciclos completados |
| **Fuente** | Tabla `validaciones` (prediccion_id, tallos_reales, error_pct) — generada automáticamente cada lunes |
| **Meta semana 4** | < 25% (primera proyección con datos reales — tolerancia alta) |
| **Meta semana 8** | < 18% (modelo empieza a calibrarse con patrones de esta finca) |
| **Meta mes 3** | < 15% (objetivo comercial — nivel para confirmar pedidos con confianza) |
| **Señal de pivot** | > 30% dos semanas seguidas → alerta al fundador, reentrenamiento manual, activar proyección biológica como respaldo |

---

### KPI 5 — Firma de contrato de pago
Valida: **H5** (disposición a pagar)

| | |
|--|--|
| **Cálculo** | Binario: contrato firmado / no firmado. Precio mínimo aceptable: $50K COP/ha/mes |
| **Fuente** | Documento firmado (PandaDoc o contrato físico) |
| **Meta** | Firma antes del fin de la semana 8 del piloto |
| **Meta óptima** | Firma antes de semana 6 (señal de valor percibido temprano) |
| **Señal de pivot** | No firma en semana 8 → reunión de diagnóstico: ¿precio? ¿valor percibido? ¿confianza? Ajustar antes de buscar cliente 2 |

---

### KPI 6 — ROI documentado del piloto
KPI de cierre — para la presentación de renovación

| | |
|--|--|
| **Cálculo** | (pérdidas evitadas estimadas + horas de conteo manual ahorradas × costo/hora) ÷ costo del servicio × 100 |
| **Fuente** | Comparación de proyecciones vs. producción real + reporte de horas del jefe de producción antes/después |
| **Meta mes 3** | ROI ≥ 10:1 (una mensualidad de $14M COP protege contra una pérdida mínima de $140M COP) |
| **Uso** | Presentación de renovación + material para conseguir el cliente 2 |

---

## 4. Muestra del piloto — Target de usuarios

### La finca piloto

| Atributo | Valor |
|----------|-------|
| **Tamaño** | 100–200 ha activas en Sabana Norte de Bogotá |
| **Camas piloto** | 6 camas de un lote seleccionado (Rosa Freedom o Clavel Nobbio) |
| **Altitud** | 2.400–2.600 msnm (Cundinamarca) |
| **Criterio de selección** | El gerente ya vivió una pérdida concreta por proyección incorrecta y puede cuantificarla |
| **Acceso a históricos** | Tiene registros de producción en Excel o planillas, mínimo 1 año |
| **WiFi** | Solo en área administrativa — sin router en cafetería para el MVP |

### Los usuarios del piloto

| Perfil | Nombre tipo | Nº de personas | Rol en el piloto |
|--------|-------------|:--------------:|-----------------|
| **Gerente General** | Carlos | 1 | Decide qué pedidos confirmar. Usuario del dashboard. Decide si firma el contrato. |
| **Jefe de Producción** | Andrés | 1 | Valida las clasificaciones del modelo CV. Asigna camas a trabajadores. Recibe alertas. |
| **Trabajadores de base** | Juan + equipo | 3–5 | Hacen el recorrido y la captura diaria. Usuarios directos de la app de campo. |
| **Fundador AgriVision** | Mauro | 1 | Onboarding, soporte, análisis de datos, ajuste del modelo. No interviene en capturas a partir de semana 2. |

### Criterios de calificación del early adopter (deben cumplirse los 3)
1. Tiene pedidos de exportación activos con compradores internacionales
2. Ya vivió y puede cuantificar una pérdida por proyección incorrecta (> $10M COP)
3. El jefe de producción está dispuesto a participar activamente en la validación del modelo

---

## 5. Tiempo — Duración total y por fase

**Duración total del piloto: 12 semanas (3 meses)**

```
SEMANA   1    2    3    4    5    6    7    8    9   10   11   12
         ├────┴────┤├───┤├────────────────┤├───────────┤├─────────┤
         PRE-PILOTO ONBDG  ADOPCIÓN Y 1ª     VALIDACIÓN   DECISIÓN
                           PROYECCIÓN
```

| Fase | Semanas | Duración | Objetivo |
|------|---------|----------|---------|
| **Fase 0 — Pre-piloto** | 1–2 | 2 semanas | Dataset anotado, modelo CV entrenado, infraestructura lista, QR instalados |
| **Fase 1 — Onboarding** | 3 | 1 semana | Día Cero en finca, primeras capturas, validación CV con jefe de producción |
| **Fase 2 — Adopción y primera proyección** | 4–6 | 3 semanas | Captura regular autónoma, histórico cargado, XGBoost activado, primeras decisiones con datos |
| **Fase 3 — Validación y calibración** | 7–10 | 4 semanas | Bucle de validación predicción vs real, reentrenamiento, MAPE mejorando |
| **Fase 4 — Decisión** | 11–12 | 2 semanas | Informe de impacto 90 días, ROI documentado, presentación al gerente, firma contrato |

### Hitos de decisión (go/no-go por fase)

| Hito | Semana | Criterio GO | Criterio PIVOT |
|------|:------:|------------|---------------|
| **Lanzar el piloto** | 3 | CV ≥ 80% concordancia en sesión ciega | < 70% → reentrenar antes de exponer al gerente |
| **Activar XGBoost** | 4 | Histórico entregado + ≥ 3 censos capturados | Sin histórico → activar proyección biológica primero |
| **Proponer firma** | 6–8 | ≥ 1 decisión de exportación con datos + MAPE < 25% | Cero uso del gerente → activar WhatsApp como canal |
| **Renovar o escalar** | 12 | Contrato firmado + ROI ≥ 10:1 documentado | Sin firma → diagnóstico completo antes del cliente 2 |

---

## 6. Roadmap paso a paso

### FASE 0 — Pre-piloto (Semanas 1–2)
*Antes de ir a la finca. Todo lo que falla aquí falla frente al cliente.*

**Semana 1:**
- [ ] Recolectar imágenes en campo con cliente actual (levantando data) — 200 imágenes mínimo
- [ ] Anotar con LabelImg en 5 estados fisiológicos: 40+ imágenes por clase
- [ ] Configurar PostgreSQL con esquema mínimo (censos, históricos, predicciones, validaciones)
- [ ] Construir endpoint FastAPI `/infer` — imagen → clasificación en < 10 segundos

**Semana 2:**
- [ ] Completar dataset hasta 400–600 imágenes anotadas
- [ ] Entrenar YOLOv8n en Google Colab Pro — objetivo mAP@0.5 ≥ 0.75
- [ ] Construir PWA offline: 3 pantallas (captura, resultado, confirmación)
- [ ] Construir dashboard Streamlit: inventario por estado por lote
- [ ] Imprimir QR plastificados para las 6 camas del piloto (< $30K COP)
- [ ] **Criterio de salida:** demo interna funcional — foto → clasificación → dashboard en < 2 minutos

---

### FASE 1 — Onboarding / Día Cero (Semana 3)
*El día más importante del piloto. Si el cliente no siente valor aquí, todo lo demás es difícil.*

**Día Cero en la finca (agenda):**

| Hora | Actividad | Con quién |
|------|-----------|-----------|
| 8:00 | Reunión con gerente y jefe de producción — definir el lote piloto y las 6 camas | Gerente + Jefe |
| 8:30 | Instalar app en los teléfonos de los trabajadores de campo (link WhatsApp) | Trabajadores |
| 9:00 | Pegar QR plastificados en los postes de las 6 camas | Jefe + fundador |
| 9:30 | **Sesión de validación ciega (KPI 2):** 50 fotos → modelo clasifica → jefe valida | Jefe de producción |
| 10:30 | Si ≥ 80% concordancia → primer recorrido con video guiado | Trabajador + fundador |
| 11:00 | ★ Gerente ve sus flores en el dashboard por primera vez | Gerente |
| 11:30 | Trabajadores graban las 6 camas solos — fundador observa sin intervenir | Trabajadores |
| 12:00 | Almuerzo — fundador revisa los datos capturados |  |
| 13:00 | Revisión de datos históricos del cliente (Excel/planillas) — fundador los procesa | Fundador |
| 14:30 | Configurar asignaciones de camas por trabajador en el sistema | Jefe + fundador |
| 15:00 | Explicar el incentivo WiFi a los trabajadores: "✓ 6/6 camas = WiFi del descanso" | Trabajadores |
| 15:30 | Acuerdos semana 1: protocolo de captura, frecuencia, canal de soporte (WhatsApp) | Todos |

**Check al final del Día Cero:**
- [ ] ≥ 80% concordancia CV → piloto lanza
- [ ] Trabajadores completaron las 6 camas solos al menos una vez
- [ ] Dashboard activo con datos reales de la finca
- [ ] Histórico del cliente recibido y procesable

---

### FASE 2 — Adopción y primera proyección (Semanas 4–6)

**Semana 4 — Primeras capturas autónomas:**
- [ ] Trabajadores capturan solos — fundador solo recibe notificaciones de upload
- [ ] Check-in día 3 y día 5 por WhatsApp con el jefe de producción
- [ ] Si un trabajador no captura 2 días: llamar al jefe de producción (no al trabajador)
- [ ] Validar KPI 1: ¿cuántos días de captura sin recordatorio?

**Semana 5 — Activar XGBoost:**
- [ ] Procesar histórico del cliente → features de entrenamiento
- [ ] Primera proyección XGBoost T+14 generada
- [ ] Enviar primer resumen semanal al gerente (formato fijo WhatsApp + link dashboard)
- [ ] Reunión virtual 30 min con gerente y jefe: revisar primera proyección

**Semana 6 — Primera decisión real con datos:**
- [ ] ★ Momento clave: gerente consulta dashboard antes de confirmar pedido a Miami
- [ ] Documentar: ¿lo hizo solo o el fundador tuvo que recordárselo?
- [ ] Medir KPI 3 (uso dashboard) y KPI 4 (MAPE primera proyección)
- [ ] **Hito comercial:** si KPI 2 ≥ 80% y KPI 3 ≥ 1 uso ligado a decisión → proponer firma del contrato piloto

---

### FASE 3 — Validación y calibración (Semanas 7–10)

**Cada lunes (automático):**
- Sistema compara predicción de hace 14 días vs censo real de hoy
- Calcula y registra MAPE → log en tabla `validaciones`
- Si MAPE > 25% dos semanas seguidas: alerta al fundador → intervención manual

**Cada viernes (fundador, 30 minutos):**
- Revisar métricas de uso (KPI 1, 3)
- Revisar accuracy del modelo (KPI 2 en correcciones continuas)
- Revisar evolución del MAPE (KPI 4)
- Identificar si hay camas con problemas de captura

**Semana 8 — Reentrenamiento mensual + revisión comercial:**
- [ ] Reentrenar YOLOv8n con correcciones del jefe de producción acumuladas
- [ ] Reentrenar XGBoost con 4+ semanas de datos reales de la finca
- [ ] Reunión mensual con gerente: "Este mes el modelo proyectó X, la producción real fue Y, el error fue Z%"
- [ ] Si no hay firma todavía: reunión de diagnóstico con gerente — ¿qué está faltando?

**Semana 10 — Evaluación de mitad de validación:**
- [ ] MAPE < 18%? → sistema calibrándose bien
- [ ] Gerente usa el dashboard 3+/semana? → adopción consolidada
- [ ] Contrato firmado? → confirmar escenario de renovación

---

### FASE 4 — Decisión (Semanas 11–12)

**Semana 11 — Construir el informe de impacto:**
- [ ] Calcular ROI: pérdidas evitadas + horas ahorradas vs. costo del servicio
- [ ] Documentar evolución del MAPE (semana 4 → semana 10)
- [ ] Documentar frecuencia de uso del dashboard
- [ ] Documentar decisiones de exportación tomadas con datos de AgriVision

**Semana 12 — Presentación al gerente:**

```
AGENDA REUNIÓN DE CIERRE — 45 minutos

1. Lo que el sistema hizo en 90 días (10 min)
   → Imágenes procesadas: N
   → Camas censadas: N × 6
   → Proyecciones generadas: N
   → Error promedio del modelo: X% → hoy Y%
   → Decisiones de exportación con datos: N

2. Lo que eso valió en plata (15 min)
   → Pérdidas evitadas estimadas: $___M COP
   → Horas de conteo manual ahorradas: ___h
   → ROI del piloto: ___:1

3. La pregunta (5 min)
   → "¿Continuamos?"
   → Tres opciones: contrato full / expansión / pivot

4. Acuerdo concreto (15 min)
   → Si sigue: precio, condiciones, próximos módulos
   → Si pide ajustes: compromisos específicos antes de firmars
```

---

## Limitantes del piloto

| Limitante | Impacto | Cómo se gestiona |
|-----------|---------|-----------------|
| Solo WiFi en área administrativa — sin router en cafetería | Upload diferido — si el trabajador no pasa por admin, los datos del día no llegan | Protocolo de paso obligatorio por admin al final del turno. Router en cafetería se instala al firmar contrato mayor |
| Teléfonos Android gama baja sin datos móviles | PWA puede perder datos si el teléfono queda sin espacio | Grabar en 720p (< 12 MB/cama). Notificación de espacio bajo. Requerir 300 MB libres mínimo |
| Solo 6 camas en el piloto (no toda la finca) | El gerente puede ver el sistema como "parcial" — no toma decisiones de exportación solo con 6 camas | Elegir las 6 camas más representativas del lote de mayor volumen. Escalar a lotes adicionales en mes 2 si la adopción funciona |
| Fundador como único recurso técnico y comercial | Si hay un bug crítico en semana de temporada alta, el fundador no puede atender todo | Protocolo de soporte por niveles: L1 (WhatsApp con jefe de producción) → L2 (llamada fundador) → L3 (acceso remoto al sistema) |
| Históricos del cliente pueden estar incompletos | XGBoost no se activa en semana 4 → la proyección llega tarde | Plan B desde el Día Cero: activar proyección biológica si no hay histórico suficiente |
| Trabajadores de base sin experiencia en apps de datos | Baja adopción en las primeras semanas | Onboarding en campo (no en sala), 3 capturas guiadas el Día Cero, incentivo WiFi desde el día 1 |

---

## Condiciones de pivot por hipótesis

| Hipótesis | Señal de alerta | Semana de detección | Acción de pivot |
|-----------|----------------|:------------------:|----------------|
| **H1** Adopción trabajadores | Captura < 50% por 2 semanas | Semana 4 | Reducir a 3 camas, captura supervisada, evaluar acelerómetro pasivo |
| **H2** Precisión CV | Concordancia < 70% en validación | Día Cero | No lanzar. Reentrenar con 200 imágenes adicionales del campo real. Usar proyección biológica como puente |
| **H3** Comportamiento gerente | Cero usos del dashboard en semana 3 | Semana 5 | Enviar resumen semanal por WhatsApp con semáforo directo. El gerente no necesita abrir la app |
| **H4** Calidad históricos | Histórico < 6 meses o incompleto | Semana 3 | Activar proyección biológica (tabla de constantes). Construir histórico desde cero con los censos del piloto |
| **H5** Disposición a pagar | No firma en semana 8 | Semana 8 | Reunión diagnóstico: identificar objeción real. Si es precio: modelo piloto extendido. Si es valor: ajustar entregable antes del cliente 2 |

---

## Flujo operativo semanal (régimen de piloto activo)

```
LUNES
  → Sistema: comparación predicción T-14 vs censo real de hoy (automático)
  → Sistema: genera nueva predicción T+14
  → Jefe de producción: asigna camas del día a trabajadores en la app

MARTES / MIÉRCOLES / JUEVES
  → Trabajadores: recorrido con video guiado (6 camas, ~14 min total)
  → App: guarda videos offline
  → Trabajadores: pasan por WiFi admin → upload automático
  → Sistema: procesa frames → actualiza inventario por cama

VIERNES
  → Sistema: genera resumen semanal (inventario + proyección + alertas)
  → Gerente: recibe resumen (WhatsApp + dashboard)
  → Gerente: consulta dashboard antes de confirmar pedidos de la semana siguiente
  → Fundador: revisa métricas de uso (silencioso, 20 minutos)

PRIMER LUNES DEL MES
  → Fundador: reentrenamiento YOLOv8n con correcciones acumuladas
  → Fundador: reentrenamiento XGBoost con datos reales del último mes
  → Fundador: envía reporte mensual al gerente: proyectado vs real + evolución del error
```

---

*prueba_piloto.md — AgriVision | Abril 2026*
*Referencia cruzada: censo_vivo.md · workframe_mvp.md · captura_campo.md · operating-model.md*

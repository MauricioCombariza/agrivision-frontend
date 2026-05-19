# Proceso AgriVision — De la firma al primer resultado
> Guía operativa | Versión 1.1 | Abril 2026

---

## Mapa del proceso

```
  DÍA 0        DÍA 1         DÍAS 2–7      DÍAS 8–28     DÍAS 29–90    RECURRENTE
  ─────        ─────         ────────      ─────────     ──────────    ──────────
  Firma    →  Día Cero   →  Activación →  Primeras   →  Modelo     →  Temporada
  contrato    en campo       y datos       proyeccio-    calibrado      Alta
                             históricos    nes
```

---

## PASO 1 — Firma del contrato
**Duración: 1 hora**

**Qué se hace:**
- Firmar contrato + Pacto de Datos (los datos del cliente son suyos, siempre)
- Cobrar setup fee ($3M–$8M COP)
- Confirmar fecha del Día Cero (máximo 5 días después)
- Pedir al cliente que aliste antes de ese día:
  - [ ] Planillas o Excel históricos de producción (mínimo 1 año, idealmente 2–3)
  - [ ] Registros de enfermedades o tratamientos fitosanitarios si existen
  - [ ] Listado de variedades activas por lote

**Resultado:** Contrato firmado + datos históricos solicitados

---

## PASO 2 — Día Cero en campo
**Duración: 1 día completo en finca**

**Agenda:**

| Hora | Actividad |
|------|-----------|
| 8:00 | Reunión con gerente y jefe de producción — definir 2–3 lotes piloto |
| 8:30 | Instalar la app en el celular del operador de campo |
| 9:00 | Recorrido en campo — primeras fotos del lote piloto |
| 10:30 | Procesar las imágenes — el modelo clasifica estados fisiológicos |
| 11:00 | ★ El gerente ve su cultivo en el dashboard por primera vez |
| 11:30 | El jefe de producción valida si las clasificaciones son correctas |
| 12:00 | Almuerzo |
| 13:00 | **Revisión de datos históricos** — el fundador analiza los Excel/planillas del cliente para construir la línea base de proyección |
| 14:30 | Configurar alertas de enfermedad y frecuencia de reportes |
| 15:00 | El operador practica la captura solo — el fundador observa |
| 15:30 | Acuerdos para la semana 1 |

**Resultado:** Dashboard activo con datos reales + línea base histórica cargada en el modelo

> ⚠️ Validar la clasificación con el jefe de producción **antes** de mostrársela al gerente.

---

## PASO 3 — Semana 1: activación y captura
**Días 2–7**

**El operador hace:**
- Captura fotos de las camas asignadas cada 2–3 días
- Consulta dudas por WhatsApp con el fundador

**El fundador hace:**
- Check-in día 3 y día 5 por WhatsApp
- Si el operador no ha capturado en 2 días: llamar al jefe de producción
- Terminar de procesar los datos históricos y cruzarlos con los primeros datos de campo
- Enviar el primer resumen semanal al gerente el día 7

**Resumen semanal (formato fijo):**
```
📊 SEMANA 1 — [Finca] | [Fecha]
Fotos procesadas: [N] | Lotes activos: [N]

PROYECCIÓN PRELIMINAR (semana 3):
  [Variedad A]: ~[N] tallos
  [Variedad B]: ~[N] tallos
  (Modelo en calibración — precisión mejora cada semana)

PRÓXIMO PASO: revisión el [fecha]
```

**Señales de alerta:**

| Si esto pasa... | Hacer esto |
|-----------------|-----------|
| Operador no captura 2 días seguidos | Llamar al jefe de producción ese día |
| Gerente no abre el dashboard | WhatsApp con un dato concreto de su cultivo |

---

## PASO 4 — Semanas 2–4: primeras proyecciones
**Días 8–28**

**Qué ocurre:**
El modelo combina los datos históricos del cliente con los nuevos datos de campo para generar la primera proyección confiable.

**El fundador hace:**
- Reunión virtual semana 2 (30 min): revisar la proyección con gerente y jefe de producción
- Comparar la proyección del modelo vs. la estimación del agrónomo — documentar la diferencia
- Ajustar el modelo con el feedback del jefe de producción
- Acompañar (o pedir feedback después de) la primera confirmación de pedido con datos

**★ Momento clave:**
> El gerente consulta el dashboard antes de llamar a Miami y confirma el pedido con los datos de AgriVision.

**Entregable al final del mes 1:**
- Proyección proyectada vs. producción real
- Error del modelo en esta primera etapa
- Alertas fitosanitarias emitidas

---

## PASO 5 — Meses 2–3: modelo calibrado
**Días 29–90**

**Régimen de operación normal:**

| Día | Quién | Qué hace |
|-----|-------|---------|
| Lunes | Operador | Captura fotos |
| Lunes | Gerente | Revisa resumen semanal |
| Martes/Miér | Gerente | Consulta proyección antes de confirmar pedidos |
| Jueves | Sistema | Alerta automática si detecta síntoma de enfermedad |
| Viernes | Sistema | Envía resumen semanal |
| Viernes | Fundador | Revisa métricas de uso (silencioso) |

**Métricas de salud del cliente:**

| Métrica | Objetivo | Riesgo de abandono si... |
|---------|----------|--------------------------|
| Error de proyección | < 15% | > 25% dos semanas seguidas |
| Días de captura / semana | ≥ 4 | < 2 semanas seguidas |
| Veces que gerente abre dashboard | ≥ 3/semana | < 1/semana |

**Entregable mes 3:** Informe de Impacto 90 días
- Precisión acumulada del modelo
- ROI: pérdidas evitadas vs. costo del servicio

---

## PASO 6 — Temporada Alta (recurrente)
**3–4 semanas antes de San Valentín, Día de la Madre y Navidad**

**Asesoría presencial de un día en finca:**

| Bloque | Contenido |
|--------|-----------|
| Mañana | Revisar proyecciones para la temporada + identificar lotes en riesgo |
| Tarde | Simular escenarios: *"¿Qué pasa si confirmo X y el modelo se desvía 15%?"* |
| Cierre | Acuerdos concretos: qué confirmar, qué activar, plan de contingencia |

**Entregable:** Informe de Temporada en PDF con proyección, escenarios y acuerdos

---

## PASO 7 — Renovación (mes 6+)
**30 días antes de que venza el contrato**

**El fundador hace:**
- Preparar Informe de Impacto Anual (precisión, ROI, temporadas navegadas)
- Reunión de renovación: presentar el informe + escuchar lo que no funcionó
- Proponer expansión (más hectáreas, módulo logístico, benchmarks sectoriales)
- Pedir referido: *"¿Hay algún colega a quien le podría servir esto?"*

---

## Resumen de un vistazo

| Paso | Cuándo | Lo más importante |
|------|--------|-------------------|
| Firma | Día 0 | Pacto de Datos + pedir datos históricos |
| Día Cero | Día 1 | Dashboard con datos reales antes del almuerzo + análisis de históricos |
| Activación | Días 2–7 | Operador capturando solo, sin recordatorio |
| Proyecciones | Días 8–28 | Primera decisión de exportación con datos reales |
| Calibrado | Días 29–90 | Error < 15%, gerente autónomo |
| Temporada Alta | 3x al año | Asesoría presencial + plan concreto para la temporada |
| Renovación | Mes 6+ | Informe ROI + expansión + referido |

---

*proceso.md — AgriVision | Abril 2026*

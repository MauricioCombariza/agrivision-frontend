# Service Blueprint Canvas — AgriVision
> Versión 1.0 | Marzo 2026
> Framework: Service Blueprint (Shostack/NNG) adaptado para SaaS de campo B2B
> Segmento mapeado: Gerente de floricultora 100–200 ha, Sabana Norte de Bogotá

---

## Qué resuelve este documento

El Business Model Canvas responde *qué negocio construimos*.
El Lean Canvas responde *qué hipótesis validamos*.
El **Service Blueprint** responde **cómo se entrega el servicio en la realidad operativa** — cada paso que el cliente ve, cada paso que no ve, y cada sistema que lo sostiene.

Para AgriVision, esto es crítico: el valor no está en la app sino en la cadena completa que va desde una **foto tomada en el cultivo** hasta una **decisión de exportación confirmada**. Ese flujo completo es lo que este documento mapea.

---

## Mapa de Empatía del Gerente (base del blueprint)

> **Carlos, 42 años** — Gerente General, floricultora 120 ha, Cajicá.
> 4 pedidos de exportación activos a Miami. Mercado de San Valentín en 6 semanas.
> Herramientas actuales: WhatsApp con el jefe de producción + Excel del agrónomo.
> Frase: *"Cada vez que confirmo un pedido grande, estoy apostando. No sé cuánto va a estar listo."*

| Dimensión | Estado actual (sin AgriVision) | Estado objetivo (con AgriVision) |
|---|---|---|
| **Piensa** | "¿Cuánto realmente va a estar listo la próxima semana?" | "Los datos dicen 18.400 tallos. Confirmo el pedido." |
| **Siente** | Ansiedad al confirmar pedidos. Culpa si se incumple. | Confianza basada en evidencia del propio cultivo |
| **Hace** | Camina el campo, pregunta al agrónomo, anota en Excel | Revisa dashboard en tablet antes de llamar al exportador |
| **Dice** | "Creemos que vamos a tener... más o menos..." | "Tenemos confirmados 18.200 tallos para el viernes." |
| **Dolor principal** | Error 20–30% en proyección = pérdida $30–100M COP/evento | Error <15% = cumplimiento de contratos + reputación |

---

## Las 6 Fases del Viaje del Cliente

```
FASE 1          FASE 2          FASE 3          FASE 4           FASE 5          FASE 6
Descubrimiento  Evaluación      Onboarding      Operación        Decisión de     Renovación /
& Contacto      & Demo          & Activación    Diaria           Exportación     Expansión

[Semanas -8 a   [Semanas -4 a   [Semana 0       [Semanas 1–8     [Semana 4+,     [Mes 6+,
 -4 antes del   0 antes del     a Semana 2]     de uso activo]   recurrente]     cada 12 meses]
 primer demo]   primer pago]
```

---

## Blueprint Completo

> **Lectura del mapa:** Las filas representan capas operativas. Las columnas son las 6 fases del viaje del cliente.
> `★` = Momento de la Verdad | `⚠️` = Punto de falla crítico | `💡` = Oportunidad de mejora

---

### CAPA 0 — Evidencia Física y Digital *(lo que el cliente toca/ve en cada fase)*

| Fase | Artefactos visibles |
|------|-------------------|
| **F1 Descubrimiento** | Post LinkedIn con caso de estudio y ROI cuantificado · Stand en Proflora · Referencia de contacto en red del fundador · WhatsApp del fundador |
| **F2 Evaluación / Demo** | Demo en campo con celular del cliente · Reporte de muestra con 1 lote analizado · Propuesta comercial PDF (PandaDoc) · Calculadora ROI en la propuesta |
| **F3 Onboarding** | Email de bienvenida + credenciales · PWA instalada en celular operador · Guía de captura visual (impresa o PDF) · Dashboard web en computador gerente · Primera proyección del lote piloto |
| **F4 Operación Diaria** | App PWA en campo (fotos + QR) · Dashboard de inventario fisiológico · Alertas de enfermedad (push/email) · Reporte semanal automático por email · Tablero logístico (pallets, camiones) |
| **F5 Decisión Exportación** | Dashboard con proyección XGBoost a 1–4 semanas · Alerta de confirmación de pedido · Comparativo proyectado vs. realizado (histórico) · Informe ejecutivo descargable PDF |
| **F6 Renovación / Expansión** | Informe de impacto anual (ROI demostrado, eventos evitados) · Propuesta de expansión (nuevos lotes, nuevo módulo) · Contrato renovación (PandaDoc) |

---

### CAPA 1 — Acciones del Cliente *(lo que el gerente y su equipo hacen)*

| Fase | Acciones del gerente (Carlos) | Acciones del equipo de campo |
|------|------------------------------|------------------------------|
| **F1 Descubrimiento** | Ve post LinkedIn con caso floricultura · Pregunta a colega de la industria · Agenda reunión por WhatsApp con fundador | — |
| **F2 Evaluación / Demo** `★` | Camina 1 lote con el fundador · Ve la app tomar fotos y generar inventario en tiempo real · Recibe propuesta comercial · Negocia precio y alcance · **Firma contrato** *(Momento de la Verdad #1)* | Jefe de producción asiste al demo y valida con su conocimiento del cultivo |
| **F3 Onboarding** `★` | Accede al dashboard por primera vez · Revisa primera proyección del lote piloto · Configura umbrales de alerta con fundador | Operador: instala PWA · aprende protocolo de captura · realiza primeras capturas guiadas (semanas 1–2) |
| **F4 Operación Diaria** | Abre dashboard 3+ veces/semana · Revisa alertas de enfermedad · Aprueba decisiones de tratamiento · Comparte reporte semanal con agrónomo | Operador: captura fotos de camas cada 2–3 días · escanea QR de cajas · registra movimientos de pallets y camiones |
| **F5 Decisión Exportación** `★` | Consulta dashboard antes de llamar al exportador · **Confirma pedido con base en proyección AgriVision** *(Momento de la Verdad #2)* · Contrasta proyección vs. realizado después de cada exportación | Jefe de producción: valida los datos antes de confirmar al gerente |
| **F6 Renovación / Expansión** | Recibe informe ROI del año · Evalúa expandir a nuevos módulos · **Renueva contrato** · Refiere a colega floricultora *(Momento de la Verdad #3)* | — |

---

```
════════════════════════════════════════════════════════════════════════
                    LÍNEA DE INTERACCIÓN (cliente ↔ plataforma / fundador)
════════════════════════════════════════════════════════════════════════
```

---

### CAPA 2 — Acciones Frontstage *(lo que el cliente ve de AgriVision: plataforma + fundador)*

| Fase | Plataforma / App | Fundador / CS |
|------|-----------------|---------------|
| **F1 Descubrimiento** | Landing page · LinkedIn profile | Contacto directo WhatsApp · Red de referidos en floricultura colombiana |
| **F2 Demo / Evaluación** `★` | App PWA en campo: captura foto → detección YOLOv8 → inventario live en pantalla | Demo presencial 1h en el lote del prospecto · Propuesta comercial personalizada con ROI calculado |
| **F3 Onboarding** | Email bienvenida con credenciales · Sesión de configuración en plataforma · Dashboard con primer lote activo | Sesión de onboarding 2h (presencial o videollamada) · Protocolo de captura para operadores · Disponible por WhatsApp semana 1–2 |
| **F4 Operación Diaria** `⚠️` | PWA: cámara → inferencia CV → guardado offline → sync cuando hay WiFi · Dashboard: inventario por lote/cama/estado fisiológico · Alertas push: enfermedad detectada con nivel de confianza · Reporte semanal automático email | Check-in proactivo semanal (WhatsApp) los primeros 30 días · Respuesta <4h a preguntas críticas · Review mensual de resultados por videollamada |
| **F5 Decisión** `★` | Dashboard: proyección XGBoost (1–4 semanas) con intervalo de confianza · Histórico proyectado vs. realizado · PDF exportable "Informe de pedido" | Disponible para validar proyección antes de confirmar pedidos grandes |
| **F6 Renovación** | Informe ROI automático: eventos de enfermedad detectados, proyecciones vs. realizado, inventario acumulado | Reunión anual de revisión · Propuesta de expansión con nuevos módulos o nuevos lotes |

---

```
════════════════════════════════════════════════════════════════════════
                    LÍNEA DE VISIBILIDAD (visible ↑ / invisible ↓)
════════════════════════════════════════════════════════════════════════
```

---

### CAPA 3 — Acciones Backstage *(lo que AgriVision hace y el cliente no ve)*

| Fase | Proceso invisible | Responsable | Tiempo |
|------|-----------------|-------------|--------|
| **F1 Descubrimiento** | Prospección en LinkedIn/Asocolflores · Mapeo de fincas objetivo (ha, contacto, temporadas) · CRM básico (Notion) | Fundador | Continuo |
| **F2 Demo** | Preparación demo personalizada (lote específico del prospecto) · Construcción propuesta con precios y ROI calculado | Fundador | 2–4h por prospecto |
| **F3 Onboarding** `⚠️` | Creación tenant en BD multi-tenant (PostgreSQL) · Configuración inicial: finca → lotes → camas · Upload imágenes iniciales para calibrar modelo al lote específico · Validación que capturas campo son de calidad suficiente para inferencia | Fundador | 4–8h |
| **F4 Operación Diaria** | **Pipeline de datos diario:** imagen subida → queue Redis → inferencia YOLOv8 (CPU Hetzner) → resultados guardados PostgreSQL + imágenes MinIO → dashboard actualizado | Sistema automatizado | <3 min por imagen |
| **F4 continuación** `⚠️` | Monitoreo calidad de capturas (imágenes borrosas, ángulo incorrecto, poca luz) · Si calidad baja → alerta al operador de campo · Backup automático datos críticos | Fundador + sistema | Diario |
| **F5 Decisión** | **Pipeline XGBoost (Step 8 del Blueprint):** features = ratios de estado fisiológico + días desde último corte + estacionalidad + lags históricos · Inferencia → proyección + intervalo de confianza → dashboard | Sistema (disponible desde Semana 8+) | Actualización cada noche |
| **F6 Renovación** | Cálculo automático métricas de impacto (eventos detectados, ahorro calculado, precisión proyecciones) · Preparación propuesta de expansión | Fundador | 2h/cliente/año |

---

```
════════════════════════════════════════════════════════════════════════
              LÍNEA DE INTERACCIÓN INTERNA (campo ↔ sistemas de soporte)
════════════════════════════════════════════════════════════════════════
```

---

### CAPA 4 — Procesos de Soporte *(infraestructura, sistemas y datos que sostienen todo)*

| Categoría | Componente | Stack | Estado |
|---|---|---|---|
| **Infraestructura** | VPS Hetzner (2 vCPU, 4GB RAM) | Ubuntu + Docker Compose | ✅ Activo |
| **Inferencia CV** | YOLOv8-nano sin GPU (CPU inference ~200ms/img) | Python + Ultralytics | ✅ Producción |
| **Modelo Clavel** | 4 clases: Estado_0–3, 312 imgs, mAP >0.85 esperado | YOLOv8 + Google Colab training | 🔄 Re-entrenar |
| **Conteo Cajas** | 3 clases: pallet/lateral/frontal, 97.45% mAP50 | YOLOv8 | ✅ Listo |
| **Base de datos** | Multi-tenant shared schema con tenant_id isolation | PostgreSQL (Hetzner) | 🔄 Step 2 Blueprint |
| **Storage imágenes** | Imágenes de campo organizadas por tenant/finca/fecha | MinIO (Hetzner) | 🔄 Step 2 Blueprint |
| **Queue inferencia** | Jobs asíncronos para no bloquear la app | Redis | 🔄 Step 2 Blueprint |
| **API Backend** | FastAPI con JWT auth multi-tenant | Python + FastAPI | 🔄 Step 1–4 Blueprint |
| **Frontend gerente** | Dashboard web responsivo | Next.js 15 + Tailwind | 🔄 Step 5 Blueprint |
| **App campo** | PWA con offline capability | Next.js PWA + Service Worker | 🔄 Step 6 Blueprint |
| **App móvil** | APK Android sin app store | Capacitor wrapping PWA | 🔄 Step 7 Blueprint |
| **Forecast** | XGBoost producción 1–4 semanas | Python + scikit-learn | ⏳ Requiere 30+ días data |
| **Training ML** | Re-entrenamiento de modelos | Google Colab Pro (permanente) | ✅ Definido |
| **CI/CD** | Deploy automático en push a main | GitHub Actions → Hetzner | 🔄 Step 1 Blueprint |
| **Observabilidad** | Logs + métricas + alertas | Grafana + Sentry | 🔄 Step 1 Blueprint |
| **CRM** | Pipeline ventas + seguimiento clientes | Notion (gratis) → HubSpot | ✅ Operativo |
| **Facturación** | Contabilidad y facturación electrónica | Siigo (Colombia) | Planificado |

**Leyenda:** ✅ Listo | 🔄 En construcción (ver Blueprint técnico) | ⏳ Bloqueado por dependencia de datos

---

## Capa Transversal — Estados Emocionales

> El viaje emocional del gerente es tan importante como el técnico.
> El servicio falla si el gerente no confía en los datos aunque sean técnicamente correctos.

| Fase | Emoción dominante | Señal de peligro | Acción de AgriVision |
|------|------------------|------------------|----------------------|
| **F1** | Curioso pero escéptico. "¿Otro tech que promete?" | Desenganche rápido si no hay referencia confiable | Entrada por red directa (no cold outreach) |
| **F2** `★` | Sorprendido ("funciona de verdad") → nervioso al ver el precio | "No sé si mi operador va a poder usarlo" | Demo con el operador presente. Mostrar simplicidad: 1 foto = 1 resultado |
| **F3** | Ansiedad del comienzo. "¿Y si los datos están mal?" | Primera proyección muy diferente a su estimado empírico | Calibrar expectativas: "La precisión mejora con más datos. Semana 1 es línea base." |
| **F4 early** `⚠️` | Frustración si el operador no captura consistente | Abandono silencioso: el operador deja de usar la app | Check-in proactivo semana 2. Protocolo de captura visible. |
| **F4 established** | Rutina. Confianza creciente. | Complacencia: deja de revisar alertas | Alertas bien calibradas — no spam, solo señales reales |
| **F5** `★★` | **Alivio.** Primera vez que confirma un pedido con datos. | Proyección errónea en la primera confirmación importante → pérdida de confianza catastrófica | NUNCA dar proyección sin intervalo de confianza. Si el modelo tiene <30 días de datos, decirlo explícitamente. |
| **F6** | Orgullo. "Tomo mejores decisiones." | Complacencia → busca alternativas si no percibe mejora continua | Informe ROI anual con impacto cuantificado ($COP ahorrados, eventos detectados) |

---

## Momentos de la Verdad — Detalle

### `★★★` Momento de la Verdad #1 — La Demo en Campo
**Cuándo:** Primera visita al lote del prospecto con la app.
**Qué debe pasar:** El gerente toma la foto con SU propio celular (no el del fundador), ve el resultado en 5 segundos, reconoce los estados fisiológicos en la pantalla como los que él conoce de su cultivo.
**Por qué importa:** Si el modelo detecta algo que el gerente sabe que está mal, la venta muere. Si detecta bien, la conversación pasa de "¿funciona?" a "¿cuánto cuesta?".
**Riesgo de falla:** Modelo clavel no está re-entrenado con suficiente varianza de condiciones de campo (luz, ángulo, variedad).
**Mitigación:** Re-entrenar antes del primer demo con cliente pagante. Hacer demo en condición controlada (buen ángulo, buena luz) mientras el modelo mejora.

### `★★★` Momento de la Verdad #2 — Primera Proyección de Exportación
**Cuándo:** Semana 4–6 de uso activo. El gerente tiene un pedido grande. Abre el dashboard antes de confirmar.
**Qué debe pasar:** La proyección XGBoost dice "18.200 tallos listos viernes próximo (±15%)". El gerente compara con su estimado empírico, acepta la diferencia, confirma el pedido. El viernes siguiente: el resultado real está dentro del intervalo.
**Por qué importa:** Este es el evento que convierte al cliente de "usuario" a "defensor". Si funciona, renueva y refiere. Si falla, cancela.
**Riesgo de falla:** XGBoost con menos de 30 días de datos da proyecciones poco confiables. El gerente confirma el pedido con datos inmaduros y pierde dinero.
**Mitigación:** Comunicar explícitamente la madurez del modelo. Mostrar el intervalo de confianza siempre. No esconder la incertidumbre — el gerente la respeta más de lo que parece.

### `★★★` Momento de la Verdad #3 — La Renovación y la Referencia
**Cuándo:** Mes 10–12. El gerente recibe el informe de impacto anual.
**Qué debe pasar:** Ve cuántas alertas de enfermedad evitaron pérdidas, cuántos pedidos se confirmaron correctamente, cuánto mejoró la precisión de proyección respecto al inicio.
**Por qué importa:** La renovación es fácil si el ROI es visible. La referencia a un colega es el canal de adquisición de menor costo y mayor conversión.
**Riesgo de falla:** Los datos de impacto no se rastrean sistemáticamente → no hay informe comprobable.
**Mitigación:** Desde el onboarding, registrar la línea base: "¿Cuál es tu error actual de proyección?" y "¿Cuánto perdiste el último San Valentín?" Esto convierte el informe anual en un antes/después concreto.

---

## Puntos de Falla Críticos (⚠️) — Mapa de Riesgo Operativo

| # | Fase | Falla | Impacto | Probabilidad | Mitigación |
|---|------|-------|---------|:------------:|-----------|
| 1 | F3 Onboarding | Operador de campo no captura consistentemente | El modelo no tiene datos → no hay proyección confiable | Alta | Protocolo de captura simple. Gamificación ligera (streak de días capturados). Check-in semanal. |
| 2 | F4 Operación | Calidad de imagen insuficiente (poca luz, foto borrosa, ángulo incorrecto) | Inferencia YOLOv8 con baja confianza → alertas falsas | Media | Guía visual de captura. Umbral mínimo de confianza → rechazo con mensaje claro en app. |
| 3 | F5 Decisión | XGBoost da proyección incorrecta en primera confirmación de pedido grande | Pérdida de confianza → cancelación | Media | Mostrar madurez del modelo (días de datos). No proyectar si <21 días de data. Siempre mostrar intervalo. |
| 4 | F4 Operación | Hetzner VPS cae durante temporada alta (San Valentín, Día de la Madre) | Cliente no puede acceder a datos críticos | Baja | Offline queue en PWA (datos no se pierden). Monitoreo Grafana. Plan de respaldo activo pre-temporada. |
| 5 | F2 Demo | Modelo clavel falla en condiciones del lote del prospecto (variedad diferente, luz dura) | Demo fallida → no hay cierre | Media | Re-entrenar antes de demos pagantes. Seleccionar condiciones de demo favorables inicialmente. |
| 6 | F4 Multi-tenant | Bug de aislamiento expone datos de un cliente a otro | Pérdida de confianza, posible legal | Muy baja | Pruebas de aislamiento en Step 2. Row-level security en PostgreSQL. Auditoría de accesos. |
| 7 | F1 Adquisición | Prospecto en red directa agotado sin conversión | Estancamiento sin clientes pagantes | Alta | Activar canal Asocolflores. Caso de estudio publicado. Proflora octubre 2026. |

---

## KPIs por Fase del Blueprint

| Fase | KPI principal | Target | Cómo medirlo |
|------|--------------|--------|--------------|
| **F1 Adquisición** | Demos agendadas / mes | 2+ demos/mes | CRM Notion |
| **F2 Conversión** | Tasa de cierre demo → contrato | >30% | CRM |
| **F3 Activación** | % días con captura activa en semana 1–2 | >80% | Logs PWA |
| **F4 Retención** | Gerente abre dashboard 3+/semana | >70% clientes | Analytics backend |
| **F4 Calidad** | % imágenes con confianza YOLOv8 ≥85% | >75% imágenes | Pipeline CV |
| **F5 Valor** | Error proyección XGBoost MAPE | <15% | Cálculo mensual proyectado vs. realizado |
| **F5 Valor** | Decisiones exportación con datos AgriVision/semana | Crecer semana a semana | Dashboard interno |
| **F6 Renovación** | Net Revenue Retention (NRR) | >110% (expansión de módulos) | Facturación |
| **F6 Referencia** | Nuevos clientes por referido / total nuevos clientes | >50% | CRM |

---

## Cadencia Operativa del Servicio

| Frecuencia | Quién | Actividad |
|---|---|---|
| **Cada 2–3 días** | Operador cliente | Captura de fotos en camas asignadas → sync automático |
| **Diaria** | Sistema (automático) | Inferencia CV batch → actualización inventario → generación alertas |
| **Cada noche** | Sistema (automático) | Re-cálculo proyección XGBoost (cuando activo) → dashboard actualizado |
| **Semanal** | Sistema (automático) | Reporte resumen enviado al email del gerente |
| **Semanal** | Fundador | Check-in proactivo (WhatsApp) clientes primeros 30 días |
| **Mensual** | Fundador | Review de resultados por videollamada (30 min) con gerente |
| **Cada temporada** | Fundador | Pre-revisión datos antes de San Valentín / Día de la Madre / Navidad |
| **Anual** | Fundador | Informe de impacto + reunión de renovación |

---

## Resumen Visual del Blueprint (Vista de Una Página)

```
═══════════════════════════════════════════════════════════════════════════════════════
FASES →      F1: DESCUBRIR   F2: DEMO ★   F3: ONBOARD   F4: OPERAR    F5: DECIDIR ★★  F6: RENOVAR
═══════════════════════════════════════════════════════════════════════════════════════
EVIDENCIA    LinkedIn post   App en campo  Dashboard web  PWA campo     Dashboard con   Informe ROI
FÍSICA       Referido red    Propuesta PDF Guía captura   Alertas push  proyección       Propuesta
             WhatsApp        Calculadora   Credenciales   Reporte email PDF informe       expansión
             fundador        ROI           bienvenida     semanal       ejecutivo         anual
───────────────────────────────────────────────────────────────────────────────────────
CLIENTE      Ve post/ref     Camina lote   Accede         Captura       Consulta antes  Recibe ROI
(Gerente)    Agenda demo     con fundador  dashboard      diaria (op.)  de confirmar    Renueva
                             Firma ctto    Configura      Revisa alertas pedido Miami    Refiere
                                           alertas        3+/semana
───────────────────────────────────────────────────────────────────────────────────────
             ════════════════════ LÍNEA DE INTERACCIÓN ════════════════════════════════
───────────────────────────────────────────────────────────────────────────────────────
FRONTSTAGE   Landing page    Demo live     Email + creden  App PWA      Dashboard       Informe
(Visible)    LinkedIn        campo + prop  sesión config   Dashboard    XGBoost +       automático
             WhatsApp        PandaDoc      protocolo       Alertas      intervalo       Reunión
                             comercial     captura         Reportes     confianza       renovación
───────────────────────────────────────────────────────────────────────────────────────
             ════════════════════ LÍNEA DE VISIBILIDAD  ════════════════════════════════
───────────────────────────────────────────────────────────────────────────────────────
BACKSTAGE    Prospección     Preparación   Creación tenant Pipeline CV  XGBoost         Cálculo
(Invisible)  CRM Notion      demo          BD + MinIO      diario auto. nocturno auto.  impacto
             Mapeo fincas    Propuesta     Calibración     Monitor      Proyección       Propuesta
             objetivo        con ROI       modelo inicial  calidad img  1–4 semanas      expansión
───────────────────────────────────────────────────────────────────────────────────────
             ══════════════ LÍNEA DE INTERACCIÓN INTERNA ════════════════════════════
───────────────────────────────────────────────────────────────────────────────────────
SOPORTE      Hetzner VPS     YOLOv8 listo  PostgreSQL      Redis queue  XGBoost model   Analytics
(Sistemas)   GitHub repo     para demo     multi-tenant    MinIO imág.  (Step 8)        engine
             Google Colab    Google Colab  JWT auth        Nginx/TLS    Google Colab    CRM + billing
             training        training      FastAPI API     Grafana/Sentry FastAPI API    Siigo
═══════════════════════════════════════════════════════════════════════════════════════
EMOCIÓN      Curioso/        Sorprendido   Ansioso:        Rutina →     ★ ALIVIO ★     Orgullo
GERENTE      escéptico       ("funciona")  ¿datos ok?      confianza    Primera vez     Confianza
             "¿otro tech?"   → nervioso    → Calibrar      creciente    pedido con      "Decido
                             precio        expectativas                  datos reales    con datos"
═══════════════════════════════════════════════════════════════════════════════════════
```

---

## Relación con los Otros Canvas

| Documento | Pregunta que responde | Relación con este blueprint |
|---|---|---|
| **Business Model Canvas** | ¿Qué negocio construimos? | Define los bloques (segmentos, canales, ingresos) que este blueprint operacionaliza |
| **Lean Canvas** | ¿Qué hipótesis validamos? | Las hipótesis #1 (pagan por proyección) y #2 (usan la app) se validan en F3 y F5 de este blueprint |
| **Strategy Canvas (Blue Ocean)** | ¿Dónde nos diferenciamos? | La diferenciación "campo → dato en minutos" se entrega en F4 (Pipeline CV diario automático) |
| **Product Strategy Report** | ¿Qué construimos primero? | El Epic 1A (app CV campo) corresponde a F3–F4. El Epic 2A (XGBoost) corresponde a F5 |
| **Blueprint Técnico (9 steps)** | ¿Cómo lo construimos? | Los Steps 1–7 habilitan F1–F4. Step 8 (XGBoost) habilita F5. Step 9 (RL) mejora F5 en 2028 |
| **Operating Model** | ¿Con quién lo operamos? | Fase 0 (solo fundador) = opera todas las capas de este blueprint. Fase 1 (+Comercial/CS) = añade recurso en F1, F2, F6 |

---

## Próximos Pasos Concretos (Derivados del Blueprint)

| Prioridad | Acción | Plazo | Fase del blueprint que habilita |
|---|---|---|---|
| 🔴 URGENTE | Re-entrenar modelo YOLOv8 clavel (Step 3 Blueprint) | Antes de primer demo pagante | F2 Demo — sin esto el Momento de la Verdad #1 falla |
| 🔴 URGENTE | Aplicar World Food Prize ($50K USD, deadline 15 abril 2026) | Esta semana | Capital para acelerar F3–F4 |
| 🟠 ALTA | Completar Steps 1–2 Blueprint (FastAPI + PostgreSQL multi-tenant) | Abril 2026 | F3 Onboarding habilitado |
| 🟠 ALTA | Definir y documentar protocolo de captura campo | Antes primer cliente pagante | F4 Operación — calidad de datos |
| 🟡 MEDIA | Steps 3–7 Blueprint (CV service + Dashboard + PWA + APK) | Mayo–Julio 2026 | F4 Operación completa |
| 🟡 MEDIA | Activar AWS Activate ($100K créditos) + Google for Startups ($200K) | Abril 2026 | Reduce costo soporte F4 |
| 🟢 NORMAL | Step 8 XGBoost (requiere 30+ días de datos del primer cliente) | Agosto 2026+ | F5 Decisión de exportación |
| 🟢 NORMAL | Construir caso de estudio con ROI cuantificado (primer cliente) | Q3 2026 | F1 Adquisición — segundo cliente |

---

*Service Blueprint Canvas v1.0 — AgriVision — Marzo 2026*
*Framework: Lynn Shostack (1984) / Nielsen Norman Group / adaptado para SaaS de campo B2B en floricultura colombiana*

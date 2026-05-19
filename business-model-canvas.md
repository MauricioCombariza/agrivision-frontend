# Business Model Canvas — AgriVision
> Versión 1.1 | Marzo 2026 | Sabana Norte de Bogotá, Colombia

---

## Canvas Visual

```
┌─────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ 8. SOCIOS CLAVE         │ 7. ACTIVIDADES CLAVE     │ 2. PROPUESTA DE VALOR    │ 4. RELACIÓN CON CLIENTES │ 1. SEGMENTOS DE CLIENTES │
│                         │                          │                          │                          │                          │
│ • Clientes ancla        │ • Captura y anotación    │ Para floricultores:      │ • Asistencia personal    │ A. Floricultores         │
│   (primeros             │   de imágenes en campo   │ • Ver el estado          │   directa (dueño/        │   medianos-grandes       │
│   floricultores)        │ • Entrenamiento           │   fisiológico de los     │   gerente) — etapa       │   100–500 ha en          │
│ • Asocolflores          │   continuo de modelos    │   cultivos en tiempo     │   temprana               │   Sabana Norte           │
│ • Proveedores cloud     │   CV + XGBoost           │   real                   │ • Self-service:          │                          │
│   (AWS/GCP)             │ • Desarrollo de app      │ • Detección temprana     │   dashboard autónomo     │ B. Agremiaciones         │
│ • Labs diagnóstico      │   móvil + dashboard web  │   de enfermedades        │   para el gerente        │   floricultoras          │
│   fitosanitario         │ • Ventas y relaciones    │ • Proyección de          │ • Co-creation con        │   (Asocolflores y        │
│ • Universidades         │   con clientes           │   producción semanal/    │   primeros clientes      │   similares)             │
│   (Unal, UniAndes)      │ • Análisis e informes    │   mensual (XGBoost)      │   (definen producto)     │                          │
│ • Finagro /             │   para clientes          │ • Inventario sin papel:  │ • Comunidad sectorial    │ C. Sector financiero     │
│   Bancoldex             │                          │   lectura QR y cajas     │   vía agremiaciones      │   (bancos agro,          │
│                         ├──────────────────────────┤   con foto               │                          │   fondos, Finagro)       │
│                         │ 6. RECURSOS CLAVE        │ • Dashboard para         ├──────────────────────────┤   que evalúan fincas     │
│                         │                          │   gerentes: todo a       │ 3. CANALES               │   para crédito           │
│                         │ Intelectuales:           │   un click               │                          │                          │
│                         │ • Modelos CV entrenados  │                          │ Awareness:               │ D. (Futuro) Otros        │
│                         │   con flores colombianas │ Para sector financiero:  │ • Red contactos          │   cultivos y regiones    │
│                         │ • Dataset propio         │ • Due diligence          │   del fundador           │                          │
│                         │   (ventaja competitiva   │   agrícola objetivo:     │ • Asocolflores           │                          │
│                         │   creciente)             │   conteo de plantas,     │ • Ferias (Agroexpo)      │                          │
│                         │ • 10+ años experiencia   │   estado fitosanitario,  │ • LinkedIn + casos       │                          │
│                         │   en cultivos de flores  │   estimación producción  │   de estudio             │                          │
│                         │ • Red de contactos       │   y valoración del       │                          │                          │
│                         │   en la industria        │   activo                 │ Evaluación:              │                          │
│                         │                          │ • Reducción del riesgo   │ • Demo en campo          │                          │
│                         │ Tecnológicos:            │   crediticio con data    │   con data real          │                          │
│                         │ • Infraestructura cloud  │   real                   │ • Piloto 30–60 días      │                          │
│                         │ • App móvil + dashboard  │                          │                          │                          │
│                         │                          │                          │ Compra/Entrega:          │                          │
│                         │ Humanos:                 │                          │ • Venta directa          │                          │
│                         │ • Fundador               │                          │ • App móvil (campo)      │                          │
│                         │   (técnico + dominio)    │                          │ • Dashboard web          │                          │
│                         │                          │                          │   (gerencia)             │                          │
├─────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┤
│ 9. ESTRUCTURA DE COSTOS                                                │ 5. FUENTES DE INGRESOS                                      │
│                                                                        │                                                             │
│ Fijos (hoy):                                                           │ Floricultores — Suscripción mensual por módulo:             │
│ • Tiempo del fundador (costo de oportunidad)                           │   • Módulo Campo (CV + estado fisiológico + enfermedades)   │
│ • Infraestructura cloud (bajo mientras escala)                         │   • Módulo Proyección (XGBoost producción futura)           │
│ • Herramientas de desarrollo y licencias                               │   • Módulo Logística (QR, cajas, pallets, camiones)         │
│                                                                        │   Precio referencia: $50K–$150K COP/ha/mes (a validar)      │
│ Variables (al escalar):                                                │                                                             │
│ • Costo captura en campo (personal / drones)                           │ Sector financiero — Pago por informe de valoración:         │
│ • Procesamiento cloud por volumen de imágenes                          │   $2M–$5M COP por informe de due diligence agrícola         │
│ • Personal técnico adicional (dev, data scientist)                     │                                                             │
│ • Ventas / customer success                                            │ Setup fee + mensualidad (opción híbrida)                    │
│                                                                        │                                                             │
│ Enfoque: VALUE-DRIVEN (el dato de campo = activo diferenciador)        │ Objetivo LTV:CAC > 3:1                                      │
└────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## Detalle de los 9 Bloques

### 1. Segmentos de Clientes

| Segmento | Descripción | Tamaño objetivo | Atractividad |
|----------|-------------|-----------------|--------------|
| **A — Floricultores medianos-grandes** | Empresas con 100–500 ha en Sabana Norte de Bogotá. Exportadoras (75% a USA), alta presión logística (San Valentín, Día de la Madre). Cundinamarca = 66% de las ~8,900 ha nacionales (~5,874 ha en la región). Colombia exportó USD $2.34B en flores en 2024. | ~60–120 empresas de +100 ha en Cundinamarca | ★★★★★ |
| **B — Agremiaciones floriculturas** | Asocolflores y similares. Canal de distribución y validación. Pueden licenciar el servicio para sus afiliados. | 2–3 agremiaciones clave | ★★★★☆ |
| **C — Sector financiero agro** | Bancos, fondos, Finagro. Necesitan valoración objetiva de fincas antes de otorgar créditos. Pagan por informe puntual. | Alto poder adquisitivo | ★★★★☆ |
| **D — Expansión futura** | Otros cultivos (hortalizas, papa, café) y otras regiones de Colombia | Mercado amplio | ★★★☆☆ |

**Tipo de mercado:** Segmentado (cada segmento tiene necesidades y disposición a pagar distintas)

---

### 2. Propuesta de Valor

#### Para Floricultores
| Job to be Done | Dolor Actual | Ganancia AgriVision |
|---------------|-------------|---------------------|
| Saber cuántas flores están en cada estado fisiológico hoy | Conteos manuales, lentos e imprecisos | Inventario visual automatizado: botón, apertura, flor lista — en tiempo real |
| Saber cuánto se va a producir la próxima semana/mes | Proyecciones basadas en experiencia, sin data | Modelo XGBoost con históricos + estado actual = proyección de producción confiable |
| Detectar enfermedades antes de que se propaguen | Se detectan tarde, pérdidas masivas | CV identifica síntomas tempranos, alerta inmediata |
| Controlar logística de despacho sin papel | Errores en cajas, pallets y camiones | Foto → lectura QR/caja → registro automático de pallet y camión |
| Gerente toma decisiones sin depender de reportes manuales | Información fragmentada, desactualizada | Dashboard centralizado: todo el inventario a un click |

#### Para Sector Financiero
| Necesidad | Situación actual | Valor AgriVision |
|-----------|-----------------|------------------|
| Evaluar si una finca vale lo que dice valer | Peritajes costosos, subjetivos y lentos | Informe objetivo con conteo de plantas, estado fitosanitario, estimación de producción y valoración del activo |
| Estimar el riesgo real de prestar sobre un cultivo | El banco no tiene visibilidad del campo | Data de campo real = riesgo cuantificado |

---

### 3. Canales

| Fase | Canal | Notas |
|------|-------|-------|
| **Awareness** | Red de contactos del fundador en floricultura | Canal más eficiente en etapa temprana |
| **Awareness** | Asocolflores y ferias (Agroexpo Colombia) | Credibilidad sectorial |
| **Awareness** | LinkedIn + casos de estudio con data real | Contenido que demuestra resultados |
| **Evaluación** | Demo en campo con datos del propio cliente | El cliente ve su finca procesada = venta natural |
| **Evaluación** | Piloto gratuito 30–60 días | Elimina fricción de entrada, genera datos propios |
| **Compra** | Venta directa (fundador como comercial) | Alta personalización, adecuado para etapa inicial |
| **Entrega** | App móvil para captura en campo | El trabajador toma fotos, el modelo procesa |
| **Entrega** | Dashboard web para gerencia | Toma de decisiones en tiempo real |
| **Post-venta** | Soporte directo + capacitación al personal | Crítico para adopción en campo |

---

### 4. Relación con Clientes

| Tipo | Aplicación | Objetivo |
|------|-----------|----------|
| **Asistencia personal dedicada** | Primeros 3–5 clientes ancla | Asegurar adopción y retroalimentación para mejorar el producto |
| **Co-creación** | Primeros clientes definen funcionalidades del roadmap | Construir el producto que el mercado necesita |
| **Self-service** | Dashboard autónomo para el gerente | Reducir dependencia del equipo, escalar sin crecer en soporte |
| **Comunidad sectorial** | Via agremiaciones, compartir benchmarks del sector | Stickiness y valor adicional (datos comparativos) |

---

### 5. Fuentes de Ingresos

#### Opción recomendada: Suscripción por módulo + cobro por informe

| Stream | Modelo | Precio referencia | Notas |
|--------|--------|-------------------|-------|
| **Módulo Campo** (CV estado fisiológico + enfermedades) | Suscripción mensual por hectárea | $80K–$150K COP/ha/mes | Validar con primeros clientes |
| **Módulo Proyección** (XGBoost producción futura) | Incluido o add-on | $30K–$50K COP/ha/mes | Diferenciador clave |
| **Módulo Logística** (QR, cajas, pallets, camiones) | Suscripción mensual por finca | $1.5M–$3M COP/mes/finca | Independiente del tamaño |
| **Informe de valoración** (sector financiero) | Pago por informe | $2M–$5M COP/informe | Alta margen, bajo volumen |
| **Setup / onboarding** | Cobro único | $3M–$8M COP | Cubre costo de implementación inicial |

**Ejemplo de ticket mensual para cliente de 100 ha:**
- Módulo Campo: 100 ha × $100K = $10M COP/mes
- Módulo Proyección: 100 ha × $40K = $4M COP/mes
- Módulo Logística: $2M COP/mes
- **Total: ~$16M COP/mes (~$4,000 USD/mes)**

**Mecanismo de precio:** Fijo (por hectárea + por finca) con descuento anual (15–20%)

**Benchmark vs competencia (USD/ha/mes):**
- Granular / Farmonaut (satélite, genérico): $1–$3 USD/ha/mes
- EOSDA Professional: est. $3–$8 USD/ha/mes
- Agerpix (CV en campo, frutas): est. $15–$40 USD/ha/mes
- **AgriVision (CV en campo, flores + logística): $20–$37 USD/ha/mes** ← precio justificado por especialización y módulo logístico único

---

### 6. Recursos Clave

| Categoría | Recursos | Prioridad |
|-----------|----------|-----------|
| **Intelectual** | Modelos de CV entrenados con flores colombianas (botritis, mildiu, estados fisiológicos) | Alta — ventaja competitiva creciente |
| **Intelectual** | Dataset propio de imágenes anotadas | Alta — barrera de entrada para competidores |
| **Intelectual** | Modelos XGBoost de proyección de producción calibrados con históricos colombianos | Alta |
| **Humano** | Fundador: 10+ años en cultivos de flores + conocimiento técnico (CV + data science) | Crítico — combinación única |
| **Humano** | Red de contactos en la industria floricultora | Alto — acceso privilegiado al mercado |
| **Tecnológico** | App móvil (captura en campo) + Dashboard web (gerencia) | Media — construir con MVP primero |
| **Tecnológico** | Infraestructura cloud (AWS/GCP) para procesamiento de imágenes | Media |
| **Financiero** | Capital propio para sobrevivir hasta primeros ingresos | Urgente |

---

### 7. Actividades Clave

| Categoría | Actividad | Prioridad ahora |
|-----------|-----------|-----------------|
| **Plataforma** | Captura y anotación de imágenes en campo (data labeling) | Alta — el dataset es el activo |
| **Plataforma** | Entrenamiento continuo de modelos CV (estados fisiológicos + enfermedades) | Alta |
| **Plataforma** | Calibración de modelos XGBoost con históricos de producción | Alta |
| **Plataforma** | Desarrollo de app móvil (captura) + dashboard web (gerencia) | Media — MVP funcional primero |
| **Plataforma** | Procesamiento e integración de lectura QR/cajas | Media |
| **Comercial** | Ventas directas y gestión de relación con clientes ancla | Alta |
| **Comercial** | Generación de casos de estudio con resultados cuantificados | Alta — para escalar ventas |
| **Análisis** | Informes de due diligence para sector financiero | Media — segundo segmento |

---

### 8. Socios Clave

| Socio | Tipo | Qué aportan | Qué reciben |
|-------|------|------------|-------------|
| **Clientes ancla (floricultores)** | Buyer-supplier | Datos reales de campo, feedback, credibilidad | Acceso temprano, precio especial, co-diseño |
| **Asocolflores** | Alianza estratégica | Acceso a 500+ empresas floricultoras, credibilidad | Herramienta de valor para sus afiliados |
| **AWS / GCP** | Buyer-supplier | Infraestructura escalable, créditos para startups | Ingreso de un cliente de largo plazo |
| **Labs diagnóstico fitosanitario** | Alianza estratégica | Validación científica de diagnósticos de CV | Nuevo canal de clientes, datos de enfermedades |
| **Universidades (Unal, UniAndes)** | Alianza estratégica | Talento técnico, investigación, acceso a datasets | Caso de estudio aplicado, proyectos reales |
| **Finagro / Bancoldex** | Potencial cliente + aliado | Volumen de evaluaciones de fincas | Herramienta de evaluación de riesgo agrícola |

---

### 9. Estructura de Costos

| Costo | Tipo | Monto estimado | Horizonte |
|-------|------|----------------|-----------|
| Fundador (costo de oportunidad) | Fijo | — | Hoy |
| Infraestructura cloud (bajo uso) | Variable | $500K–$2M COP/mes | Hoy |
| Herramientas (APIs, librerías, dev tools) | Fijo | $500K COP/mes | Hoy |
| **Primer contratado técnico** (dev o data scientist) | Fijo | $5M–$8M COP/mes | Al tener primer ingreso |
| **Personal de captura en campo** | Variable | $2M–$3M COP/mes/finca | Al escalar |
| Ventas / customer success | Fijo | $5M–$7M COP/mes | Ronda de inversión |
| Infraestructura cloud (escala) | Variable | ~$5–$15/finca/mes USD | Al escalar |

**Enfoque: VALUE-DRIVEN** — La diferenciación está en la calidad del dato y la precisión del modelo, no en ser el más barato.

**Unit economics objetivo:**
- CAC (Costo de adquisición): < $1M COP/cliente
- LTV (100 ha, 24 meses): ~$384M COP
- **LTV:CAC objetivo: > 50:1** (model SaaS con bajo churn en agroindustria)

---

## Checklist de Validación

### Segmentos de Clientes
- [x] Segmentos claramente definidos y distintos
- [ ] Tamaño de mercado cuantificado (pendiente: # de fincas +100ha en Sabana Norte)
- [x] Son rentables de servir

### Propuesta de Valor
- [x] Resuelve problemas reales (validado por 10 años de experiencia en el sector)
- [x] Diferenciado de competidores (integración campo → dato → decisión end-to-end)
- [x] Valor claramente articulado

### Canales
- [x] Canales eficientes (red de contactos = costo casi cero)
- [x] Llegan a los segmentos objetivo
- [ ] Integración cross-fase (pendiente: definir canal digital de largo plazo)

### Relaciones con Clientes
- [x] Relaciones alineadas con expectativas del segmento
- [ ] Estrategia de retención definida formalmente
- [ ] Ruta de upsell definida (módulos adicionales)

### Fuentes de Ingresos
- [ ] Disposición a pagar validada con clientes (pendiente — prioridad urgente)
- [x] Pricing competitivo vs valor generado
- [x] Fuentes diversificadas (floricultores + sector financiero)

### Recursos Clave
- [x] Recursos críticos identificados
- [ ] Dataset anotado en crecimiento activo
- [ ] Protección de IP (considerar patente o trade secret para modelos)

### Actividades Clave
- [x] Actividades alineadas con la propuesta de valor
- [ ] Procesos documentados y reproducibles
- [ ] Quality control de modelos en producción

### Socios Clave
- [x] Socios estratégicamente valiosos identificados
- [ ] Acuerdo formal con al menos 1 cliente ancla
- [ ] Acercamiento a Asocolflores

### Estructura de Costos
- [x] Costos actuales bajo control (bootstrapped)
- [ ] Unit economics proyectados al primer año con ingresos
- [x] Oportunidades de optimización (cloud créditos para startups)

---

## Puntuación de Viabilidad

| Dimensión | Puntos | Máx | Notas |
|-----------|--------|-----|-------|
| Customer fit (claridad segmento + alineación con valor) | 16 | 20 | Segmento muy claro, validación de precio pendiente |
| Channel efficiency (alcance + costo eficiencia) | 11 | 15 | Red de contactos = ventaja enorme; canal digital pendiente |
| Relationship depth (retención + satisfacción) | 10 | 15 | Co-creación con primeros clientes es fuerte; retención formal pendiente |
| Revenue potential (diversificación + pricing power) | 15 | 20 | 2 segmentos con modelos distintos; precios sin validar |
| Cost efficiency (margen + escalabilidad) | 12 | 15 | Unit economics muy favorables para SaaS; captura en campo es el cuello |
| Resource strength (capacidades + sostenibilidad) | 11 | 15 | Dataset como ventaja competitiva; equipo de 1 es el riesgo principal |
| **TOTAL** | **75** | **100** | |

**Interpretación: 75/100 — Canvas sólido con hipótesis clave sin validar (precios, tamaño de mercado, retención). Prioridad: obtener primer contrato pago.**

---

---

## Análisis de Mercado y Competencia (datos actualizados — Marzo 2026)

### Tamaño del Mercado Objetivo

| Dato | Valor | Fuente |
|------|-------|--------|
| Hectáreas de flores en Colombia | ~8,900 ha | DANE / Asocolflores |
| Concentración en Cundinamarca (Sabana) | 66% → ~5,874 ha | Asocolflores |
| Exportaciones Colombia flores (2024) | USD $2.34 billones | Portafolio / BBVA |
| Mercado global precision farming (2026) | USD $16.07 billones → $48.36B (2035) | Precedence Research |
| CAGR mercado global precision farming | 13.05% anual hasta 2035 | Precedence Research |
| Inversión VC en agtech Q1 2025 | $1.6B en 137 deals | Sector reports |

**Mercado direccionable inicial (Sabana Norte de Bogotá):**
- Fincas +100 ha en Cundinamarca: estimado 60–120 empresas
- Si se captura 20 clientes a $16M COP/mes c/u → **$320M COP/mes** en ARR inicial
- Mercado total Sabana Norte (5,874 ha × $100K COP/ha/mes) → **~$587M COP/mes de TAM**

---

### Mapa de Competencia

| Empresa | País | Qué hace | Tecnología | Relevancia para AgriVision | Precio referencia |
|---------|------|----------|-----------|---------------------------|-------------------|
| **Agerpix** (OnFruit, Aicrop) | España | Conteo de fruta en árbol (90-95% precisión), calibre en tiempo real, IA sobre ERPs/CRMs. Premio Innovation Hub Fruit Attraction 2024. | CV en tractor, sensores GPS, IA | MEDIA — es el competidor más parecido técnicamente pero enfocado en **frutas** (manzana, uva), **no flores**. No tiene módulo logístico ni proyección. | No público (enterprise) |
| **EOSDA Crop Monitoring** | Ucrania/USA | Monitoreo de cultivos vía satélite, índices de salud (NDVI), predicción de cosecha, scouting | Satélite multispectral, IA | BAJA — resolución satelital no detecta estados fisiológicos individuales de flores. No tiene logística. | Essential: hasta 1,000 ha. Professional: custom. Enterprise: +5,000 ha |
| **Granular (Corteva)** | USA | Farm management software, planificación de cultivos, gestión de insumos | Software ERP agrícola + datos satelitales | BAJA — gestión administrativa, no visión computacional en campo | $5–$15 USD/acre/año ≈ **$12–$37 USD/ha/año** ≈ **$1–$3 USD/ha/mes** |
| **Farmonaut** | India | Monitoreo satelital de cultivos, IA, blockchain para trazabilidad | Satélite + IA | BAJA — satélite, genérico, sin especialización flores | Freemium + suscripción por ha |
| **Dynamsoft** | Canadá | SDK de lectura de códigos de barras y QR | Computer vision (barcodes) | MEDIA-BAJA — cubre solo el módulo de lectura QR, sin integración agrícola | Enterprise SDK, licencia por app |
| **Optim Power** | (por confirmar) | Proyección de producción de flores basada en data science | Data science / modelos estadísticos | ALTA — el competidor más directo en el nicho de proyección de producción de flores | No encontrado públicamente |
| **AgertecGEO** (Colombia) | Colombia | Digitalización agrícola, mapas e información de campo | GIS + datos satelitales | MEDIA — presencia local, sin CV avanzada ni logística | No público |

### Ventaja Competitiva de AgriVision vs. Competencia

```
                          Agerpix   EOSDA    Granular   AgriVision
CV en campo (no satélite)    ✓        ✗         ✗           ✓
Especialización en flores    ✗        ✗         ✗           ✓  ← ÚNICO
Estado fisiológico flores    ✗        ✗         ✗           ✓  ← ÚNICO
Detección enfermedades       ✗        parcial   ✗           ✓
Proyección producción        ✗        parcial   ✗           ✓
Módulo logística (QR/cajas)  ✗        ✗         ✗           ✓  ← ÚNICO
Dashboard gerencial          parcial  parcial   ✓           ✓
Presencia en Colombia        ✗        ✗         ✗           ✓  ← LOCAL
Valoración p/ sector fin.    ✗        ✗         ✗           ✓  ← ÚNICO
```

**Conclusión:** AgriVision es el único actor con visión computacional especializada en floricultura colombiana + módulo logístico integrado. El espacio está abierto — ningún competidor directo identificado en el nicho específico de flores colombianas con esta integración.

---

### Benchmark de Precios del Mercado

| Referencia | Precio público | Equivalente por ha/mes |
|------------|---------------|------------------------|
| Granular (USA, ERP agrícola) | $5–$15 USD/acre/año | $1–$3 USD/ha/mes |
| Farmonaut (satélite básico) | ~$1–$3 USD/ha/mes | $1–$3 USD/ha/mes |
| EOSDA Professional | Custom (sin dato público) | Est. $3–$8 USD/ha/mes |
| Agerpix OnFruit | Sin dato público (enterprise) | Est. $15–$40 USD/ha/mes |
| **AgriVision (propuesta)** | **$20–$37 USD/ha/mes** | **$20–$37 USD/ha/mes** |

**Justificación del precio premium de AgriVision:**
- Los competidores con satélite ($1–$8 USD/ha/mes) NO detectan estados fisiológicos individuales de plantas de flores
- Agerpix (CV en campo, frutas) es el benchmark más cercano: $15–$40 USD/ha/mes est.
- AgriVision añade el módulo logístico + especialización flores + proyección XGBoost → **premium justificado**
- El ROI para el cliente es directo: 1 lote de flores mal despachado puede costar más que 6 meses de suscripción

---

## Hipótesis Críticas a Validar (próximos 90 días)

| # | Hipótesis | Cómo validarla | Resultado esperado |
|---|-----------|---------------|-------------------|
| 1 | Los floricultores pagarán $80K–$150K COP/ha/mes | Propuesta formal a 3 clientes actuales | Al menos 1 contrato firmado |
| 2 | El sector financiero pagaría $2M–$5M por informe | Reunión con Finagro / banco agro | Carta de intención o piloto |
| 3 | La detección de enfermedades tiene precisión >85% | Prueba con laboratorio fitosanitario | Validación técnica independiente |
| 4 | El modelo de proyección tiene error <15% | Contraste con producción real en finca piloto | Métricas de accuracy del modelo |
| 5 | Asocolflores es un canal viable | Reunión formal con equipo directivo | Interés en piloto o endorsement |

---

## Próximos Pasos Recomendados

1. **Inmediato:** Convertir uno de los clientes actuales (levantando data) en cliente de pago — aunque sea tarifa simbólica. El primer contrato valida el modelo.
2. **30 días:** Cuantificar el tamaño del mercado en Sabana Norte (# fincas +100ha, Ha totales, facturación del sector).
3. **60 días:** Reunión con Asocolflores para explorar alianza o endorsement.
4. **90 días:** Primer acercamiento formal al sector financiero (Finagro/Bancoldex) con caso de estudio de finca valorada.
5. **Paralelo:** Iniciar proceso de aplicación a créditos de startups en AWS/GCP para reducir costos de infraestructura.
6. **Paralelo:** Documentar y proteger los modelos entrenados (trade secret o patente de método).

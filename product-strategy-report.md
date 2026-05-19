# Product Strategy Session — AgriVision
> Informe Estratégico Completo | Versión 1.0 | Marzo 2026
> Basado en: Business Model Canvas v1.1 + Strategy Canvas v1.0

---

## Strategy Context

**Empresa:** AgriVision
**Etapa:** Primeros clientes — levantando data (pre-revenue)
**Fundador:** 1 persona con +10 años en cultivos de flores + perfil técnico (CV + XGBoost)
**Modelo:** Bootstrapped
**Región:** Sabana Norte de Bogotá, Colombia → expansión nacional

### OKRs Estratégicos (2026)

| OKR | Resultado clave | Métrica |
|-----|----------------|---------|
| **O1:** Validar el modelo de negocio | K1: Primer contrato de pago antes de Q2 2026 | 1 cliente pagante |
| **O2:** Construir el producto mínimo vendible | K2: Módulo Campo funcional con precisión ≥85% | Accuracy validado |
| **O3:** Posicionarse en el sector floricultor colombiano | K3: Presencia activa en Asocolflores / Proflora | 1 partnership o endorsement |
| **O4:** Alcanzar sostenibilidad financiera | K4: MRR $50M COP antes de Q4 2026 | ~3 clientes de 100 ha |

### Contexto de Mercado

| Dato | Valor |
|------|-------|
| Colombia: exportaciones flores 2024 | USD $2.34B (récord histórico) |
| Ha cultivadas en Cundinamarca | ~5,874 ha (66% del total nacional) |
| Colombia: posición global | #2 exportador mundial (detrás de Países Bajos) |
| Mercado global precision farming (2026) | USD $16.07B → $48.36B en 2035 (CAGR 13%) |
| Startups agtech activas en Colombia (2025) | 201 (+24% vs 2024) |
| Startups colombianas con IA | 23% → +150% de crecimiento YoY |
| TRL promedio del ecosistema | 78.7% en TRL 7-9 (mercado-ready) |

---

## Fase 1: Posicionamiento y Contexto de Mercado

### 1.1 Declaración de Posicionamiento

> **Para** gerentes y dueños de floricultoras colombianas medianas-grandes (100+ ha)
> **que** hoy toman decisiones de producción, logística y sanidad basadas en reportes manuales tardíos e imprecisos,
> **AgriVision** es la plataforma de inteligencia de cultivo
> **que** convierte imágenes del campo en datos accionables en tiempo real (estados fisiológicos, enfermedades, proyección de producción, control de despacho),
> **a diferencia de** soluciones de BI (GHT Corp), satélite (EOSDA) o CV para frutas (Agerpix),
> **nuestra propuesta** es la única especializada en flores colombianas con módulo logístico integrado, que funciona con un smartphone sin infraestructura adicional.

### 1.2 Proto-Personas

#### Persona 1: "El Gerente General de Finca" — Carlos
| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Gerente General / Dueño de floricultora 150 ha |
| **Edad** | 45-60 años |
| **Dolor principal** | Toma decisiones de exportación basadas en estimados del ingeniero agrónomo, no en datos reales. En San Valentín, un error de 20% en proyección = $50M COP en pérdidas |
| **Job-to-be-done** | "Cuando necesito confirmar a mi cliente en Miami que voy a entregar 50,000 rosas la próxima semana, quiero saber exactamente cuántas tengo en cada estado, para no quedar mal ni sobrecomprometer" |
| **Canal de acceso** | Red de confianza sectorial; Asocolflores; Proflora |
| **Disposición a pagar** | Alta si el ROI es tangible en primera temporada |

#### Persona 2: "El Jefe de Producción" — Andrés
| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Jefe de producción / Ingeniero agrónomo |
| **Edad** | 30-45 años |
| **Dolor principal** | Dedica 3-4 horas/día a recorrer el cultivo contando manualmente. La detección de enfermedades llega tarde (cuando ya se propagó al lote). |
| **Job-to-be-done** | "Cuando recorro el cultivo en la mañana, quiero que la app me diga automáticamente qué plantas tienen síntomas de botritis o mildiu, para aplicar tratamiento ese mismo día antes de que se propague" |
| **Canal de acceso** | Referenciado por el gerente; ferias técnicas; agremiaciones |
| **Disposición a pagar** | Influenciador de compra, no decisor |

#### Persona 3: "El Analista del Banco" — Valentina
| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Analista de riesgo agrícola, Finagro / banco comercial |
| **Edad** | 28-40 años |
| **Dolor principal** | Para aprobar un crédito de $500M COP sobre una finca, necesita un peritaje que tarda 2-3 semanas, es subjetivo y costoso ($8-15M COP). |
| **Job-to-be-done** | "Cuando tengo que aprobar un crédito sobre una finca floricultora, quiero un informe objetivo del estado real del cultivo, para tomar la decisión en días y no semanas con un riesgo cuantificado" |
| **Canal de acceso** | Finagro, Bancoldex, BBVA Agro, Bancolombia agro |
| **Disposición a pagar** | $2M–$5M COP por informe (el valor del tiempo ahorrado es 3-5x ese precio) |

### 1.3 Jobs-to-be-Done

| Persona | Job principal | Job secundario | Job emocional |
|---------|--------------|----------------|---------------|
| Carlos (Gerente) | Saber cuánto voy a producir la próxima semana | Saber qué enfermedades atacar hoy | Sentir control y no depender de estimados |
| Andrés (Producción) | Detectar enfermedades antes de que se propaguen | Registrar estados fisiológicos sin contar manualmente | Ser reconocido como un profesional que usa tecnología |
| Valentina (Banco) | Valorar objetivamente una finca para prestar | Justificar la decisión crediticia con datos | Reducir su riesgo personal de aprobar un crédito fallido |

---

## Fase 2: Formulación del Problema

### 2.1 Declaración del Problema Central

> **Los gerentes de floricultoras colombianas no pueden tomar decisiones de producción, logística y sanidad en tiempo real** porque la información del campo llega tarde (reportes manuales), es imprecisa (estimaciones empíricas) y está fragmentada (campo / post-cosecha / logística no están integrados), lo que genera pérdidas directas en temporadas de alta demanda (San Valentín, Día de la Madre) y limita su capacidad de comprometerse con compradores internacionales con confianza.

**Evidencia del problema:**
- Un error del 20% en proyección de producción en temporada = entre $30M y $100M COP en pérdidas por finca
- La detección tardía de enfermedades como botritis en rosas puede destruir entre el 15% y el 40% de un lote
- Un floricultor de 100 ha dedica hoy entre 3 y 6 personas a conteos manuales diarios
- GHT Corp redujo flores descartadas del 8% al 1% con BI — confirma que el problema existe y tiene solución tecnológica

### 2.2 "How Might We" Question

> *¿Cómo podríamos convertir el recorrido diario de campo del técnico en datos de producción, sanidad e inventario automáticos — con solo una foto — para que el gerente tome decisiones informadas desde su teléfono?*

### 2.3 ¿Por qué ahora?

| Driver | Evidencia |
|--------|----------|
| Colombia alcanzó récord exportador en 2024 ($2.34B) — la industria está en modo crecimiento | Portafolio / BBVA 2025 |
| El ecosistema agtech colombiano creció 24% en 2025 — hay apertura a tecnología | Valora Analitik 2026 |
| Los modelos de CV para detección de enfermedades en rosas ya alcanzan 96.77% accuracy | ScienceDirect 2025 |
| La competencia (GHT Corp) prueba que los floricultores pagan por inteligencia digital | Microsoft / GHT 2025 |
| El sector financiero agro (Finagro, Bancoldex) necesita herramientas de evaluación más ágiles | Contexto del mercado |

### 2.4 Decisión del Punto 2

✅ **Problema validado parcialmente** — evidencia indirecta suficiente para avanzar. Los primeros clientes (levantando data) son prueba de demanda de información. Hipótesis de disposición a pagar pendiente de validación formal.

---

## Fase 3: Exploración de Soluciones

### 3.1 Opportunity Solution Tree (OST)

```
OBJETIVO: El gerente toma decisiones de producción con datos del campo en tiempo real

├── OPORTUNIDAD 1: Visibilidad del cultivo en tiempo real
│   ├── Solución 1A: App móvil CV → clasificación automática de estados fisiológicos
│   ├── Solución 1B: Alertas automáticas de enfermedades por lote
│   └── Solución 1C: Mapa del cultivo con inventario por estado (botón/apertura/flor)
│   └── 🎯 POC RECOMENDADO: 1A + 1B (el hook de valor más fuerte)
│
├── OPORTUNIDAD 2: Predicción de producción para planificación comercial
│   ├── Solución 2A: Modelo XGBoost con datos históricos + estado actual → proyección semanal
│   ├── Solución 2B: Integración con pedidos del cliente para alertas de déficit/superávit
│   └── Solución 2C: Escenarios de "qué pasa si" para decisiones de corte
│   └── 🎯 POC RECOMENDADO: 2A (ya hay stack técnico, depende de datos del POC 1)
│
└── OPORTUNIDAD 3: Control de logística de despacho sin papel
    ├── Solución 3A: Lectura QR/barcode con cámara → registro automático de caja
    ├── Solución 3B: Agrupación automática en pallets y asignación a camiones
    └── Solución 3C: Trazabilidad finca → aeropuerto → cliente
    └── 🎯 POC RECOMENDADO: 3A (menor dependencia técnica, fácil de demostrar)
```

### 3.2 Epic Hypotheses

#### Epic 1 — "Campo Visible" (Módulo CV)
> **Creemos que** si los técnicos de campo pueden fotografiar los cultivos con su smartphone y recibir automáticamente un inventario de estados fisiológicos + alertas de enfermedades,
> **entonces** los gerentes reducirán el tiempo de toma de decisiones de días a horas
> **y veremos** adopción diaria de la app por parte del técnico y solicitud de acceso por parte del gerente
> **esto es cierto cuando** el gerente toma al menos 1 decisión de producción o sanidad basada en datos de la app en la primera semana

#### Epic 2 — "Proyección Inteligente" (Módulo XGBoost)
> **Creemos que** si ofrecemos proyecciones de producción semanales basadas en el inventario de estados fisiológicos + históricos del cultivo,
> **entonces** el gerente podrá comprometerse con compradores internacionales con ≤10% de error
> **y veremos** que el gerente consulta la proyección antes de confirmar pedidos de exportación
> **esto es cierto cuando** la proyección tiene un error <15% validado en al menos 2 ciclos de producción

#### Epic 3 — "Logística sin papel" (Módulo QR)
> **Creemos que** si el proceso de despacho pasa de registro manual a foto-QR-pallet automático,
> **entonces** eliminaremos errores de despacho y el gerente tendrá inventario de despacho en tiempo real
> **y veremos** eliminación de hojas de cálculo en el proceso de armado de pallets
> **esto es cierto cuando** el tiempo de armado de un pallet se reduce ≥30%

#### Epic 4 — "Due Diligence Agrícola" (Sector Financiero)
> **Creemos que** si ofrecemos informes de valoración de fincas basados en CV (conteo de plantas, estado, estimación de producción),
> **entonces** los analistas de riesgo agrícola aprobarán créditos en días en lugar de semanas
> **y veremos** que bancos pagan $2M–$5M COP por informe y solicitan más de uno
> **esto es cierto cuando** al menos 1 banco o fondo realiza una evaluación pagada

---

## Fase 4: Priorización y Roadmap

### 4.1 Framework de Priorización: ICE Score

*(Impact 1-10 × Confidence 1-10 × Ease 1-10)*

| Epic / Iniciativa | Impact | Confidence | Ease | ICE | Prioridad |
|------------------|--------|-----------|------|-----|-----------|
| Epic 1A: App CV estados fisiológicos + enfermedades | 10 | 8 | 7 | **560** | 🥇 1 |
| Epic 2A: Proyección XGBoost semanal | 9 | 7 | 6 | **378** | 🥈 2 |
| Epic 3A: Lectura QR + armado de pallets | 8 | 8 | 8 | **512** | 🥉 3 |
| Epic 1C: Dashboard gerencial unificado | 8 | 9 | 5 | **360** | 4 |
| Epic 4: Informe due diligence financiero | 7 | 6 | 6 | **252** | 5 |
| Epic 2B: Integración con pedidos/ERP | 6 | 5 | 3 | **90** | 6 |

### 4.2 Roadmap NOW / NEXT / LATER

```
┌─────────────────────────────────────────────────────────────────────┐
│  NOW — Q1-Q2 2026 (Meses 1-3)                                       │
│  META: Primer cliente pagante | Validar precisión del modelo         │
│                                                                      │
│  ★ Epic 1A: App móvil CV                                            │
│    • Captura de foto en campo → estados fisiológicos clasificados   │
│    • Detección de enfermedades principales (botritis, mildiu)       │
│    • Dashboard básico: inventario por estado y por lote             │
│    • Criterio de salida: 85%+ accuracy, 1 cliente en piloto pago   │
│                                                                      │
│  Actividades clave:                                                  │
│    • Anotación de dataset (≥2,000 imágenes por clase)               │
│    • Entrenamiento modelo CV (YOLOv8 / EfficientDet)               │
│    • MVP app móvil (React Native o Flutter)                         │
│    • Onboarding de primer cliente con contrato mínimo               │
└─────────────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  NEXT — Q2-Q3 2026 (Meses 4-6)                                      │
│  META: 3 clientes pagantes | MRR $50M COP                           │
│                                                                      │
│  ★ Epic 2A: Proyección de producción XGBoost                        │
│    • Modelo de series de tiempo: histórico + estado actual          │
│    • Proyección a 1, 2, 4 semanas                                   │
│    • Alerta de brecha entre proyectado y pedidos comprometidos      │
│                                                                      │
│  ★ Epic 3A: Módulo Logística QR                                     │
│    • Lectura QR y código de barras con cámara                       │
│    • Armado de pallets automático                                    │
│    • Control de camiones y despacho                                 │
│                                                                      │
│  Actividades clave:                                                  │
│    • Conectar datos de CV (Epic 1) con modelo predictivo            │
│    • SDK de lectura QR (evaluar Dynamsoft o ZXing open source)      │
│    • Expansión a 3 clientes (vía red de contactos)                  │
└─────────────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  LATER — Q3-Q4 2026 (Meses 7-12)                                    │
│  META: 10 clientes | MRR $150M COP | 1 informe financiero vendido   │
│                                                                      │
│  ★ Epic 1C: Dashboard gerencial unificado                            │
│    • Vista 360: campo + proyección + logística en una pantalla      │
│    • Alertas configurables por rol (gerente / producción / logística)│
│                                                                      │
│  ★ Epic 4: Due Diligence Agrícola (sector financiero)               │
│    • Módulo de valoración: conteo plantas, estado, estimación ROI   │
│    • Informe PDF exportable para bancos / fondos                    │
│    • Pipeline: Finagro, Bancoldex, BBVA Agro, Bancolombia           │
│                                                                      │
│  ★ Expansión comercial                                               │
│    • Alianza con Asocolflores                                        │
│    • Presencia en Proflora 2027                                      │
│    • Primer empleado: developer o data scientist                    │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.3 TAM / SAM / SOM (Cálculo Inicial)

| Nivel | Descripción | Cálculo | Valor |
|-------|-------------|---------|-------|
| **TAM** (Mercado total) | Todas las ha de flores en Colombia con potencial | 8,900 ha × $25 USD/ha/mes × 12 meses | **$2.67M USD/año** |
| **SAM** (Mercado serviceable) | Fincas +100 ha en Cundinamarca (adoptantes tempranos) | 3,000 ha estimadas × $25 USD/ha/mes × 12 | **$900K USD/año** |
| **SOM** (Mercado obtenible — año 1-2)** | 10 clientes × 150 ha promedio × $25 USD/ha/mes | 1,500 ha × $25 × 12 | **$450K USD/año** |
| **SOM Sector financiero** | 20 informes/año × $1,250 USD/informe | — | **$25K USD/año adicional** |

**Nota:** $25 USD/ha/mes = ~$100K COP/ha/mes (tipo de cambio $4,000 COP/USD)

---

## Fase 5: Alineación Estratégica

### 5.1 Análisis de Riesgos Estratégicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| GHT Corp expande su oferta a CV de campo | Media | Alto | Moverse rápido; el dataset propio es la barrera. GHT usa Power BI/Microsoft, no CV de campo — requeriría pivote tecnológico |
| Los floricultores no quieren pagar antes de ver ROI | Alta | Alto | Piloto de 30-60 días con resultado medible. Medir: ¿cuántas horas de conteo se ahorraron? ¿Cuántas enfermedades detectadas temprano? |
| Precisión del modelo <85% en campo real | Media | Alto | Comenzar con el modelo como "asistente" (el técnico valida), no como "juez". Iterar con feedback |
| Agerpix entra a Colombia / flores | Baja | Medio | Su foco es Europa/frutas. Barrera = dataset local de flores. AgriVision debe construir ese moat rápido |
| Equipo de 1 persona = cuello de botella | Alta | Alto | Primer contratado con los primeros ingresos. Evaluar co-founders o pasantías de Unal/UniAndes |

### 5.2 Ventaja Competitiva Sostenible

```
Hoy (Marzo 2026):
  Ventaja = Dominio + Contactos + First mover en nicho específico

En 6 meses:
  Ventaja = Dataset propio de flores colombianas (Sabana Norte)
             + Modelos calibrados con condiciones locales (altitud, temperatura)
             + Primeros contratos = prueba social

En 12 meses:
  Ventaja = Red de datos de 5-10 fincas = benchmarks sectoriales
             + Cada nuevo cliente mejora el modelo (network effect en datos)
             + GHT Corp es BI, no CV — difícil de replicar rápido
```

### 5.3 Press Release (Amazon Working Backwards)

> **AgriVision lanza la primera plataforma de inteligencia visual para la floricultura colombiana**
>
> *Bogotá, Colombia — Q4 2026.* AgriVision anuncia que floricultores de la Sabana Norte de Bogotá ya usan su plataforma para convertir fotos del cultivo en datos de producción, sanidad e inventario en tiempo real.
>
> "Antes tardaba tres días en saber cuántas flores tenía listas para cortar y qué enfermedades debía atacar. Ahora lo sé en la mañana del mismo día", dice el gerente de una floricultora de 120 ha.
>
> La plataforma detecta enfermedades como botritis y mildiu con 87% de precisión, proyecta la producción de las próximas 4 semanas con un margen de error de 12%, y elimina el conteo manual con una app que cualquier trabajador puede usar sin capacitación técnica.
>
> AgriVision está disponible por suscripción mensual desde $80K COP/ha/mes. Los primeros 3 clientes reportan una reducción del 35% en tiempo de reportes y la detección de 2 focos de enfermedad antes de que se propagaran.

---

## Fase 6: Plan de Ejecución

### 6.1 Sprint 1 — MVP "Campo Visible" (Semanas 1-4)

| Tarea | Tipo | Duración estimada |
|-------|------|-------------------|
| Anotar 500 imágenes (botón / apertura / flor / enfermedad) | Data | 1 semana |
| Entrenar modelo baseline (YOLOv8 o EfficientDet-lite) | ML | 3-5 días |
| App móvil: captura de foto + envío a API | Dev | 1 semana |
| API de inferencia: imagen → clasificación | Dev | 3 días |
| Dashboard básico: conteo por estado por lote | Dev | 3 días |
| Validar con técnico de campo: sesión de feedback | Discovery | 2 horas |

**Definición de "listo":** El técnico de campo toma una foto, en < 30 segundos recibe la clasificación del estado y si hay síntomas de enfermedad. El gerente ve el resumen en dashboard.

### 6.2 Sprint 2 — Conversión a Cliente Pagante (Semanas 5-8)

| Tarea | Tipo | Duración estimada |
|-------|------|-------------------|
| Demo en campo con el cliente más cercano (tiene data ya) | Sales | 2 horas |
| Propuesta formal: módulo CV por 3 meses | Sales | 1 día |
| Negociación y firma de contrato | Legal/Sales | 1 semana |
| Onboarding: capacitación técnico de campo | CS | 4 horas |
| Semana 1 de operación en producción | Ops | 1 semana |
| Revisión de resultados: semana 4 | CS | 1 hora |

### 6.3 User Stories Prioritarias (Epic 1A)

```
US-001: Como técnico de campo,
        quiero fotografiar una cama de rosas con mi celular
        para obtener automáticamente cuántas flores hay en cada estado
        Criterio: La app clasifica en < 30 segundos con ≥ 80% accuracy

US-002: Como técnico de campo,
        quiero recibir una alerta si la foto muestra síntomas de botritis o mildiu
        para aplicar tratamiento ese mismo día
        Criterio: Si hay síntoma en ≥ 10% de las plantas fotografiadas, la app emite alerta push

US-003: Como gerente de finca,
        quiero ver en un dashboard cuántas flores tengo en cada estado por lote hoy
        para decidir qué compromisos de exportación puedo confirmar esta semana
        Criterio: Dashboard actualizable en tiempo real con drill-down por lote/nave

US-004: Como gerente de finca,
        quiero recibir una proyección de producción para las próximas 2 semanas
        para confirmar pedidos a mis clientes en Miami con confianza
        Criterio: Proyección con intervalo de confianza visible, error <20% en primera versión
```

---

## Métricas de Éxito

### North Star Metric
> **Número de decisiones de campo tomadas usando datos de AgriVision por semana**

*(Si el gerente y el jefe de producción usan los datos para tomar al menos 3 decisiones/semana, el producto tiene adopción real)*

### Métricas por Fase

| Fase | Métrica | Target |
|------|---------|--------|
| NOW (Q1-Q2) | Accuracy del modelo CV | ≥ 85% |
| NOW (Q1-Q2) | Clientes en piloto pago | ≥ 1 |
| NOW (Q1-Q2) | MRR | > $0 (primer peso) |
| NEXT (Q2-Q3) | Clientes activos | ≥ 3 |
| NEXT (Q2-Q3) | MRR | $50M COP/mes |
| NEXT (Q2-Q3) | Error proyección XGBoost | < 15% |
| LATER (Q4) | Clientes activos | ≥ 10 |
| LATER (Q4) | MRR | $150M COP/mes |
| LATER (Q4) | Churn mensual | < 5% |
| LATER (Q4) | LTV:CAC | > 10:1 |

---

## Próximos Pasos Inmediatos (Esta semana)

1. **[ ] Definir con el cliente más avanzado (levantando data hoy) si puede ser el primer piloto de pago** — aunque sea $1M COP/mes para validar el mecanismo de cobro
2. **[ ] Revisar el tamaño y calidad del dataset actual** — ¿cuántas imágenes anotadas hay? ¿Son suficientes para un primer modelo?
3. **[ ] Decidir el stack del MVP de la app** — React Native vs. Flutter vs. web progresiva (PWA) — considerando que el técnico de campo usará Android básico
4. **[ ] Agendar reunión con Asocolflores** — explorar endorsement o co-desarrollo de caso de estudio
5. **[ ] Aplicar a AWS Activate** (créditos de hasta $100K USD para startups) y **Google for Startups** — reducir costo de infraestructura a $0 por 12 meses

---

## Apéndice: Competidores Detallados

| Empresa | HQ | Foco | Tecnología | Presencia CO | Flores | Web |
|---------|----|----|-----------|------------|--------|-----|
| GHT Corp | Colombia | BI floricultor, trazabilidad, ERP | Power BI, Power Apps, RPA, Microsoft Azure | ✅ (40+ clientes) | ✅ (flores) | LinkedIn: GHT Corp |
| Agerpix | España | CV conteo frutas en árbol, calibre | CV en tractor, GPS, Aicrop (IA sobre ERP) | ❌ | ❌ (frutas) | agerpix.com |
| EOSDA Crop Monitoring | Ucrania/USA | Satélite: NDVI, stress hídrico, yield | Satélite multispectral, IA | ❌ | ❌ (genérico) | eos.com |
| Granular (Corteva) | USA | ERP agrícola, planificación | Software + datos satelitales | ❌ | ❌ | granular.ag |
| Optim Power | (Colombia?) | Proyección producción flores (DS) | Data science / estadística | ✅ (?) | ✅ | Por confirmar |
| Precisagro | Colombia | Agricultura digital, consultoría | GIS + asesoría | ✅ | ❌ | precisagro.com.co |
| Farmonaut | India | Satélite + IA + blockchain | Satélite, API | ❌ | ❌ (genérico) | farmonaut.com |

---

*Informe generado como parte del Product Strategy Session de AgriVision. Versión 1.0 — Marzo 2026.*
*Referencia: product-strategy-session SKILL v1.0 | business-model-canvas v1.1 | strategy-canvas v1.0*

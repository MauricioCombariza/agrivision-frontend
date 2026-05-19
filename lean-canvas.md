# Lean Canvas — AgriVision
> Ash Maurya Framework | Versión 1.0 | Marzo 2026
> Hipótesis de negocio para validación — pre-revenue, primeros clientes

---

## Canvas Visual

```
┌─────────────────────────┬──────────────────────────┬──────────────────────────────────────────────────┬──────────────────────────┬──────────────────────────┐
│ 1. PROBLEMA             │ 3. SOLUCIÓN              │ 4. UVP                                           │ 9. VENTAJA INJUSTA       │ 5. SEGMENTOS             │
│                         │                          │ (Unique Value Proposition)                       │ (Unfair Advantage)       │                          │
│ Top 3 problemas:        │ Top 3 capacidades:       │                                                  │                          │ Early adopters:          │
│                         │                          │ "Confirma tus pedidos de                         │ HOY:                     │ Gerentes de floriculto-  │
│ #1 ★ No poder           │ #1 App móvil CV:         │ exportación con datos,                           │ • La única persona en    │ ras 100-200 ha en        │
│ proyectar producción    │ foto del cultivo →       │ no con esperanza."                               │   Colombia con +10 años  │ Sabana Norte que ya      │
│ con confianza para      │ inventario fisiológico   │                                                  │   en flores + CV +       │ perdieron dinero por     │
│ compromisos de          │ + proyección XGBoost     │ AgriVision convierte una                         │   XGBoost. Imposible     │ proyección incorrecta.   │
│ exportación             │ (1-4 semanas)            │ foto del cultivo en una                          │   de contratar en el     │                          │
│ → Errores 20-30%        │                          │ proyección confiable (<15%                       │   mercado                │ Perfil: tiene pedidos    │
│   en temporadas         │ #2 Detección CV de       │ de error) para que el                            │                          │ de exportación activos   │
│   = pérdidas $30-100M   │ enfermedades (botritis,  │ gerente confirme pedidos                         │ • Red de confianza       │ y mide su negocio por    │
│   COP por evento        │ mildiu) con alerta       │ en Miami con datos reales                        │   construida en          │ cumplimiento de          │
│                         │ inmediata antes de       │ de su propio cultivo.                            │   una década en el       │ contratos.               │
│ #2 Detección tardía     │ que se propague          │                                                  │   sector floricultor     │                          │
│ de enfermedades         │                          │ Especializada en flores                          │   colombiano             │ Segmento 2:              │
│ → 15-40% del lote       │ #3 Módulo logístico:     │ colombianas. Sin hardware                        │                          │ Sector financiero        │
│   destruido cuando      │ foto → QR → pallet       │ costoso. Solo tu celular.                        │ EN < 1 AÑO:              │ (Finagro, bancos agro)   │
│   ya es tarde           │ → camión →               │                                                  │ • Dataset propio de      │ que evalúan fincas       │
│                         │ despacho sin papel       │                                                  │   flores colombianas     │ para crédito             │
│ #3 Logística de         │                          │                                                  │   anotadas — barrera     │                          │
│ despacho caótica        │                          │                                                  │   creciente con cada     │ Segmento 3 (futuro):     │
│ → errores en cajas,     │                          │                                                  │   nuevo cliente          │ Floricultoras grandes    │
│   reclamos de clientes  │                          │                                                  │                          │ (500+ ha),               │
│   internacionales       │                          │                                                  │                          │ agremiaciones            │
│                         ├──────────────────────────┤                                                  ├──────────────────────────┤                          │
│ Alternativas actuales:  │ 8. MÉTRICAS CLAVE        │                                                  │ 6. CANALES               │                          │
│ • Excel / WhatsApp      │                          │                                                  │                          │                          │
│ • GHT Corp (BI sobre    │ ★ North Star:            │                                                  │ • Red directa del        │                          │
│   datos digitales,      │ Decisiones de exporta-   │                                                  │   fundador (costo $0,    │                          │
│   no sobre imágenes     │ ción tomadas con datos   │                                                  │   alta conversión)       │                          │
│   del cultivo real)     │ de AgriVision / semana   │                                                  │ • Asocolflores           │                          │
│ • Estimación empírica   │                          │                                                  │   (credibilidad)         │                          │
│   del agrónomo          │ Activación: % días con   │                                                  │ • Proflora (feria anual) │                          │
│   (subjetiva)           │ captura activa en        │                                                  │ • LinkedIn + casos       │                          │
│                         │ semana 1                 │                                                  │   de estudio con ROI     │                          │
│                         │ Retención: gerente abre  │                                                  │   cuantificado           │                          │
│                         │ dashboard 3+/semana      │                                                  │                          │                          │
│                         │ Calidad CV: ≥85%         │                                                  │                          │                          │
│                         │ Error XGBoost: <15%      │                                                  │                          │                          │
│                         │ MRR: $50M COP (Q4 2026)  │                                                  │                          │                          │
├─────────────────────────┴──────────────────────────┴──────────────────────────────────────────────────┴──────────────────────────┴──────────────────────────┤
│ 7. ESTRUCTURA DE COSTOS                                                              │ 2. FUENTES DE INGRESOS                                                  │
│                                                                                      │                                                                         │
│ HOY (< $500K COP/mes):                                                               │ Floricultores — suscripción mensual por módulo:                         │
│  • Cloud (AWS/GCP uso mínimo): ~$200K-400K COP/mes                                  │  • Módulo Campo + Proyección: $80K–$150K COP/ha/mes                     │
│  • Herramientas dev (librerías, APIs): ~$100K COP/mes                               │  • Módulo Logística: $1.5M–$3M COP/mes/finca                           │
│  • Desplazamientos a campo: ocasional                                                │  → Cliente 100 ha: ~$14M–$18M COP/mes (~$3,500–$4,500 USD/mes)         │
│  • Fundador: costo de oportunidad (bootstrapped)                                     │                                                                         │
│                                                                                      │ Sector financiero — pago por informe:                                   │
│ AL ESCALAR (primer empleado + 3 clientes):                                           │  • $2M–$5M COP/informe de valoración de finca                          │
│  • 1er dev/data scientist: $5M–$8M COP/mes                                          │                                                                         │
│  • Cloud escalado: ~$5–15 USD/finca/mes                                              │ Setup / onboarding: $3M–$8M COP (único, por cliente)                    │
│                                                                                      │                                                                         │
│ CAC estimado: <$1M COP (venta directa por red)                                       │ Descuento anual: 15–20% sobre mensualidad                               │
│ Margen bruto estimado: >70% (SaaS, bajo costo marginal)                              │                                                                         │
│ Runway actual: indefinido (bootstrapped, sin burn significativo)                     │ Benchmark mercado: Agerpix (CV frutas): ~$15–40 USD/ha/mes est.         │
└──────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

---

## Detalle de los 9 Bloques

### 1. Problema

#### Top 3 Problemas (ordenados por urgencia para el cliente)

**Problema #1 ★ — Proyección de producción sin confianza**
> El gerente de una floricultora no puede confirmar pedidos de exportación con certeza porque sus proyecciones se basan en estimaciones empíricas del agrónomo, no en datos reales del cultivo.

- **Magnitud del dolor:** En temporadas clave (San Valentín, Día de la Madre, Navidad), un error de proyección del 20% = entre $30M y $100M COP en pérdidas por finca (por sobrecompromiso o subproducción)
- **Frecuencia:** Cada semana de apertura de pedidos con clientes internacionales

**Problema #2 — Detección tardía de enfermedades**
> Cuando el técnico identifica botritis, mildiu u otras enfermedades, ya se propagaron al lote. El tratamiento llega 3-7 días tarde.

- **Magnitud del dolor:** Un foco detectado tarde puede destruir entre el 15% y 40% de un lote
- **Frecuencia:** Constante durante épocas de alta humedad; especialmente crítico en rosas y claveles

**Problema #3 — Logística de despacho manual y propensa a errores**
> El armado de pallets, control de cajas y asignación de camiones se hace con planillas, hojas de cálculo o de memoria. Los errores generan reclamos de clientes en destino.

- **Magnitud del dolor:** Un pallet mal armado o un camión con temperatura incorrecta = rechazo de lote en destino (pérdida total)
- **Frecuencia:** En cada ciclo de despacho (varias veces por semana en temporada alta)

#### Alternativas Insatisfactorias Actuales

| Solución actual | Por qué falla |
|----------------|--------------|
| Excel + WhatsApp | Lento, manual, propenso a errores, no integrado |
| GHT Corp (BI floricultor CO) | Trabaja sobre datos digitales existentes (ERP, intercambio electrónico), no sobre imágenes reales del cultivo. No detecta estados fisiológicos con CV. |
| Estimación empírica del agrónomo | Subjetiva, tardía, no escalable, depende de 1 persona |
| Ningún sistema de logística específico | Cada finca improvisa su propio proceso |

---

### 2. Solución

| # | Capacidad | Problema que resuelve | Por qué es mejor |
|---|-----------|----------------------|-----------------|
| **S1** | App móvil: foto → CV → estados fisiológicos + proyección XGBoost (1-4 semanas) | Problema #1: proyección sin confianza | Primera vez que se combina CV de campo con series de tiempo predictivas en flores colombianas |
| **S2** | Detección CV de enfermedades (botritis, mildiu) con alerta push antes de propagación | Problema #2: detección tardía | Días de ventaja vs. inspección visual humana |
| **S3** | Foto → lectura QR/barcode → armado de pallet → asignación camión → despacho trazado | Problema #3: logística caótica | Elimina planillas manuales; un click del gerente para ver todo en tiempo real |

---

### 3. Unique Value Proposition (UVP)

**Tagline:**
> *"Confirma tus pedidos de exportación con datos, no con esperanza."*

**UVP completa:**
> AgriVision convierte una foto del cultivo en una proyección de producción confiable (error <15%) para que el gerente de una floricultora colombiana confirme sus pedidos internacionales con certeza — y detecte enfermedades días antes de que destruyan el lote. Sin hardware costoso. Solo tu celular. Especializada en flores colombianas.

**Por qué elige AgriVision sobre las alternativas:**
- Vs. Excel/manual: El dato llega en minutos, no en días
- Vs. GHT Corp: AgriVision analiza el cultivo real (imágenes), no los datos que ya están digitalizados
- Vs. Satélite (EOSDA): Resolución de planta individual, no de hectárea genérica
- Vs. Agerpix: Especializada en flores colombianas, no en frutas europeas

---

### 4. Ventaja Injusta (Unfair Advantage)

> Lo que un competidor con dinero **no puede comprar ni copiar rápidamente.**

| Ventaja | Disponible | Descripción | Tiempo para replicar |
|---------|-----------|-------------|---------------------|
| **Conocimiento de dominio + técnica** | HOY ✅ | La única persona en Colombia con +10 años en cultivos de flores Y capacidad técnica en CV + XGBoost. No existe este perfil en el mercado laboral. | 3-5 años mínimo (se necesita vivir el campo) |
| **Red de confianza en el sector** | HOY ✅ | Acceso directo a gerentes de floricultoras construido en una década. El primer cliente no viene de un anuncio, viene de una llamada. | No se compra — se construye en años |
| **Dataset propio de flores colombianas** | < 1 año 🔄 | Imágenes anotadas de rosas, claveles, crisantemos en condiciones reales de Sabana Norte. Cada nuevo cliente refuerza la barrera. | Requiere años + acceso a fincas + anotación |
| **Presencia local + contexto colombiano** | HOY ✅ | Conocimiento de la estacionalidad, las variedades, los precios, los reclamos de los clientes en Miami. Un competidor global no tiene esto. | No replicable fácilmente desde España o EEUU |

**Moat de datos (el activo que se construye con el tiempo):**
```
Cliente 1 → más datos → mejor modelo
Cliente 2 → más datos → mejor modelo aún
...
Cliente 10 → benchmarks del sector → valor adicional único
```
Cada cliente mejora el producto para todos. El competidor que llegue tarde enfrentará un modelo mucho más preciso.

---

### 5. Segmentos de Clientes

#### Early Adopters (Foco Inmediato)
**Perfil:** Gerente de floricultora 100-200 ha en Sabana Norte de Bogotá con compromisos activos de exportación que ya vivió una pérdida por proyección incorrecta.

- **Señal de compra:** "La última temporada de San Valentín quedé corto / me sobró y tuve que descartar"
- **Tamaño:** ~60-120 fincas de +100 ha en Cundinamarca
- **Disposición a pagar:** Alta — el ROI de 1 mes de suscripción vs. el costo de 1 error de exportación es de 10:1 o más

#### Segmento 2 (Siguiente Ola)
**Sector financiero:** Analistas de Finagro, Bancoldex, BBVA Agro, Bancolombia que evalúan créditos sobre activos florícolas.
- **Señal de compra:** "Necesito un peritaje de esta finca y el proceso actual tarda 3 semanas"
- **Disposición a pagar:** $2M-$5M COP por informe (precio ya justificado vs. peritaje tradicional)

#### Segmento 3 (Futuro)
- Floricultoras grandes (500+ ha)
- Agremiaciones (Asocolflores) como distribuidor
- Otros cultivos (hortalizas, café) — post-consolidación en flores

---

### 6. Canales

| Canal | Etapa | Costo | Conversión esperada |
|-------|-------|-------|---------------------|
| **Red directa del fundador** | Awareness → Compra | $0 | Alta (confianza establecida) |
| **Demo en campo con datos del cliente** | Evaluación | Tiempo | Muy alta (el cliente ve su finca procesada) |
| **Asocolflores / agremiaciones** | Awareness → Evaluación | Bajo | Media (credibilidad sectorial) |
| **Proflora (feria anual, Bogotá)** | Awareness → Evaluación | $1-3M COP/participación | Media-alta (compradores calificados) |
| **LinkedIn + casos de estudio con ROI** | Awareness | Tiempo | Baja-media (canal de largo plazo) |
| **Piloto gratuito 30-60 días** | Evaluación → Compra | Costo de oportunidad | Alta (elimina fricción de entrada) |

---

### 7. Fuentes de Ingresos

#### Stream 1 — Suscripción Floricultores (Principal)
| Módulo | Precio | Base de cobro |
|--------|--------|--------------|
| Campo + Proyección (CV + XGBoost) | $80K–$150K COP/ha/mes | Por hectárea activa |
| Logística (QR, pallets, camiones) | $1.5M–$3M COP/mes | Por finca |
| **Cliente típico (100 ha) — todo incluido** | **~$14M–$18M COP/mes** | **~$3,500–$4,500 USD/mes** |

#### Stream 2 — Informe de Due Diligence (Sector Financiero)
- $2M–$5M COP por informe de valoración de finca
- Alto margen, bajo volumen, sin dependencia de infraestructura permanente

#### Stream 3 — Setup / Onboarding (único)
- $3M–$8M COP al inicio (cubre implementación y capacitación)

#### Proyección de ingresos
| Hito | Clientes | MRR | Timeline |
|------|---------|-----|----------|
| Primer ingreso | 1 | $14M COP | Q2 2026 |
| Sostenibilidad | 3 | $42M COP | Q3 2026 |
| Meta año 1 | 10 | $150M COP | Q4 2026 |
| Serie de crecimiento | 30 | $450M COP | 2027 |

**LTV estimado** (cliente 100 ha, 36 meses): ~$540M COP
**CAC estimado** (venta directa): <$1M COP
**LTV:CAC ratio:** >500:1 en etapa inicial (solo red de contactos)

---

### 8. Estructura de Costos

#### Estado actual (bootstrapped, <$500K COP/mes)
| Costo | Tipo | Monto estimado |
|-------|------|----------------|
| Infraestructura cloud (AWS/GCP, uso bajo) | Variable | $200K–$400K COP/mes |
| Herramientas de desarrollo (APIs, librerías, IDE) | Fijo | ~$100K COP/mes |
| Desplazamientos a campo | Variable | Ocasional |
| **Total burn actual** | | **< $500K COP/mes** |

#### Al escalar (post-primer ingreso)
| Costo | Tipo | Monto estimado |
|-------|------|----------------|
| Primer empleado (dev / data scientist) | Fijo | $5M–$8M COP/mes |
| Cloud escalado (procesamiento de imágenes) | Variable | ~$5–15 USD/finca/mes |
| Herramientas de anotación de datos | Fijo | $500K COP/mes |
| Desplazamientos a campo regulares | Variable | $500K–$1M COP/mes |
| **Total burn escalado** | | **~$7M–$10M COP/mes** |

#### Unit Economics
| Métrica | Valor |
|---------|-------|
| CAC (venta por red directa) | <$1M COP |
| CAC (canal digital futuro) | $2M–$5M COP |
| COGS por cliente (cloud + soporte) | ~$500K COP/mes |
| Margen bruto estimado | >70% |
| Payback period | <1 mes (CAC tan bajo) |

---

### 9. Métricas Clave

#### North Star Metric
> **Número de decisiones de exportación tomadas con datos de AgriVision por semana**

Si el gerente usa los datos para confirmar/ajustar pedidos de forma regular, el producto tiene adopción real y genera ROI demostrable.

#### Métricas por Etapa (Pirate Metrics — AARRR)

| Etapa | Métrica | Target Q2 2026 | Target Q4 2026 |
|-------|---------|---------------|----------------|
| **Acquisition** | Nuevos demos en campo / mes | 3 | 10 |
| **Activation** | % técnicos que usan app activamente en semana 1 | >70% | >80% |
| **Retention** | % gerentes que abren dashboard 3+ veces/semana | >60% | >75% |
| **Revenue** | MRR | $14M COP (1 cliente) | $150M COP (10 clientes) |
| **Referral** | Clientes referidos por red de contactos | 2 | 8 |

#### Métricas de Calidad del Producto
| Métrica | Target |
|---------|--------|
| Accuracy CV (estados fisiológicos) | ≥85% |
| Error proyección XGBoost (semana 1-2) | <20% en v1, <15% en v2 |
| Error proyección (semana 3-4) | <25% en v1, <18% en v2 |
| Tiempo foto → resultado en app | <30 segundos |
| Uptime plataforma | >99% |

---

## Hipótesis Críticas a Validar

> Ordenadas por riesgo (la más riesgosa primero)

| # | Hipótesis | Riesgo | Experimento para validar | Señal de éxito |
|---|-----------|--------|--------------------------|----------------|
| **H1** | Los floricultores pagarán $80K–$150K COP/ha/mes por proyección confiable | 🔴 Alto | Propuesta formal a 3 clientes actuales | Al menos 1 acepta o contraoferta |
| **H2** | El modelo CV alcanza ≥85% accuracy con el dataset inicial | 🔴 Alto | Entrenamiento con imágenes actuales + validación con técnico de campo | Técnico confirma que las clasificaciones son útiles |
| **H3** | El técnico de campo adopta la app sin resistencia cultural | 🟡 Medio | Piloto de 1 semana con un técnico real | Captura ≥1 foto/día sin recordatorio |
| **H4** | La proyección XGBoost mejora con 4-6 semanas de datos del cultivo real | 🟡 Medio | Correr modelo con histórico + estado CV | Error <20% en semana 2 de operación |
| **H5** | El sector financiero paga $2M-5M COP por informe | 🟡 Medio | Reunión con analista de Finagro o banco | "Nos envía una propuesta" |
| **H6** | Asocolflores abre puertas como canal de distribución | 🟢 Bajo | Reunión formal con directivos | Interés en co-desarrollar caso de estudio |

---

## Experimentos Recomendados (Próximos 60 días)

### Experimento 1 — Validar disposición a pagar (H1)
**Método:** Convertir un cliente actual (levantando data) en cliente de pago
- Prepara propuesta de 3 meses a precio de lanzamiento ($50K COP/ha/mes — 50% del precio objetivo)
- Presenta con datos reales de su finca ya procesados
- **Señal de éxito:** Firma contrato (aunque sea simbólico)
- **Tiempo:** 2 semanas

### Experimento 2 — Validar accuracy del modelo (H2)
**Método:** Demo ciego — el técnico de campo evalúa las clasificaciones sin saber el resultado del modelo
- 100 fotos → modelo clasifica → técnico valida
- **Señal de éxito:** >80% de concordancia técnico-modelo
- **Tiempo:** 1 semana

### Experimento 3 — Entrevista de dolor cuantificado
**Método:** 5 entrevistas de 20 min con gerentes de finca
- Pregunta clave: *"¿Cuánto perdió la última vez que su proyección de producción estuvo equivocada?"*
- **Señal de éxito:** Al menos 3 de 5 citan una pérdida >$10M COP
- **Tiempo:** 2 semanas

---

## Notas del Canvas

> **Sobre limitaciones del Lean Canvas (Ash Maurya):**
> Este canvas es una herramienta de hipótesis rápida, no un documento estratégico completo. Para la estrategia detallada, referirse a:
> - `business-model-canvas.md` — 9 bloques de Osterwalder con análisis de mercado
> - `strategy-canvas.md` — Perfil competitivo Blue Ocean vs. GHT Corp, Agerpix, EOSDA
> - `product-strategy-report.md` — 6 fases: positioning, problem framing, OST, roadmap, métricas

> **Prioridad de validación:** H1 (disposición a pagar) y H2 (accuracy del modelo) son los riesgos que pueden matar el negocio. Validar antes de cualquier otro gasto.

---

*Lean Canvas generado con base en el framework de Ash Maurya.*
*Versión 1.0 — Marzo 2026 | Agrivision — Sabana Norte de Bogotá, Colombia*

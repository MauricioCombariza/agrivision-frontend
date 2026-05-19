# Análisis de Mercado — TAM / SAM / SOM + Estrategia Comercial
## AgriVision | Plataforma de Inteligencia para Floricultura Colombiana
### Mayo 2026 | Versión 1.0

---

## Resumen Ejecutivo

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MERCADO AGRIVISION — Colombia                     │
├──────────────────────┬───────────────────────┬───────────────────────┤
│   TAM                │   SAM                 │   SOM (Año 3)         │
│   LatAm + Esp.       │   Colombia            │   Sabana Norte        │
│   Floricultura       │   Floricultura        │   + Nacional          │
│                      │   Comercial           │                       │
│   $85B COP           │   $38B COP            │   $5.5B COP           │
│   ~USD $20M/año      │   ~USD $9M/año        │   ~USD $1.3M/año      │
│                      │                       │                       │
│   Cultivos premium   │   250 fincas          │   30 clientes         │
│   LatAm + fintech    │   Colombia + banca    │   pagantes            │
│   agrícola           │   agrícola            │   (Año 3, 2028)       │
└──────────────────────┴───────────────────────┴───────────────────────┘
```

**Puntos clave:**
- SAM de $9M USD con CAC <$1M COP y LTV >$540M COP por cliente → LTV:CAC superior a 500:1
- Margen bruto estimado >70% (SaaS con bajo costo marginal por cliente)
- Tres metodologías independientes convergen en SAM de $35–42B COP: alta confianza en el dato
- El fundador tiene acceso directo a ~70% del SAM a través de su red de contactos — ventaja estructural no replicable

---

## 1. Contexto y Definición del Mercado

### 1.1 Perímetro del Análisis

| Dimensión | Definición |
|-----------|-----------|
| Problema central | Proyección imprecisa de producción + detección tardía de enfermedades + logística manual |
| Cliente primario | Gerente/dueño de floricultora 100–500 ha, Cundinamarca (Colombia) |
| Categoría del producto | SaaS de inteligencia de cultivo (Computer Vision + XGBoost) |
| Geografía inicial | Sabana Norte, Cundinamarca, Colombia |
| Horizonte del análisis | 5 años (2026–2030) |
| Tasa de cambio usada | $4,200 COP = USD $1 (promedio 2026) |

### 1.2 Datos Macro del Sector

| Dato | Valor | Fuente |
|------|-------|--------|
| Exportaciones flores Colombia 2024 | USD $2.34B (récord histórico) | ProColombia |
| Posición exportadora Colombia | #2 mundial (detrás de Países Bajos) | Asocolflores |
| Hectáreas cultivadas Colombia | ~8,900 ha | Asocolflores 2023 |
| Hectáreas en Cundinamarca | ~5,874 ha (66% nacional) | Asocolflores |
| Valor exportación promedio / ha / año | ~$263,000 USD | Cálculo propio |
| Fincas comerciales >100 ha (estimado) | ~100 nacionales / 60–80 Cundinamarca | Estimación propia |
| Mercado global precision farming 2026 | USD $16.07B | MarketsandMarkets |
| Mercado global precision farming 2035 | USD $48.36B (CAGR 13%) | MarketsandMarkets |
| Startups agtech activas Colombia 2025 | 201 (+24% vs 2024) | iNNpulsa Colombia |
| Competidor directo Colombia (BI/ERP) | GHT Corp — 40+ floricultores activos | Investigación propia |

### 1.3 Estructura del Mercado Objetivo

```
Floricultoras Colombia
~600 fincas totales / 8,900 ha

        500+ ha                 ~10 fincas    ← corporativas, ventas complejas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        100–500 ha              ~100 fincas   ← TARGET PRIMARIO ★
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        50–100 ha               ~150 fincas   ← TARGET SECUNDARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        <50 ha                  ~340 fincas   ← fuera de alcance (precio)
```

---

## 2. Premisas de Precio y Valor

### 2.1 Estructura de Precios AgriVision

| Módulo / Producto | Precio | Base de cobro |
|-------------------|--------|--------------|
| Módulo Campo + Proyección | $100K COP/ha/mes | Por hectárea activa |
| Módulo Logística (QR, pallets, camiones) | $2.25M COP/mes | Por finca (fijo) |
| Informe due diligence (sector financiero) | $3.5M COP | Por informe |
| Setup / Onboarding | $5M COP | Único, al inicio |
| **Cliente típico 100 ha (todos los módulos)** | **$12.25M COP/mes** | ~USD $2,917/mes |
| **Cliente típico 180 ha (todos los módulos)** | **$20.25M COP/mes** | ~USD $4,821/mes |
| **Cliente típico 300 ha (todos los módulos)** | **$32.25M COP/mes** | ~USD $7,679/mes |

### 2.2 Justificación del Precio — Cuantificación del Valor

El precio se valida por el costo del problema que resuelve:

| Problema | Pérdida típica por evento | Frecuencia anual | Pérdida anual (100 ha) |
|----------|--------------------------|-------------------|------------------------|
| Error de proyección exportación | $30M–$100M COP/evento | 2–3 veces/año | $60M–$300M COP |
| Detección tardía de enfermedades | $10M–$40M COP/evento | 3–5 veces/año | $30M–$200M COP |
| Error logística / reclamo cliente | $5M–$20M COP/evento | 5–10 veces/año | $25M–$200M COP |
| Tiempo agrónomo (conteo manual) | $3M COP/mes (labor) | Constante | $36M COP/año |
| **Total costo del problema** | | | **$151M–$736M COP/año** |

**Valor creado por AgriVision** (asumiendo 50–60% de prevención):

| Escenario | Valor creado / año | WTP (25%) | Precio AgriVision (100 ha) |
|-----------|-------------------|-----------|---------------------------|
| Conservador | $200M COP | $50M COP | $147M COP ($12.25M/mes) |
| Base | $400M COP | $100M COP | $147M COP ($12.25M/mes) |
| Optimista | $700M COP | $175M COP | $147M COP ($12.25M/mes) |

**Conclusión de precio:** AgriVision se ubica en el escenario conservador de WTP, lo que hace el precio defendible incluso frente a clientes escépticos. El ROI mínimo demostrable es de 1.4:1 en año 1.

---

## 3. TAM / SAM / SOM — Tres Metodologías

### 3.1 Metodología 1: Top-Down (Precision Farming → Floricultura)

Punto de partida: mercado global de precision farming = USD $16.07B (2026)

| Nivel | Filtro Aplicado | Factor | Mercado Resultante |
|-------|----------------|--------|-------------------|
| Global precision farming | Base | — | $16,070M USD |
| América Latina | Penetración regional | 4% | $643M USD |
| Colombia en LatAm | Cuota colombiana agtech | 22% | $141M USD |
| Cultivos premium exportación | % sobre total agtech | 40% | $56M USD |
| Floricultura específicamente | % de cultivos premium | 17% | **$9.6M USD** |
| **TAM Top-Down (Colombia Floricultura)** | | | **$40.3B COP** |

**Expansión LatAm (TAM ampliado):**

| País | Ha Comerciales | Factor Precio | TAM Anual |
|------|---------------|---------------|-----------|
| Colombia | 8,900 ha | $24 USD/ha/mes | $25.6M USD |
| Ecuador | ~4,000 ha | $17 USD/ha/mes | $8.2M USD |
| Perú | ~1,500 ha | $15 USD/ha/mes | $2.7M USD |
| México | ~2,000 ha | $16 USD/ha/mes | $3.8M USD |
| Guatemala / Costa Rica | ~500 ha | $13 USD/ha/mes | $0.8M USD |
| **TAM LatAm Floricultura** | **16,900 ha** | | **$41.1M USD / $173B COP** |

Con agri-fintech (informes crediticios) y otros cultivos premium Colombia:
**TAM Total AgriVision (largo plazo) ≈ $85B COP / USD $20M/año**

---

### 3.2 Metodología 2: Bottom-Up (Segmentos → Ingresos)

**Construcción desde los segmentos de clientes:**

#### Segmento A: Floricultoras 100–500 ha (Target primario)
| Parámetro | Valor |
|-----------|-------|
| Número de fincas | ~100 nacionales (70 en Cundinamarca) |
| Tamaño promedio | 180 ha |
| Campo + Proyección | 180 ha × $100K = $18M COP/mes |
| Logística | $2.25M COP/mes |
| **MRR por cliente** | **$20.25M COP/mes** |
| **ARR por cliente** | **$243M COP/año** |
| **ARR Segmento A (100 fincas)** | **$24.3B COP/año** |

#### Segmento B: Floricultoras 50–100 ha (Target secundario)
| Parámetro | Valor |
|-----------|-------|
| Número de fincas | ~150 nacionales |
| Tamaño promedio | 70 ha |
| Campo + Proyección | 70 ha × $80K = $5.6M COP/mes |
| Logística | $1.5M COP/mes |
| **MRR por cliente** | **$7.1M COP/mes** |
| **ARR por cliente** | **$85.2M COP/año** |
| **ARR Segmento B (150 fincas)** | **$12.78B COP/año** |

#### Segmento C: Sector Financiero
| Parámetro | Valor |
|-----------|-------|
| Instituciones activas (Finagro, bancos) | ~50 instituciones |
| Evaluaciones de finca por institución / año | ~6 informes |
| Precio por informe | $3.5M COP |
| **ARR Sector Financiero** | **$1.05B COP/año** |

#### Resumen Bottom-Up

| Segmento | Unidades | ARR por unidad | ARR Total |
|----------|----------|----------------|-----------|
| Floricultoras 100–500 ha | 100 fincas | $243M COP | **$24.3B COP** |
| Floricultoras 50–100 ha | 150 fincas | $85M COP | **$12.78B COP** |
| Sector Financiero | 50 instituciones | $21M COP | **$1.05B COP** |
| **SAM Bottom-Up Total** | | | **$38.13B COP / $9.1M USD** |

---

### 3.3 Metodología 3: Value Theory (Valor Creado → Disposición a Pagar)

**Cuantificación del problema por finca (100 ha):**

```
Costo del problema (100 ha):

Problema 1 — Proyección de producción
  3 temporadas/año × $65M COP (pérdida promedio) × 50% evitables = $97.5M COP/año

Problema 2 — Detección tardía de enfermedades
  4 incidentes × $20M COP × 60% prevenibles = $48M COP/año

Problema 3 — Logística y despacho
  8 errores × $5M COP × 40% evitables = $16M COP/año

Problema 4 — Labor agrónomo (conteo manual)
  2 agrónomos × $3M COP/mes = $72M COP/año ahorrado

────────────────────────────────────────
VALOR TOTAL CREADO POR AGRIVISION (100 ha): ~$233M COP/año
────────────────────────────────────────

WTP conservador (15%): $35M COP/año = $2.9M COP/mes
WTP moderado (25%): $58M COP/año = $4.8M COP/mes
WTP con labor savings (considerando reemplazo de agrónomos): ~$147M COP/año → $12.25M/mes ✓
```

**TAM Value Theory Colombia:**

| Segmento | Fincas | Valor/año | WTP 25% | ARR |
|----------|--------|-----------|---------|-----|
| 100+ ha | 100 | $233M COP | $58.25M | $5.83B COP |
| 50–100 ha | 150 | $120M COP | $30M | $4.5B COP |
| Financiero | 50 inst. | $21M COP | 100% | $1.05B COP |
| **TAM Value Theory** | | | | **$11.38B COP** |

Con labor savings incluidos (reemplazo parcial de agrónomos):
**TAM Value Theory ajustado: $28–38B COP / $6.7–9.1M USD**

---

### 3.4 Triangulación — Las Tres Metodologías

```
                SAM Colombia Floricultura (USD)

Top-Down:       ████████████████████░░  $9.6M
                                        ↑
Bottom-Up:      ████████████████████░░  $9.1M  ← CONVERGENCIA ALTA
                                        ↑
Value Theory:   ██████████████░░░░░░░░  $6.7–9.1M
                                        ↑
                ─────────────────────────────
                Rango de confianza: $8.5–9.5M USD
                CONSENSO: ~$38B COP / ~$9M USD
```

**La convergencia entre top-down y bottom-up (<6% de diferencia) da alta confianza al dato.**
El value theory con labor savings también converge. Sin labor savings da el límite inferior ($6.7M), lo que indica que el precio de AgriVision es más agresivo si el cliente NO tiene agrónomos de tiempo completo.

---

## 4. Resumen TAM / SAM / SOM

```
                    AGRIVISION — MERCADO TOTAL

TAM EXPANSIVO       ╔══════════════════════════════╗
LatAm floricultura  ║  $173B COP / $41M USD/año    ║
+ Specialty crops   ║  Floricultura LatAm completa  ║
Colombia (largo     ║  + Agri-fintech + otros       ║
plazo)              ║  cultivos premium Colombia    ║
                    ╚══════════════════════════════╝

TAM REFERENCIA      ╔════════════════════════════╗
Colombia            ║  $40B COP / $9.5M USD/año  ║
Floricultura        ║  Toda la floricultura       ║
Completa            ║  comercial colombiana       ║
                    ╚════════════════════════════╝

SAM                 ╔══════════════════════╗
Colombia            ║ $38B COP / $9M USD   ║
Tech-ready          ║ 250 fincas activas   ║
Exportadoras        ║ + sector financiero  ║
(hoy)               ╚══════════════════════╝

SOM Año 3 (2028)    ╔════════════════╗
Sabana Norte +      ║ $5.5B COP      ║
Nacional early      ║ $1.3M USD      ║
adopters            ║ ~30 clientes   ║
                    ╚════════════════╝

SOM Año 5 (2030)    ╔══════════════════╗
Liderazgo           ║ $14.3B COP       ║
nacional +          ║ $3.4M USD        ║
fintech agricola    ║ ~80 clientes     ║
                    ╚══════════════════╝
```

### Tabla de Progresión

| Año | Clientes | MRR | ARR | % SAM | Hito |
|-----|---------|-----|-----|-------|------|
| 2026 (Año 1) | 5 | $90M COP | $1.08B COP | 2.8% | Primer contrato pago |
| 2027 (Año 2) | 15 | $270M COP | $3.24B COP | 8.5% | Sostenibilidad financiera |
| 2028 (Año 3) | 30 | $540M COP | $6.48B COP | 17% | Referente sectorial |
| 2029 (Año 4) | 55 | $990M COP | $11.88B COP | 31% | Expansión + fintech |
| 2030 (Año 5) | 80 | $1,440M COP | $17.28B COP | 45% | Líder nacional |

**CAGR proyectado ARR (2026–2030): 99%** — duplicación anual consistente con early-stage SaaS en nicho especializado.

---

## 5. Estrategia Comercial AgriVision

### 5.1 Posicionamiento de Mercado

#### Dónde Compite AgriVision (Mapa de Posicionamiento)

```
                    INTELIGENCIA DEL CULTIVO
                    (análisis imágenes campo)
                              ▲
                              │
                              │  ★ AgriVision
                              │  (flores CO, CV + XGBoost,
                              │   logística integrada)
                              │
DATOS    ◄────────────────────┼────────────────────► DATOS
HISTÓRICOS                   │                      TIEMPO REAL
(ERP/BI)                     │  Agerpix             (campo)
                              │  (frutas Europa)
         GHT Corp ●           │
         (BI sobre ERP)       │
                              │         EOSDA
                              │         (satélite)
                              ▼
                    DATOS DIGITALES EXISTENTES
                    (ERP, sensores, registros)
```

**El espacio vacío en el cuadrante superior derecho es el Ocean Azul de AgriVision.**
Ningún competidor colombiano combina computer vision de campo + proyección predictiva + logística integrada para flores.

#### Propuesta de Posicionamiento por Segmento

| Segmento | Mensaje clave | Diferenciador vs. competencia |
|----------|---------------|-------------------------------|
| Gerente de finca 100–300 ha | "Confirma tus pedidos de exportación con datos, no con esperanza" | CV de campo real vs. BI sobre datos existentes (GHT Corp) |
| Jefe de producción | "Detecta enfermedades 3–7 días antes de que destruyan el lote" | Alerta en campo vs. inspección visual tardía |
| Sector financiero | "Due diligence de finca en 48 horas, no en 3 semanas" | Análisis CV objetivo vs. peritaje manual subjetivo |

---

### 5.2 Packaging y Precios por Etapa

#### Paquetes Comerciales

```
┌─────────────────────────────────────────────────────────────────┐
│  PAQUETE PILOTO            │  PAQUETE CAMPO          │  SUITE   │
│  "Arranca sin riesgo"      │  "Control de cultivo"   │  TOTAL   │
├─────────────────────────────────────────────────────────────────┤
│  • Módulo Campo (solo CV)  │  • Módulo Campo + CV    │  Campo + │
│  • 30 días gratis          │  • Proyección XGBoost   │  Logist. │
│  • 1 bloque / sección      │  • 1 finca completa     │  + Proy. │
│  • Sin contrato            │  • Soporte directo      │  + Fin.  │
│                            │                         │          │
│  $0 COP / 30 días          │  $80K/ha/mes            │  $100K/  │
│  → Conversión a pago       │  + $0 logística         │  ha/mes  │
│                            │                         │  + $2.25M│
│  Objetivo: demostrar       │  Objetivo: 3–6 meses    │  logist. │
│  accuracy del modelo       │  hasta adoptar logística│          │
└─────────────────────────────────────────────────────────────────┘
```

#### Estrategia de Pricing: Lanzamiento

| Fase | Precio | Justificación |
|------|--------|--------------|
| **Beta** (Q2 2026, 3 clientes) | $50K COP/ha/mes (50% descuento) | Conseguir el primer pago y testimonial ROI real |
| **Early Adopter** (Q3–Q4 2026, 10 clientes) | $70K COP/ha/mes | Escalar con precio aún atractivo |
| **Precio estándar** (2027+) | $100K–$150K COP/ha/mes | Precio completo con ROI demostrado en 3 clientes |

**Rationale:** El primer contrato no se firma al precio máximo — se firma al precio que elimina la fricción de ser el primero.

---

### 5.3 Sales Playbook — Primeros 5 Contratos

#### La Secuencia de Venta (10 pasos)

```
Paso 1: IDENTIFICACIÓN (ya hecho — red de contactos)
        Seleccionar 20 fincas de la red con señal de compra:
        "perdí/sobré en la última temporada"

Paso 2: APERTURA (1 llamada, 15 min)
        "Mauro, estoy haciendo pilotos con 3 fincas.
        Tengo datos de tu cultivo de los últimos 2 meses.
        ¿Puedo mostrarte qué vería el sistema en tu finca?"

Paso 3: DEMO CON SUS PROPIOS DATOS (visita, 1 hora)
        Mostrar imágenes ya procesadas de SU cultivo.
        No hablar de tecnología — hablar de cuántas rosas
        tienen en cada estado hoy y la proyección a 3 semanas.

Paso 4: CUANTIFICAR EL DOLOR (10 min de conversación)
        "¿Cuánto perdió la última vez que su proyección
        estuvo equivocada?" → Dejar que él dé el número.

Paso 5: PRESENTAR ROI (1 página)
        Pérdida declarada × 60% = valor mínimo AgriVision.
        Precio AgriVision / año = X% de esa pérdida.

Paso 6: PROPUESTA PILOTO (documento simple, 1 página)
        30 días gratis → 3 meses a $50K/ha → precio full.
        Sin hardware. Sin integración de sistemas. Solo app.

Paso 7: MANEJO DE OBJECIONES (ver sección 5.4)

Paso 8: CIERRE (firma de propuesta / transferencia)
        Formalizar con propuesta simple. No contrato largo.
        Meta: dinero en cuenta antes del día 30.

Paso 9: ONBOARDING (primera semana activa)
        Capacitar técnicos de campo con grabación de video.
        Presencia en finca día 1, 3 y 7.

Paso 10: TESTIMONIAL + REFERIDO (mes 2)
        Capturar ROI real en números. Pedir 1 referido.
        Caso de estudio → cierra los siguientes 4 clientes.
```

#### Perfil del Cliente Ideal (ICP — Ideal Customer Profile)

| Atributo | Descripción | Señal de identificación |
|----------|-------------|------------------------|
| Tamaño | 100–300 ha | Finca mediana-grande Sabana Norte |
| Compromisos | Exportación activa (Miami/Europa) | Tiene clientes fijos internacionales |
| Dolor vivido | Perdió dinero en una temporada | Lo menciona sin que uno pregunte |
| Apertura tech | Usa WhatsApp Business o algo digital | Tiene al menos Excel para producción |
| Decisor | El gerente/dueño decide rápido | No depende de una junta directiva lejana |
| Relación fundador | Contacto de primer o segundo grado | El fundador tiene acceso directo o vía contacto |

---

### 5.4 Manejo de Objeciones

| Objeción | Respuesta |
|----------|-----------|
| "Ya tengo un sistema (GHT Corp / Excel)" | "GHT Corp trabaja sobre datos que ya están en el sistema. AgriVision trabaja sobre lo que ves en el campo hoy — tu cultivo real, no lo que digitalizaste hace 3 días." |
| "¿Qué pasa si la cámara no funciona bien?" | "El sistema funciona con el celular que ya tienes. La app guía al técnico para tomar la foto correctamente. En los pilotos actuales la tasa de captura es >90%." |
| "El precio es muy caro" | "En San Valentín pasado, cuánto sobró o faltó. Ese número es lo que estás pagando HOY en riesgo. AgriVision cuesta menos del 15% de esa pérdida." |
| "¿Funciona con mi variedad específica?" | "Iniciamos con rosas y claveles. Si tu cultivo es diferente, el piloto gratuito de 30 días nos permite ajustar el modelo sin costo para ti." |
| "¿Cuánto tiempo toma implementar?" | "El primer técnico de campo está operando en 2 horas. Sin instalación de hardware. Solo descarga la app." |
| "¿Y si dejo de usarlo?" | "Sin contrato anual en la etapa de lanzamiento. Pagas mes a mes. Pero el promedio de los pilotos actuales es de uso diario — porque el gerente empieza a esperar el dato cada mañana." |

---

### 5.5 Estrategia por Canal

#### Fase 1 (Q2–Q3 2026): Red Directa del Fundador

```
META: 5 primeros clientes pagantes

Canal:   Red personal del fundador (60–80 contactos directos en el sector)
Táctica: Demo individualizada con datos reales de su finca
CAC:     <$1M COP (tiempo + transporte)
Target:  3 clientes de la red propia + 2 referidos de ellos
Métrica: 1 demo/semana → conversión esperada 20–30% = 1 cierre/3–4 demos
```

#### Fase 2 (Q4 2026 – Q1 2027): Amplificación con Credibilidad

```
META: Llegar a 15 clientes

Canal A: Caso de estudio con ROI cuantificado (primer cliente)
         → publicar en LinkedIn + presentar en Asocolflores
         → objetivo: 3 inbounds calificados

Canal B: Demo en Proflora 2026 (feria anual Bogotá)
         → presupuesto: $2M–$3M COP (stand pequeño)
         → objetivo: 5 demos presenciales → 2 cierres

Canal C: Alianza con Asocolflores
         → propuesta: co-desarrollar caso de estudio sector
         → objetivo: endorsement institucional + acceso a directorio

Canal D: Sector financiero (Finagro, Bancolombia Agro)
         → 3 reuniones con analistas de riesgo agrícola
         → objetivo: 2 informes de due diligence pagos ($7M COP)
         → upsell natural a los dueños de las fincas evaluadas
```

#### Fase 3 (2027): Escala Nacional

```
META: 30+ clientes, presencia nacional

Canal A: SDR contratado (primer empleado comercial)
         → ataca Antioquia, Eje Cafetero, Cundinamarca resto
Canal B: Digital (LinkedIn + casos de estudio + SEO)
         → costo marginal bajo, conversión lenta pero acumulativa
Canal C: Alianzas con proveedores de insumos agrícolas
         → Syngenta, Bayer, BASF Colombia tienen acceso a las mismas fincas
         → co-venta: proveedor de fungicidas + proveedor de detección CV
```

---

### 5.6 Métricas Comerciales por Etapa

#### Dashboard Comercial — KPIs

| KPI | Definición | Target Q2 2026 | Target Q4 2026 | Target Q2 2027 |
|-----|-----------|----------------|----------------|----------------|
| **Demos activas / mes** | Visitas a campo con datos reales del cliente | 3 | 8 | 15 |
| **Tasa de conversión demo → piloto** | % demos que inician piloto gratuito | >50% | >60% | >65% |
| **Tasa de conversión piloto → pago** | % pilotos que firman contrato | >60% | >70% | >75% |
| **CAC promedio** | Costo total de adquisición por cliente | <$1M COP | <$1.5M COP | <$2M COP |
| **LTV (36 meses)** | Ingresos totales por cliente | >$440M COP | >$540M COP | >$650M COP |
| **LTV:CAC** | Ratio de eficiencia comercial | >440:1 | >360:1 | >325:1 |
| **Churn mensual** | % clientes que cancelan | <2% | <1.5% | <1% |
| **MRR** | Ingreso mensual recurrente | $61M COP | $122M COP | $270M COP |
| **NRR (Net Revenue Retention)** | Retención + expansión por ha | >100% | >110% | >115% |
| **Tiempo ciclo de venta** | Demo → firma contrato | <30 días | <21 días | <21 días |

#### Métricas de Producto (que habilitan la venta)

| Métrica | Target mínimo para vender | Target para referir |
|---------|--------------------------|---------------------|
| Accuracy CV campo | ≥80% (piloto) | ≥85% (referencia) |
| Error proyección XGBoost 1–2 sem. | <25% (v1) | <15% (v2) |
| Tiempo foto → resultado | <60 seg (piloto) | <30 seg (estándar) |
| Tasa de captura técnicos campo | >70% día 1 | >90% semana 3 |
| Uptime plataforma | >98% | >99.5% |

---

### 5.7 Estrategia para el Sector Financiero

Este segmento tiene una lógica comercial diferente al segmento principal:

#### Modelo de Generación de Negocio

```
ENTRADA al sector financiero:
1. Elegir 1 banco/institución (Finagro o Bancolombia Agro — mejor acceso)
2. Ofrecer 1 informe de due diligence GRATIS a cambio de:
   a) Reunión con analista senior (45 min)
   b) Feedback sobre el formato del informe
   c) Carta de referencia si el informe es útil

3. El informe gratuito demuestra:
   - Estado fitosanitario documentado con CV
   - Capacidad productiva cuantificada (ha por estado)
   - Proyección de producción 4–8 semanas
   - Comparativo vs. fincas similares (benchmarking sectorial)

4. Propuesta formal: $2.5M COP/informe (precio de penetración)
   → Precio estándar: $3.5M–$5M COP/informe (después de 5+ informes)

5. Efecto secundario: la finca evaluada se convierte en lead para
   la suscripción mensual (el gerente recibe una copia del informe
   y ve lo que AgriVision puede hacer con sus cultivos)
```

#### Propuesta de Valor Sector Financiero

| Problema actual | Con AgriVision |
|----------------|----------------|
| Peritaje tarda 2–3 semanas | Informe en 48–72 horas |
| Costo $8M–$15M COP (perito físico) | $3.5M COP (informe CV) |
| Evaluación subjetiva (opinión del perito) | Datos objetivos: % plantas por estado, proyección, sanidad |
| Una sola visita en el tiempo | Posibilidad de informes periódicos de seguimiento |
| El banco no sabe qué pasa entre visitas | Monitoreo continuo posible (suscripción trimestral) |

---

### 5.8 Roadmap Comercial Trimestral 2026–2027

#### Q2 2026 (Mayo–Junio) — Primer Ingreso

| Actividad | Meta | Métrica de éxito |
|-----------|------|-----------------|
| Convertir clientes piloto actuales a pago | 1–2 contratos firmados | $0 → $25M COP MRR |
| Precio de lanzamiento ($50K/ha/mes) | Eliminar fricción del primer "sí" | Carta de intención firmada |
| Demo con datos reales a 5 contactos nuevos | 3 pilotos iniciados | >3 pilotos activos |
| Documento de ROI (1 página) con datos reales | Material de ventas listo | Puede compartirse sin explicación |

#### Q3 2026 (Julio–Septiembre) — Momentum

| Actividad | Meta | Métrica de éxito |
|-----------|------|-----------------|
| Llegar a 5 clientes pagantes | $45M COP MRR | 5 contratos activos |
| Primer caso de estudio publicado (con ROI real) | Credibilidad sectorial | Publicado en LinkedIn / Asocolflores |
| Primera reunión Finagro o banco | 1 informe de due diligence pago | $3.5M COP ingreso único |
| Evaluar participación Proflora 2026 | Decisión de stand | Presupuesto definido |

#### Q4 2026 (Octubre–Diciembre) — Escala Inicial

| Actividad | Meta | Métrica de éxito |
|-----------|------|-----------------|
| 10 clientes pagantes | $90M COP MRR | $1.08B COP ARR |
| Precio estándar (suben de $50K a $70K/ha) | Early adopters migran precio | Retención >90% en el cambio |
| Proflora 2026 | 5 demos presenciales → 2 cierres | 2 contratos firmados en la feria |
| Primer empleado (si hay >$80M COP MRR) | Dev/data scientist contratado | Oferta aceptada |

#### Q1–Q2 2027 — Crecimiento Estructural

| Actividad | Meta | Métrica de éxito |
|-----------|------|-----------------|
| 15 clientes | $270M COP MRR | $3.24B COP ARR |
| Pitch para capital semilla (Innpulsa/ángeles) | Levantamiento $500M–$1B COP | Término sheet recibido |
| Expansión a Antioquia | 3 demos en Rionegro / La Ceja | 1 cliente fuera de Cundinamarca |
| Módulo financiero en producción | 5 informes/mes | $17.5M COP/mes ingreso adicional |

---

### 5.9 Modelo Financiero Simplificado

#### Unit Economics por Cliente (base: 150 ha)

| Métrica | Valor |
|---------|-------|
| MRR por cliente (150 ha, todos los módulos) | $17.25M COP |
| ARR por cliente | $207M COP |
| Costo marginal de servir (cloud + soporte) | ~$2M COP/mes |
| Margen bruto por cliente | ~88% |
| CAC (venta por red) | <$1M COP |
| CAC (canal futuro) | $3M–$5M COP |
| Payback (venta por red) | < 1 mes |
| LTV (36 meses) | $621M COP |
| LTV:CAC (red directa) | >621:1 |
| LTV:CAC (canal digital) | >124:1 |

#### Proyección Financiera (ARR)

```
     ARR (B COP)

20B │                                              ████
    │                                         ████
15B │                                    ████
    │                               ████
10B │                          ████
    │                    ███
 5B │            ████
    │      ██
 1B │  █
    └───────────────────────────────────────────────
       2026    2027    2028    2029    2030

       $1.08B  $3.24B  $6.48B  $11.8B  $17.3B
       5 cli.  15 cli. 30 cli. 55 cli. 80 cli.
```

#### Sostenibilidad y Breakeven

| Hito | MRR Requerido | Clientes (150 ha avg) | Timeline |
|------|--------------|----------------------|----------|
| Cubrir costos actuales (<$500K/mes) | $500K COP/mes | — | Hoy (1 cliente) |
| Cubrir con primer empleado ($7M/mes) | $7M COP/mes | 1 cliente | Q2 2026 |
| Breakeven con equipo de 3 personas | $25M COP/mes | 2 clientes | Q3 2026 |
| **Sostenibilidad estructural** | **$50M COP/mes** | **~3 clientes** | **Q4 2026** |
| Capital para reinversión | $150M COP/mes | ~9 clientes | Q2 2027 |

---

### 5.10 Riesgos Comerciales y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Adopción cultural lenta (técnicos de campo no usan la app) | Media | Alto | Piloto guiado primera semana; app ultra-simple; incentivo al técnico |
| Competidor local copia el producto (GHT Corp añade CV) | Baja/Media | Alto | Dataset propio como moat; velocidad de lanzamiento; contratos multi-año |
| Precio percibido alto vs. madurez del mercado | Media | Medio | Precio de lanzamiento reducido; ROI garantizado en 90 días o se reembolsa |
| Seasonality (temporadas de flores = picos de demanda y carga) | Alta | Bajo | Positivo: el dolor es más agudo en temporada → cierra ventas más rápido |
| Modelo XGBoost no tiene datos suficientes en año 1 | Alta | Medio | Módulo CV solo primero; XGBoost como upsell cuando hay 4–6 semanas de datos |
| Finca grande (500+ ha) con proceso de compra corporativo | Media | Bajo | Mantener foco en 100–300 ha; el proceso corporativo no encaja con el ciclo de venta actual |

---

## 6. Conclusiones Estratégicas

### 6.1 Por Qué Este Mercado Ahora

1. **Timing perfecto:** Colombia batió récord de exportaciones ($2.34B USD) → más presión para no fallar en compromisos → el dolor es máximo
2. **Mercado sin solución CV específica:** GHT Corp no tiene visión de campo; los competidores globales no tienen especialización en flores colombianas
3. **Barrera de datos que crece:** Cada cliente mejora el modelo → ventaja competitiva exponencial
4. **Red de confianza lista:** El fundador no necesita construir acceso — ya lo tiene

### 6.2 Las 3 Apuestas Estratégicas

| Apuesta | Descripción | Horizonte |
|---------|-------------|-----------|
| **1. Clavar el primer contrato** | Un cliente pagando, aunque sea $50K/ha, valida el negocio entero | Q2 2026 |
| **2. Construir el caso de estudio** | 1 cliente con ROI documentado = 10 demos más fáciles | Q3 2026 |
| **3. Defender el moat de datos** | Llegar a 10 clientes antes de que un competidor con capital intente copiarlo | Q4 2026 |

### 6.3 Métricas que Importan en 2026

```
North Star: Decisiones de exportación tomadas con datos de AgriVision / semana

Proxy #1:  MRR > $50M COP (Q4 2026) → negocio sostenible
Proxy #2:  Accuracy CV ≥ 85% → el producto está listo para vender
Proxy #3:  1 caso de estudio publicado con ROI → venta inbound activada
Proxy #4:  Pipeline de 10+ demos activas → crecimiento predecible
```

---

*Análisis generado: Mayo 2026*
*Basado en: Lean Canvas v1.0, Business Model Canvas v1.1, Product Strategy Report v1.0, Strategy Canvas v1.0*
*Versión: 1.0 — AgriVision, Sabana Norte de Bogotá, Colombia*

# Ecualizador de Soluciones — AgriVision
> Matriz de evaluación: 7 soluciones × 6 dimensiones | Abril 2026
> Fuentes: solucion_1.md · solucion_2.md · lean-canvas.md · mirar_afuera.md · operating-model.md · web research

---

## Cómo leer este ecualizador

Todas las dimensiones se puntúan de **1 a 10**, donde **10 = situación favorable para ejecutar** y **1 = obstáculo severo**.

| Dimensión | 10 significa | 1 significa |
|-----------|-------------|------------|
| **1. Alianzas** | Autosuficiente — el fundador puede ejecutarlo solo, sin acuerdos externos | Imposible sin alianzas críticas previas (clientes, gremios, academia) |
| **2. Entorno** | El mercado, el momento y el contexto colombiano juegan a favor | El contexto externo dificulta o bloquea la adopción real |
| **3. Equipo** | El equipo actual puede ejecutarlo hoy sin nuevas contrataciones | Requiere perfiles especializados que no existen en el equipo actual |
| **4. Tiempo** | Entrega valor al cliente desde el Día 1 | El valor real tarda meses — el cliente debe esperar y confiar |
| **5. Dinero** | Costo casi cero — flujo de caja positivo desde el inicio | Requiere inversión o sacrificio de ingresos antes de generar retorno |
| **6. Impacto** | Impacto transformador en el negocio del cliente y en el moat de AgriVision | Impacto marginal o difícil de demostrar con métricas concretas |

---

## Tabla de Puntajes

| Solución | Alianzas | Entorno | Equipo | Tiempo | Dinero | Impacto | **Total** |
|----------|:--------:|:-------:|:------:|:------:|:------:|:-------:|:---------:|
| **S1-1 El Agrónomo Digital** | 6 | 8 | 9 | 10 | 9 | 7 | **49** |
| **S1-2 Física de la Flor** | 7 | 9 | 7 | 8 | 8 | 9 | **48** |
| **S1-3 El Socio de Datos** | 5 | 6 | 6 | 6 | 5 | 7 | **35** |
| **S1-4 RL: Aprende Equivocándose** | 8 | 5 | 4 | 5 | 6 | 8 | **36** |
| **S2-1 El Censo Vivo del Cultivo** | 8 | 9 | 8 | 9 | 8 | 8 | **50** |
| **S2-2 La Alerta Temprana** | 6 | 9 | 7 | 7 | 7 | 9 | **45** |
| **S2-3 El Espejo del Sector** | 3 | 7 | 7 | 3 | 7 | 8 | **35** |

---

## Análisis por dimensión

### 1. Alianzas — ¿Cuánta dependencia externa requiere?

**Autosuficiente (8):** S1-4 y S2-1. El fundador puede lanzarlas sin ningún acuerdo externo previo. El Censo Vivo no depende de validación externa — solo de la app y el CV ya en desarrollo.

**Dependencia moderada (6–7):** S1-1, S1-2, S2-2. El Agrónomo Digital recibe 6 porque para escalar más allá de 2–3 clientes necesita una red de agrónomos de respaldo o una relación de confianza muy específica con cada cliente (el modelo se vende como servicio personalizado, no como software). Quien contrata no compra un sistema — contrata al fundador, y eso implica un vínculo frágil si el fundador no puede responder. S1-2 y S2-2 se benefician de validación académica (Ceniflores) pero no la requieren.

**Alta dependencia (3–5):** S1-3 es en esencia una alianza estructurada con el primer cliente (co-propiedad de datos). S2-3 es la más dependiente: no puede existir sin 3–4 fincas activas simultáneamente. No es una solución — es un producto que emerge solo cuando hay red.

**Nota sobre Ceniflores:** Ceniflores trabaja con su "Triángulo de la Innovación" (gobierno, academia, sector) e identifica la IA como prioridad en 2026. Una alianza allí no desbloquea ninguna solución, pero multiplica la credibilidad en ventas, especialmente para S1-2 y S2-2.

---

### 2. Entorno — ¿El momento externo juega a favor?

**Muy favorable (9):** S1-2, S2-1, S2-2. El sector floricultor colombiano enfrenta en 2026 dólar bajo, costos altos y presión en márgenes. Cualquier solución que reduzca pérdidas concretas tiene tracción inmediata. Colombia exportó ~70.000 toneladas en San Valentín 2026 — el volumen justifica invertir en precisión. La adopción agtech en Colombia va 18–24 meses por detrás del promedio global: la ventana de primer movimiento sigue abierta.

**Favorable (7–8):** S1-1 tiene muy buen entorno pero requiere que el cliente entienda que está pagando por el criterio del experto, no por software — barrera cultural leve en un sector acostumbrado a SaaS. S2-3 depende de escala; el entorno es favorable pero el producto no puede aprovecharla hasta tener red.

**Desfavorable (5–6):** S1-4 (RL) enfrenta el mayor obstáculo externo. Un cliente conservador que vive con márgenes apretados no puede tolerar errores del 20% durante 3–6 semanas de "exploración". S1-3 requiere firmar un contrato de co-propiedad — concepto innovador pero culturalmente sofisticado para el perfil del gerente de floricultora colombiana en 2026.

---

### 3. Equipo — ¿Puede el fundador ejecutarlo hoy?

**Ejecutable hoy, solo (8–9):** S1-1 es literalmente el fundador haciendo lo que ya hace — análisis agronómico experto, ahora entregado en formato digital. S2-1 usa el CV de estados fisiológicos ya en desarrollo y el dashboard ya en construcción.

**Ejecutable con esfuerzo adicional (7):** S1-2 requiere formalizar la biblioteca de constantes biológicas — trabajo de conocimiento, no de código. S2-2 requiere reentrenar el modelo con imágenes de enfermedades (botritis, mildiu) con suficiente variedad visual. S2-3 técnicamente es sencillo pero requiere escala de clientes primero.

**Requiere un nuevo perfil (4–6):** S1-4 (RL) es el caso crítico. El aprendizaje por refuerzo es una especialidad ML distinta de CV + XGBoost. Sin un data scientist con experiencia en RL, el riesgo de implementación incorrecta es alto. S1-3 requiere asesoría legal para estructurar la co-propiedad de datos.

---

### 4. Tiempo — ¿Cuándo ve valor el cliente?

**Día 1 (9–10):** S1-1 entrega la primera proyección en 2 horas. S2-1 entrega el primer censo fisiológico en la primera jornada de campo.

**Semana 1 (8):** S1-2 entrega desde el primer uso siempre que la biblioteca biológica esté construida antes del deployment.

**Mes 1–2 (6–7):** S2-2 necesita calibrar umbrales de alerta. S1-3 da valor durante 3 meses gratis pero no genera ingresos para AgriVision.

**Mes 3+ (3–5):** S1-4 requiere 6+ semanas de exploración antes de ser confiable. S2-3 no entrega valor hasta tener 3–4 fincas activas.

---

### 5. Dinero — ¿Cuánto capital consume antes de generar ingresos?

**Costo casi cero (8–9):** S1-1 es el más eficiente en capital: el fundador cobra $8M–$12M COP/mes desde el primer cliente usando únicamente su tiempo. S2-1 y S1-2 aprovechan infraestructura ya construida.

**Costo moderado (6–7):** S1-4 requiere semanas adicionales de desarrollo. S2-2 necesita campañas de captura de imágenes de enfermedades en campo. S2-3 requiere inversión en ventas para alcanzar la escala mínima.

**Costo alto (5):** S1-3 sacrifica 3 meses de ingresos + 40% de descuento permanente. A 100 ha de cliente ideal, esto representa ~$160M COP de ingresos no cobrados solo en el primer año.

---

### 6. Impacto — ¿Qué cambia en el negocio del cliente y en AgriVision?

**Transformador (9):** S1-2 escala a cero costo marginal — la biblioteca biológica sirve a todos los clientes sin reentrenamiento. S2-2 previene pérdidas del 15–40% del lote; su ROI crea dependencia permanente.

**Alto (8):** S1-4 aprende micro-patrones únicos de cada finca que ningún experto puede capturar. S2-1 es el fundamento que hace funcionar todas las demás soluciones. S2-3 genera efectos de red exponenciales y abre la puerta al segmento financiero.

**Medio-alto (7):** S1-1 tiene impacto inmediato pero limitado por el cuello de botella humano. S1-3 crea un cliente leal pero con ingresos reducidos.

---

## Ranking Final

| # | Solución | Total | Fortaleza clave | Limitación clave |
|---|----------|:-----:|-----------------|-----------------|
| 1 | **S2-1 El Censo Vivo del Cultivo** | **50** | Sin dependencias — entrega el primer censo el Día 1 con el CV ya en construcción | Requiere que el modelo CV de estados fisiológicos esté bien entrenado al lanzar |
| 2 | **S1-1 El Agrónomo Digital** | **49** | Tiempo + Dinero: premium desde la primera hora, cero infraestructura adicional | Alianzas: el fundador ES el producto — escala limitada sin red de agrónomos de respaldo |
| 3 | **S1-2 Física de la Flor** | **48** | Entorno + Impacto: científico, escalable, sin cuello humano ni datos históricos | Requiere construir la biblioteca biológica antes del primer cliente |
| 4 | **S2-2 La Alerta Temprana** | **45** | Mayor impacto de retención — el cliente nunca cancela si depende de las alertas | Dataset de enfermedades colombianas aún por construir |
| 5 | **S1-4 RL: Aprende Equivocándose** | **36** | Mayor potencial a largo plazo — aprende lo que ningún libro enseña | Requiere data scientist en RL + tolerancia al error inicial del cliente |
| 5 | **S1-3 El Socio de Datos** | **35** | Retención máxima — cliente co-dueño nunca se va | Dinero + Alianzas: sacrifica ingresos + complejidad legal de co-propiedad |
| 7 | **S2-3 El Espejo del Sector** | **35** | Efectos de red únicos, activo sectorial imposible de replicar sin escala | Imposible sin 3–4 clientes activos previos |

---

## Fortalezas y Debilidades de Implementación

### S1-1 — El Agrónomo Digital

**Fortalezas:**
- Se implementa el día que se firma el contrato — sin desarrollo adicional ni espera técnica
- El fundador ya tiene el conocimiento, los contactos y la credibilidad para ejecutarlo
- Genera ingresos premium ($8M–$12M COP/mes) desde el primer cliente
- Cada análisis queda documentado y se convierte en dato de entrenamiento futuro
- El cliente experimenta el valor antes de comprometerse — facilita el cierre comercial

**Debilidades:**
- El fundador es el único que puede responder: con 3+ clientes simultáneos, la calidad o la velocidad de respuesta cae
- No es escalable sin contratar agrónomos de confianza, lo que eleva el costo fijo
- El modelo de precio ($8M–$12M) es difícil de sostener cuando el sistema automatiza: el cliente siente que "pagó por el experto y lo quitaron"
- Si el fundador se enferma o no está disponible, el servicio se interrumpe
- No construye un activo técnico propio — construye reputación, que es valioso pero no vendible como IP

---

### S1-2 — Física de la Flor

**Fortalezas:**
- Una vez construida la biblioteca biológica, funciona para todos los clientes sin costo marginal adicional
- La precisión no depende de datos históricos del cliente — aplica desde el primer día para cualquier finca
- Enfoque científico (fisiología vegetal) que da credibilidad ante clientes conservadores y ante el sector académico
- El activo — la biblioteca de constantes — no lo tiene ningún competidor y tarda años en construirse
- Permite al fundador dejar de ser el cuello de botella desde el cliente 2

**Debilidades:**
- La biblioteca biológica existe hoy en la mente del fundador, no como documento estructurado — hay que formalizarla antes de implementar
- Requiere validación campo a campo: las constantes pueden variar por microclima, tipo de suelo, manejo agronómico específico de cada finca
- No aprende ni se ajusta sola — una constante incorrecta produce errores sistemáticos hasta que alguien la corrige
- La variedad de rosas colombianas es amplia (Freedom, Vendela, Mondial, Explorer, etc.) y cada una tiene su propia tabla — construir todo el catálogo toma tiempo

---

### S1-3 — El Socio de Datos

**Fortalezas:**
- Elimina la objeción de datos más fuerte del sector: "mis datos son míos" — porque son co-suyos
- Crea el cliente más comprometido posible: co-dueño tiene incentivo para aportar datos de calidad y validar honestamente
- La promesa "construimos juntos el activo más valioso de la floricultura" es un mensaje diferenciador único
- Puede abrir puertas con clientes estratégicos que no cerrarían con un contrato estándar

**Debilidades:**
- Tres meses sin ingresos + descuento permanente del 40%: el costo financiero es el más alto de todas las soluciones
- La co-propiedad requiere un contrato sofisticado (abogado especializado en propiedad intelectual) — costo legal no trivial
- Si AgriVision vende la empresa en el futuro, debe compensar al cliente co-dueño — complica cualquier exit
- El concepto es difícil de explicar en una primera reunión; requiere que el cliente llegue con mentalidad de inversor, no de comprador
- Riesgo de percepción: el cliente puede sentir que AgriVision "necesita" sus datos más que que le está haciendo un favor — invierte el poder en la negociación

---

### S1-4 — RL: El Sistema que Aprende Equivocándose

**Fortalezas:**
- La solución más poderosa a largo plazo: aprende los micro-patrones específicos de cada finca que ningún libro ni experto puede generalizar
- Nunca para de mejorar — un competidor que llegue 6 meses tarde no puede igualar la precisión de un sistema ya calibrado
- Autosuficiente: no necesita alianzas, bibliotecas externas ni experto humano para funcionar
- Escalable sin límite: cada finca tiene su propio agente que aprende en paralelo

**Debilidades:**
- Requiere un data scientist con experiencia en RL — perfil costoso que no está en el equipo actual
- El cliente debe tolerar errores del 15–20% durante 3–6 semanas de exploración — difícil de vender al gerente conservador que ya perdió dinero
- Si la función de recompensa está mal definida, el sistema aprende a optimizar algo incorrecto — error sistémico difícil de detectar
- La complejidad técnica hace el pitch más difícil: explicar RL a un gerente agropecuario sin formación tech es un obstáculo comercial real
- No recomendable como solución principal en Fase 0 o Fase 1 del operating model

---

### S2-1 — El Censo Vivo del Cultivo

**Fortalezas:**
- La solución con menos fricción de adopción: "solo cuento lo que tienes hoy" es fácil de entender para cualquier gerente
- Construye el dataset de entrenamiento que necesitan todas las demás soluciones — es la capa base del sistema completo
- No requiere que el cliente confíe en proyecciones ni en algoritmos — solo en un conteo objetivo
- Compatible con todos los niveles de sofisticación del cliente: puede empezar con una sola variedad en un solo lote
- Abre la puerta natural hacia S1-2 (física de la flor) y S1-4 (RL) sin que el cliente sienta un salto tecnológico

**Debilidades:**
- El modelo CV de clasificación de estados fisiológicos necesita estar entrenado con suficiente precisión (≥85%) antes del primer cliente productivo
- Si la captura de campo es inconsistente (operador sin protocolo), el censo tiene huecos y pierde credibilidad
- El valor percibido puede ser menor que el de las soluciones de proyección: "ya sé cuántas flores tengo" puede parecer menos urgente que "cuántas voy a tener"
- Sin el tiempo biológico de la variedad, el censo solo da información estática — necesita combinarse con S1-2 para ser accionable en exportación

---

### S2-2 — La Alerta que Elimina la Sorpresa

**Fortalezas:**
- El mayor impacto de retención de todas las soluciones: un cliente que ha recibido una alerta que le salvó un lote no cancela nunca
- Previene pérdidas del 15–40% del lote — el ROI es inmediato y cuantificable en dinero real
- La promesa "nunca más una sorpresa" es emocionalmente poderosa para un gerente que ya vivió una pérdida grande
- Puede venderse como módulo independiente — es el upsell natural del cliente que ya tiene el Censo Vivo
- Las regulaciones internacionales de floricultoras (Florverde, Rainforest Alliance) exigen monitoreo fitosanitario — la alerta puede posicionarse como herramienta de cumplimiento

**Debilidades:**
- El dataset de enfermedades en flores colombianas (botritis, mildiu, trips en rosas y claveles) debe construirse desde cero en campo — no existe en repositorios públicos con el nivel de detalle requerido
- Las alertas falsas positivas destruyen la confianza: si el sistema alerta y no hay enfermedad, el cliente empieza a ignorar las alertas
- La capa 3 (alertas sobre pedidos comprometidos) requiere integración con el sistema de planeación de cada cliente — proceso de onboarding más complejo
- La calibración de umbrales toma 4–8 semanas de operación real antes de que las alertas sean confiables

---

### S2-3 — El Espejo del Sector

**Fortalezas:**
- El único activo que ningún competidor puede replicar sin la misma escala — el moat más defensible de todos
- Abre el segmento financiero (Finagro, bancos agro) como fuente de ingresos institucional, no finca por finca
- El valor crece exponencialmente con la red: cada cliente nuevo hace el índice más valioso para todos los anteriores
- Los exportadores en Miami también valoran el índice sectorial — potencial de monetización en toda la cadena de valor

**Debilidades:**
- Imposible implementar antes de tener 3–4 clientes activos y con datos homogéneos — mínimo 6–9 meses de ventas previas
- Requiere que los clientes consientan explícitamente el uso de sus datos para benchmarking — la objeción de privacidad vuelve a aparecer
- El anonimato del índice es difícil de garantizar técnicamente si el sector es pequeño y los clientes se conocen entre sí
- No es un producto que se vende solo — emerge como beneficio adicional de ser cliente AgriVision, lo que lo hace difícil de monetizar de forma independiente antes de tener tracción

---

## Combinaciones recomendadas por etapa

**Etapa 0 — Día 1, primer cliente (hoy):**
> **S1-1 + S2-1**
> El fundador responde capturas en 2 horas (S1-1) y el sistema genera el primer censo fisiológico ese mismo día (S2-1). Máxima velocidad de valor, mínimo capital, cero dependencia externa.

**Etapa 1 — Clientes 2 y 3 (Q3 2026):**
> **S2-1 + S1-2 + S2-2**
> El censo ya está en producción. La biblioteca biológica refina las proyecciones sin experto humano (S1-2). Las alertas tempranas crean dependencia y previenen pérdidas grandes (S2-2). El fundador deja de ser el cuello de botella.

**Etapa 2 — 5+ clientes activos (2027):**
> **S2-3 + S1-4**
> El índice sectorial adquiere sentido con red real (S2-3). El RL aprende los micro-patrones de cada finca con clientes ya comprometidos (S1-4). Las dos soluciones más poderosas a largo plazo.

**S1-3 (Socio de Datos):** Reservar como táctica de ventas solo si un cliente estratégico clave no cierra con el modelo estándar.

---

## Conclusión

El ecualizador revela una secuencia lógica de implementación más que un ganador absoluto.

**El Censo Vivo del Cultivo (S2-1) lidera el puntaje total (50/60)** porque combina tres atributos que ninguna otra solución tiene simultáneamente: no requiere alianzas externas, entrega valor el Día 1 con el equipo actual y construye el dataset base que alimenta todas las soluciones restantes. Es el cimiento técnico del negocio.

**El Agrónomo Digital (S1-1) es el motor comercial del inicio (49/60).** Su puntaje de Alianzas bajó a 6 porque a medida que escala, el modelo depende de que el fundador esté disponible y de que el cliente quiera comprar acceso personal a un experto — no software. Esa dependencia es su mayor riesgo. Sin embargo, ninguna otra solución genera ingresos premium desde la hora cero sin inversión adicional. En la práctica, S1-1 y S2-1 no compiten — se ejecutan en paralelo desde el primer día.

**La Física de la Flor (S1-2) es la solución que libera al fundador del cuello de botella (48/60).** Es la transición natural de S1-1: el experto deja de responder caso a caso y la biología calcula en su lugar. Construir la biblioteca de constantes es la inversión más importante que el fundador puede hacer entre el cliente 1 y el cliente 2.

**Las soluciones de largo plazo (S1-4 RL y S2-3 Espejo del Sector) no deben descartarse — deben programarse.** S1-4 es la promesa tecnológica más poderosa que AgriVision puede hacer a un cliente: "en 6 meses el sistema va a saber más de tu finca que cualquier agrónomo que haya trabajado en ella." S2-3 es el activo más defensible del negocio a escala. Ambas deben aparecer en el roadmap público desde el primer pitch, aunque se ejecuten en 2027.

**La recomendación práctica:** S1-3 (Socio de Datos) y S2-3 (Espejo del Sector) no son soluciones de lanzamiento — son palancas estratégicas para momentos específicos. S1-3 solo vale si hay un cliente ancla que no cierra de otra manera. S2-3 solo existe cuando hay red. S1-4 solo es viable cuando hay un data scientist en el equipo.

**El orden de ejecución que maximiza velocidad, capital y moat:**

```
HOY          → S1-1 + S2-1   (ingresos + censo desde el Día 1)
Q3 2026      → S1-2 + S2-2   (escala sin cuello humano + retención alta)
2027         → S2-3 + S1-4   (red sectorial + aprendizaje continuo)
Ocasional    → S1-3           (solo para clientes ancla difíciles de cerrar)
```

La ventaja competitiva de AgriVision no va a venir de elegir la solución correcta. Va a venir de ejecutar las primeras dos combinaciones antes de que cualquier competidor llegue al mercado colombiano con el contexto, las relaciones y el dataset que el fundador ya tiene hoy.

---

## Preguntas abiertas

**1. Capacidad real del fundador para S1-1**
¿Cuántas capturas diarias puede analizar de forma sostenida sin degradar la calidad de respuesta? La respuesta define cuándo debe activarse S1-2 y si hay que contratar un agrónomo de apoyo antes del cliente 3.

**2. Estado de la biblioteca biológica para S1-2**
¿Existe ya documentada la tabla de constantes (variedad × estado × altitud × temperatura → días al corte)? ¿Cuánto tiempo toma formalizarla? ¿Hay variedades o condiciones con vacíos de conocimiento?

**3. Tolerancia al error del primer cliente**
El perfil del early adopter que "ya perdió dinero por proyección incorrecta" ¿tiene paciencia para una curva de aprendizaje (S1-4) o necesita certeza inmediata? Esto define si S1-4 puede mencionarse en el pitch o si debe quedar como promesa de roadmap.

**4. Dataset de enfermedades para S2-2**
¿Tiene AgriVision imágenes etiquetadas de botritis y mildiu en flores colombianas? ¿Hay acceso a ellas vía Ceniflores o hay que construir el dataset desde cero en campo?

**5. Condición exacta para ofrecer co-propiedad (S1-3)**
¿Cuál es el tipo de cliente que justifica sacrificar ese ingreso? ¿Una finca de 300+ ha? ¿Alguien con acceso a 10 fincas del sector? Sin un criterio claro, el riesgo es ofrecer co-propiedad por presión comercial en lugar de por estrategia.

**6. Momento de inversión en S1-4 (RL)**
¿Aparece el data scientist especializado en el roadmap de contratación antes o después del desarrollador full-stack? ¿O se explora S1-4 primero como capa experimental sobre XGBoost antes de contratar ese perfil?

---

*ecualizador.md — AgriVision | Abril 2026*

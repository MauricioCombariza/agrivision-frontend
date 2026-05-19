# WORKFRAME MVP — AgriVision
> Censo Vivo + Predicción de Producción Floricultora | Abril 2026

---

## Proyecto

**AgriVision — Censo Vivo & Proyección de Exportación**

Plataforma de inteligencia visual especializada en floricultura colombiana que combina **Computer Vision (YOLOv8)** con **predicción estadística (XGBoost)** para que el gerente de una floricultora pueda confirmar pedidos de exportación con certeza real — no con estimaciones del agrónomo.

El sistema opera en dos motores simultáneos:
- **Motor 1 (El Ojo):** el operador fotografía el cultivo con su celular → CV clasifica el estado fisiológico de cada planta → inventario exacto por lote en tiempo real.
- **Motor 2 (La Memoria):** los datos históricos del cliente + el estado actual del censo → XGBoost proyecta la producción a 7, 14 y 21 días → el modelo mejora solo con cada ciclo validado.

---

## Problema u Oportunidad

### El problema concreto

Los gerentes de floricultoras colombianas no pueden confirmar pedidos de exportación con certeza porque sus proyecciones de producción se basan en estimaciones empíricas del agrónomo — no en datos reales del cultivo.

**Consecuencias medidas:**
- Error de proyección típico: **20–30%** en temporadas clave (San Valentín, Día de la Madre, Navidad)
- Pérdida por error de proyección por evento: **$30M–$100M COP por finca**
- Causa: ningún gerente sabe exactamente cuántas flores tiene en cada estado fisiológico en tiempo real — el conteo es manual, tardío y subjetivo

**Lo que pasa hoy sin el sistema:**

```
Gerente recibe pedido de Miami: "5.000 rosas para el viernes 3"
Gerente pregunta al agrónomo: "¿Cuánto tenemos?"
Agrónomo recorre el cultivo (3-4 horas) y estima: "Como 4.500... o 5.500"
Gerente decide basado en esa estimación
Resultado real: 3.800 tallos → incumplimiento → penalidad → relación dañada
```

### La oportunidad de mercado

| Dato | Valor |
|------|-------|
| Colombia: 2do exportador mundial de flores | $2.34B USD en 2024 (récord histórico) |
| Ha cultivadas en Cundinamarca (zona objetivo) | ~5.874 ha (66% del total nacional) |
| Fincas objetivo (100+ ha, Sabana Norte) | 60–120 fincas |
| Adopción agtech en Colombia vs. mundo | 18–24 meses de retraso → ventana de primer movimiento |
| Mercado global precision farming (2026) | $16.07B → $48.36B en 2035 (CAGR 13%) |
| Competidor más cercano (GHT Corp) | BI sobre datos digitales — **no analiza imágenes del cultivo real** |

**De dónde surgió esta iniciativa:**
El fundador tiene +10 años trabajando en cultivos de flores en Colombia. Observó directamente cómo los gerentes tomaban decisiones de exportación basados en estimaciones que fallaban sistemáticamente en temporadas altas. La combinación de ese conocimiento de dominio con capacidades técnicas en CV y XGBoost crea un perfil que no existe en el mercado colombiano.

---

## Funcionalidades — Alcance del MVP

### Lo que se construye (y solo esto)

**Feature 1 — Censo fisiológico en tiempo real**

*Captura — dos fases:*
- **Piloto:** PWA offline instalada vía link de WhatsApp (sin Play Store). El trabajador graba fotos o video mientras camina la cama. Todo se guarda en el teléfono — sin internet en campo. Al llegar a zona WiFi, la app sube automáticamente y muestra confirmación visible en pantalla.
- **Producción (mes 3–4):** APK Android distribuida directamente + protocolo de video guiado. El trabajador graba 30–40 segundos caminando la cama a paso normal. El backend extrae los 10 mejores frames y los procesa — el trabajador no para, no enfoca, solo camina.

*Identificación de camas:*
- QR plastificado en el poste de inicio de cada cama (< $30K COP para 6 camas). El trabajador apunta el teléfono → lote/cama/variedad se registran automáticamente. Sin tipear nada.
- Camas asignadas por defecto: la app muestra "tus camas de hoy" al abrir, sin selección. Para coberturas por ausencia: escanear el QR de la cama sin asignar → app pregunta "¿cubriendo a un compañero?" → queda registrado bajo el nombre de quien cubrió.

*Procesamiento:*
- YOLOv8n clasifica cada planta visible en 5 estados: botón cerrado → listo para corte
- El sistema guarda el inventario por cama / lote / variedad / fecha
- Tiempo foto/video → resultado en dashboard: < 2 minutos

**Feature 2 — Proyección de producción con XGBoost**
- Se ingresan los históricos del cliente (CSV/Excel de producción por semana)
- XGBoost combina: estado actual del censo + histórico por lote + semana del año + temperatura
- Genera proyección a 7, 14 y 21 días con intervalo de confianza
- Se activa desde la semana 3–4 (cuando hay mínimo 3 censos + histórico)

**Feature 3 — Pantalla de decisión: "¿Puedo confirmar este pedido?"**
- El gerente ingresa el volumen del pedido y la semana de entrega
- El sistema responde: VERDE / AMARILLO / ROJO con justificación y opciones concretas
- Esta es la única pantalla que importa en el MVP

**Feature 4 — Bucle de validación automático**
- Cada lunes: compara predicción de hace 14 días con censo real de hoy
- Calcula error (MAPE), documenta la evolución, reentrenar mensualmente
- Muestra al gerente la mejora acumulada del modelo ("error bajó de 22% a 14%")

### Acciones del usuario simplificadas

| Usuario | Antes | Con AgriVision MVP |
|---------|-------|-------------------|
| **Trabajador de base** | Recorre contando manualmente, anota en cuaderno | Graba video caminando — la app cuenta. Reporte generado automático. |
| **Trabajador de base** | No tiene prueba de que hizo el recorrido | Cada captura queda registrada con nombre, hora y fotos — protección propia |
| **Jefe de producción** | Llama al trabajador para saber qué hay en cada lote | Ve el dashboard — no interrumpe al trabajador |
| **Gerente** | Estimación subjetiva con margen 20–30% | Semáforo VERDE/AMARILLO/ROJO con datos reales del cultivo |
| **Gerente** | No sabe cuándo el modelo falla | Alerta automática si el error supera 25% dos semanas seguidas |

### Lo que NO entra al MVP

| Fuera del alcance | Por qué |
|-------------------|---------|
| Detección de enfermedades (botritis, mildiu) | Requiere dataset diferente — sprint siguiente |
| Módulo logístico QR / pallets | Problema #3 — resolver #1 primero |
| Integración con ERP del cliente | Complejidad técnica que bloquea el piloto |
| Benchmarks sectoriales (Espejo del Sector) | Requiere 3–4 clientes activos simultáneos |
| APK en producción con video guiado | Para el piloto la PWA es suficiente — APK entra en mes 3–4 |
| Router WiFi en cafetería | Se instala al firmar el contrato mayor, no en el piloto de 6 camas |

---

## Recursos & Presupuesto

### Equipo

| Rol | Persona | Dedicación |
|-----|---------|-----------|
| Producto + ML + Ventas + CS | Mauro (fundador) | 100% |
| Primer empleado (comercial/CS) | Contratar al firmar primer contrato | Q2 2026 |

**Perfil único del fundador:** la única persona en Colombia con +10 años en cultivos de flores colombianas Y capacidad técnica en CV + XGBoost. No existe este perfil en el mercado laboral — tiempo de replicar: 3–5 años mínimo.

### Infraestructura (ya existente o a costo mínimo)

| Recurso | Estado | Costo |
|---------|--------|-------|
| VPS Hetzner CX31 (backend + DB + MinIO) | Ya configurado | €12/mes (~$60K COP) |
| PostgreSQL + MinIO | Ya configurado en VPS | $0 |
| Google Colab Pro (entrenamiento CV) | Disponible | $10 USD/mes |
| LabelImg (anotación dataset) | Open source | $0 |
| FastAPI + YOLOv8 + XGBoost | Open source | $0 |
| Open-Meteo API (datos climáticos) | Gratis, sin key | $0 |
| **Burn total infraestructura** | | **< $200K COP/mes** |

### Presupuesto total del MVP (bootstrapped)

| Concepto | Monto |
|----------|-------|
| Infraestructura mensual | < $200K COP/mes |
| Herramientas dev (APIs, IDEs) | ~$100K COP/mes |
| Desplazamientos a campo (Día Cero + validaciones) | ~$300K COP/vez |
| **Burn total fundador solo** | **< $500K COP/mes** |
| **Setup fee cobrado al primer cliente** | **$3M–$8M COP (único)** |
| **El primer cliente financia el MVP desde el mes 1** | |

### Créditos disponibles (aplicar esta semana)

| Fuente | Tipo | Monto | Estado |
|--------|------|-------|--------|
| AWS Activate | Créditos cloud | Hasta $100K USD | Aplicar |
| Google for Startups | Créditos + mentoring | Hasta $200K USD | Aplicar |
| Innpulsa Capital Semilla | No dilutivo | Hasta $300M COP | Revisar fechas |

---

## Objetivos

### Objetivo 1 — Validar la disposición a pagar
> Conseguir el primer contrato de pago antes del 30 de junio de 2026
> **Señal de éxito:** firma de contrato, aunque sea a precio de lanzamiento ($50K COP/ha/mes)

### Objetivo 2 — Validar la precisión del modelo
> Modelo CV con accuracy ≥ 85% validado por el jefe de producción del cliente piloto
> **Señal de éxito:** sesión ciega de 50 fotos → > 80% concordancia técnico-modelo

### Objetivo 3 — Generar el primer momento de valor real
> El gerente consulta el dashboard **antes** de confirmar un pedido a Miami
> **Señal de éxito:** el gerente abre la pantalla "¿puedo confirmar este pedido?" sin que el fundador se lo pida

### Objetivo 4 — Calibrar el predictor XGBoost
> Error de proyección (MAPE) < 20% en semana 4, < 15% en mes 3
> **Señal de éxito:** 2 ciclos consecutivos de predicción con error < 15%

### Objetivo 5 — Demostrar ROI cuantificado
> Al mes 3, documentar pérdidas evitadas vs. costo del servicio
> **Señal de éxito:** ROI ≥ 10:1 (una suscripción de $14M COP/mes vs. una pérdida evitada de $30M+)

### Métricas clave del MVP

| Métrica | Cómo se mide | Target semana 4 | Target mes 3 |
|---------|-------------|----------------|-------------|
| Accuracy CV (clasificación estados) | Sesión ciega con jefe producción | ≥ 80% | ≥ 85% |
| MAPE proyección XGBoost | Comparación predicción vs real | < 25% | < 15% |
| Frecuencia de captura del operador | Registros en DB / días activos | ≥ 4 capturas/semana | ≥ 5 capturas/semana |
| Uso del dashboard por el gerente | Logins / semana | ≥ 2 | ≥ 3 |
| Decisiones de exportación con datos | Observación directa | 1 | ≥ 3/semana |

---

## Público Objetivo

### Perfil 1 — El decisor: Carlos, Gerente General de Finca

| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Gerente General / Dueño de floricultora |
| **Tamaño de finca** | 100–200 ha activas en Sabana Norte de Bogotá |
| **Edad** | 45–60 años |
| **Dolor principal** | Confirma pedidos de exportación con estimaciones empíricas del agrónomo — en San Valentín, un error del 20% = $50M COP en pérdidas |
| **Job-to-be-done** | "Cuando necesito confirmar a Miami que voy a entregar 50.000 rosas la próxima semana, quiero saber exactamente cuántas tengo en cada estado, para no quedar mal ni sobrecomprometer" |
| **Señal de compra** | "La última temporada de San Valentín quedé corto / me sobró y tuve que descartar" |
| **Canal de acceso** | Red de confianza directa del fundador (costo $0, conversión alta) |
| **Disposición a pagar** | Alta si el ROI es tangible en la primera temporada (LTV:CAC > 500:1) |

### Perfil 2 — El supervisor del sistema: Andrés, Jefe de Producción

| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Jefe de producción / Ingeniero agrónomo |
| **Edad** | 30–45 años |
| **Dolor principal** | Recibe estimaciones imprecisas de los trabajadores, interrumpe su trabajo para responder preguntas del gerente sobre inventario, detecta enfermedades tarde |
| **Job-to-be-done** | "Quiero saber exactamente qué hay en cada lote sin tener que llamar a nadie ni hacer el recorrido yo mismo" |
| **Rol en el sistema** | Configura las asignaciones diarias de camas, valida las clasificaciones del modelo CV ("¿esto es correcto?"), recibe alertas de upload y de anomalías |
| **Rol en la compra** | Influenciador clave — valida en el Día Cero que las clasificaciones son correctas antes de mostrarlas al gerente |

### Perfil 3 — El capturador: Juan, Trabajador de Base

| Atributo | Descripción |
|----------|-------------|
| **Cargo** | Trabajador de campo / operador de cultivo |
| **Edad** | 20–50 años |
| **Teléfono** | Android gama baja (Moto G / Samsung A básicos) — sin plan de datos activo para el trabajo |
| **Dolor principal** | Conteo manual tedioso, trabajo invisible ("nadie sabe lo que hice"), interrupciones del jefe preguntando por los lotes |
| **Job-to-be-done** | "Quiero que mi recorrido quede registrado, no tener que contar planta por planta y que el jefe no me llame en la tarde preguntando qué hay en el lote 3" |
| **Motivaciones para adoptar** | (1) Ya no cuenta manualmente — la app cuenta por él. (2) Trabajo registrado con nombre, hora y fotos — protección propia. (3) WiFi de cafetería al completar las camas del día. |
| **Resistencia esperada** | "Una tarea extra que no me pagan" → resolverla con: el recorrido con la app = el mismo recorrido de siempre, solo 3–4 minutos más |

### Perfil Early Adopter (criterio de calificación)

Para que un prospecto sea un early adopter válido, debe cumplir **los 3:**
1. Tiene pedidos de exportación activos (no solo vende local)
2. Ya vivió una pérdida concreta por proyección incorrecta (puede cuantificarla)
3. Mide su negocio por cumplimiento de contratos con compradores internacionales

**Tamaño del segmento:** 60–120 fincas de +100 ha en Cundinamarca

---

## Resultado Esperado

### Aprendizajes que buscamos con este MVP

**Aprendizaje 1 — ¿El gerente cambia su comportamiento cuando tiene datos reales?**
La hipótesis de negocio central no es técnica — es de comportamiento. ¿El gerente deja de llamar al agrónomo antes de confirmar el pedido y empieza a consultar el dashboard? Si esto ocurre, el product-market fit está validado.
> Señal de éxito: en la semana 6, el gerente abre la app antes de hacer la llamada a Miami, sin que el fundador se lo recuerde.

**Aprendizaje 2 — ¿El operador de campo adopta la captura sin supervisión?**
El modelo solo funciona si el operador captura regularmente. Si hay fricción en la adopción del operador (resistencia cultural, celular incompatible, protocolo confuso), el sistema no genera datos y todo colapsa.
> Señal de éxito: en la semana 2, el operador captura ≥ 4 días sin recordatorio del fundador.

**Aprendizaje 3 — ¿Los históricos del cliente son usables?**
Muchos floricultores tienen sus datos en Excel, cuadernos o en la cabeza del agrónomo. Si los históricos son incompletos o inconsistentes, el XGBoost no se puede activar y la propuesta de valor de proyección se retrasa.
> Señal de éxito: en el Día Cero, el cliente entrega ≥ 1 año de registros de producción por lote en formato procesable.

**Aprendizaje 4 — ¿El modelo CV alcanza 85% en condiciones reales de campo?**
El dataset de entrenamiento se construye en condiciones controladas. Las condiciones reales (luz variable, ángulos diferentes, flores parcialmente cubiertas) pueden bajar la accuracy. Si no se alcanza 85%, se necesita más anotación o fine-tuning.
> Señal de éxito: validación ciega con jefe de producción → > 80% concordancia.

### Resultados cualitativos que indican buen camino

- El gerente usa el término "mis datos" al referirse al dashboard (apropiación)
- El jefe de producción muestra el resultado de la app a visitas o colegas espontáneamente (orgullo de uso)
- El gerente pregunta "¿cuándo pueden agregar la detección de enfermedades?" (señal de expansión)
- El cliente paga el segundo mes sin que el fundador haga seguimiento (retención natural)

---

## Barreras

### Barrera 1 — El trabajador de base no adopta la captura (riesgo ALTO)
**Descripción:** El trabajador de base es el eslabón más frágil. Si no captura regularmente, no hay datos, no hay censo, no hay proyección. La resistencia viene de percibir la app como trabajo extra no remunerado para beneficio del jefe.

**Mitigación — tres palancas simultáneas:**
- **Quitar trabajo, no agregar:** el protocolo de video guiado reemplaza el conteo manual — el trabajador graba mientras camina (lo que ya hace) y ya no tiene que contar planta por planta.
- **Protección propia:** cada captura queda registrada con nombre, hora y fotos. Si alguien cuestiona si revisó el lote ese día, el sistema lo prueba. *"Nadie te puede decir que no fuiste."*
- **WiFi de cafetería como incentivo concreto:** al completar las camas del día, la app muestra "✓ 6/6 camas grabadas" — esa pantalla es la llave para el WiFi del descanso. En el MVP (sin router en cafetería aún): el jefe verifica la pantalla y da la contraseña. Al crecer: router TP-Link en cafetería (~$150K COP) → upload automático al llegar + notificación al jefe sin intervención.

**El mensaje del Día Cero con los trabajadores:** *"Ya no tienes que contar. Queda registrado con tu nombre. Las 6 camas te dan el WiFi del descanso."*

### Barrera 2 — El cliente no entrega sus datos históricos (riesgo ALTO)
**Descripción:** Los Excel de producción son el combustible del XGBoost. Muchos clientes no los tienen organizados, los guardan el agrónomo saliente o simplemente no existen en digital.
**Mitigación:** En el Día Cero, el fundador revisa directamente los archivos del cliente y los procesa. Si no hay histórico: activar primero la proyección biológica (no necesita datos) y construir el histórico desde cero con los primeros censos.

### Barrera 3 — Precisión del modelo CV < 80% en condiciones reales (riesgo ALTO)
**Descripción:** El dataset se anota en condiciones parcialmente controladas. Las variaciones de luz natural, ángulo del operador y mezcla de estados en una misma cama pueden bajar la accuracy a niveles inaceptables.
**Mitigación:** Sesión de validación ciega antes del lanzamiento. Lanzar el modelo como "asistente que el jefe de producción corrige" (no como juez). Cada corrección es un dato de entrenamiento adicional.

### Barrera 4 — Fundador como único cuello de botella (riesgo ALTO)
**Descripción:** Con 3+ clientes simultáneos, el fundador no puede atender ventas + construcción del producto + customer success + análisis de datos al mismo tiempo. La calidad cae en todas las áreas.
**Mitigación:** Primer empleado (comercial/CS) se contrata con los ingresos del primer cliente. No antes.

### Barrera 5 — El cliente quiere ver resultados antes de pagar (riesgo MEDIO)
**Descripción:** El perfil del gerente conservador exige prueba antes de compromiso. Un piloto gratuito largo bloquea el flujo de caja y el compromiso del cliente.
**Mitigación:** El piloto siempre tiene precio (aunque sea $1M COP/mes simbólico). El Día Cero en campo — donde el gerente ve sus flores en datos antes del almuerzo — es la prueba más poderosa, y ocurre antes de firmar.

### Barrera 6 — GHT Corp expande su oferta a CV de campo (riesgo MEDIO)
**Descripción:** GHT Corp ya tiene 40+ clientes florícolas en Colombia con un producto de BI. Si añaden CV de campo, tienen la red de distribución pero no el dataset.
**Mitigación:** Moverse rápido. El dataset propio de imágenes de flores colombianas anotadas es la barrera que tarda años en replicarse. Cada semana de operación aumenta el moat.

---

## Palancas

### Palanca 1 — Red de confianza sectorial del fundador (valor: ALTO)
+10 años en el sector floricultor colombiano = acceso directo a gerentes sin CAC comercial. El primer cliente no viene de un anuncio — viene de una llamada. En un sector conservador donde la confianza se construye en años, esto es irremplazable.
> Aplicar: usar la red directa para las primeras 3–5 demos. No gastar en marketing digital hasta tener 3 clientes pagantes.

### Palanca 2 — Stack técnico ya construido (valor: ALTO)
El VPS, la base de datos, MinIO, los pipelines de CV y el stack XGBoost ya están configurados. El MVP no parte de cero — parte de integrar componentes que ya existen. Tiempo de build real: 4–6 semanas, no 6 meses.
> Aplicar: proteger el tiempo de construcción. No agendar demos en las 3 primeras semanas mientras se termina el modelo CV.

### Palanca 3 — El Día Cero como herramienta de venta (valor: MUY ALTO)
El momento donde el gerente ve sus flores convertidas en datos por primera vez — antes del almuerzo del primer día — es el cierre de venta más poderoso posible. No se puede describir en un pitch: se tiene que experimentar.
> Aplicar: ofrecer el Día Cero como parte del proceso de evaluación (antes de firmar), con imágenes reales de la finca del prospecto ya procesadas.

### Palanca 4 — Asocolflores como canal de credibilidad (valor: MEDIO)
Asocolflores tiene acceso a todas las floricultoras del país y está activamente buscando tecnología para sus afiliados. Una mención o endorsement de Asocolflores equivale a la confianza de 100 llamadas frías.
> Aplicar: agendar reunión formal con directivos de Asocolflores al tener el primer caso de uso documentado con ROI medible.

### Palanca 5 — Créditos cloud gratuitos (valor: MEDIO)
AWS Activate y Google for Startups ofrecen hasta $300K USD combinados en créditos cloud para startups. Esto elimina el costo de infraestructura por 12–24 meses y permite escalar sin inversión.
> Aplicar: solicitar esta semana. El proceso toma 2–3 semanas y no requiere tracción previa.

### Palanca 6 — El dataset propio como moat creciente (valor: MUY ALTO, diferido)
Cada cliente nuevo genera imágenes únicas de flores colombianas en condiciones reales. Este dataset — que ningún competidor puede replicar sin años de acceso al campo — se convierte en la barrera competitiva más sólida del negocio a medida que crece.
> Aplicar: estructurar el pipeline de datos desde el Día Cero. Cada imagen guardada en MinIO es un activo. Cada corrección del jefe de producción es un dato de entrenamiento.

### Palanca 7 — Innpulsa / capital no dilutivo (valor: MEDIO, aplicar ahora)
Innpulsa Capital Semilla y el Fondo Emprender (SENA) ofrecen capital sin dilución para startups colombianas en etapa temprana. AgriVision califica perfectamente: sector agrícola, IA, impacto en empleo rural.
> Aplicar: revisar convocatorias abiertas. Aplicar antes de levantar capital externo — el capital no dilutivo siempre es mejor.

### Palanca 8 — WiFi de cafetería como motor de adopción conductual (valor: ALTO, costo mínimo)
El WiFi de descanso es un beneficio concreto y valorado por trabajadores de base. Convertirlo en el incentivo natural para completar las capturas del día resuelve el problema de adopción sin supervisión directa ni persuasión constante. El jefe de producción ve en tiempo real quién completó y quién no — sin llamar a nadie.
- **MVP (piloto):** pantalla "✓ 6/6 camas" → jefe verifica → da contraseña WiFi. Costo: $0.
- **Al escalar:** router TP-Link en cafetería (~$150K COP al firmar contrato mayor) → upload automático + notificación automática al jefe. El mismo hardware sirve como punto de subida y como incentivo.
> Aplicar: instalar el router en cafetería el mismo día que se firma el contrato de expansión — no antes, no después.

---

## Secuencia de ejecución — De hoy al primer cliente pagante

```
SEMANA 1–2   Anotar dataset (400–600 imágenes, 5 estados fisiológicos)
SEMANA 2–3   Entrenar YOLOv8n + validar con jefe de producción
SEMANA 3     PWA campo + FastAPI /infer + censo básico funcionando
SEMANA 4     Dashboard Streamlit: inventario + proyección biológica
             ★ PRIMER VALOR ENTREGADO: el gerente ve sus flores en datos
SEMANA 4–6   Cargar histórico del cliente + activar XGBoost
SEMANA 6     ★ PRIMER MOMENTO DE RETENCIÓN: gerente consulta dashboard
             antes de llamar a Miami → confirma pedido con datos
SEMANA 7+    Bucle de validación automático activo → modelo mejora solo
MES 3        MAPE < 15% → proponer renovación anual + referido
```

**El único número que importa al final del mes 1:**
> ¿El gerente tomó al menos 1 decisión de exportación usando datos de AgriVision?

Si sí → el modelo de negocio está validado. Cobrar. Contratar el comercial. Escalar.
Si no → entender qué bloqueó ese momento. Ajustar antes de buscar el cliente 2.

---

*workframe_mvp.md — AgriVision | Abril 2026*
*Basado en: WORKFRAME_MVP.pptx + lean-canvas.md + censo_vivo.md + product-strategy-report.md + operating-model.md*

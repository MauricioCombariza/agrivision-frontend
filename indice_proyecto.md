# AgriVision — Elementos necesarios por paso del proceso
> Qué se necesita tener listo en cada etapa | Abril 2026

---

## PASO 1 — Firma del contrato

| Elemento | Descripción | Quién lo prepara |
|----------|-------------|-----------------|
| Contrato de servicios | Documento con alcance, precio, duración y condiciones | Fundador |
| Pacto de Datos | Anexo del contrato: propiedad de datos, portabilidad, uso anónimo opt-in | Fundador |
| Propuesta comercial con ROI | PDF con precio, módulos y beneficios esperados | Fundador |
| Calculadora de ROI | Estimación de pérdidas evitadas vs. costo del servicio | Fundador |
| Método de pago | Cuenta bancaria o plataforma para recibir el setup fee | Fundador |
| Plantilla solicitud de datos históricos | Lista clara de qué entregar: Excel de producción, registros de enfermedades, variedades por lote | Fundador |

---

## PASO 2 — Día Cero en campo

**Del fundador:**

| Elemento | Descripción |
|----------|-------------|
| Modelo CV entrenado | Modelo de computer vision cargado y funcional para clasificar estados fisiológicos |
| App móvil (PWA) | Instalable desde el navegador en cualquier celular Android/iOS |
| Dashboard web | Accesible desde el computador del gerente ese mismo día |
| Credenciales del cliente | Usuario y contraseña del dashboard listos antes de llegar |
| Guía de captura impresa | Protocolo visual de cómo tomar fotos: ángulo, distancia, luz, frecuencia |
| Script de validación | Preguntas para que el jefe de producción valide las clasificaciones del modelo |
| Script de reunión de cierre | Agenda y preguntas para la reunión de las 3:30pm con el gerente |

**Del cliente (alistados antes del Día Cero):**

| Elemento | Descripción |
|----------|-------------|
| Excel / planillas históricas de producción | Mínimo 1 año, idealmente 2–3 años de datos por variedad y lote |
| Registros de enfermedades o tratamientos | Fechas, lotes afectados, tratamientos aplicados |
| Listado de variedades activas por lote | Nombre de la variedad, lote, hectáreas |
| Celular del operador de campo | Con internet, cámara funcional y espacio para instalar la PWA |
| Acceso a los lotes piloto | Los 2–3 lotes más críticos para la próxima temporada |
| Gerente y jefe de producción disponibles | Todo el día — es el día más importante del proceso |

---

## PASO 3 — Semana 1: activación y captura

| Elemento | Descripción | Quién lo tiene |
|----------|-------------|---------------|
| PWA instalada y funcionando | App en el celular del operador desde el Día Cero | Operador |
| Protocolo de captura interiorizado | El operador sabe qué fotos tomar, cuándo y cómo | Operador |
| WhatsApp del fundador | Canal directo para resolver dudas en tiempo real | Fundador |
| Pipeline de procesamiento activo | Las fotos que llegan se procesan automáticamente | Fundador / sistema |
| Datos históricos en proceso | El fundador está cruzando los históricos con los primeros datos de campo | Fundador |
| Plantilla de resumen semanal | Formato fijo del reporte que se envía cada viernes | Fundador |

---

## PASO 4 — Semanas 2–4: primeras proyecciones

| Elemento | Descripción | Quién lo tiene |
|----------|-------------|---------------|
| Modelo XGBoost activo | Entrenado con datos históricos + primeras capturas de campo | Fundador |
| Línea base histórica cargada | Datos de producción pasados integrados al modelo | Fundador |
| Dashboard con proyección visible | El gerente puede ver la proyección a 1–4 semanas desde su computador | Sistema |
| Reunión virtual agendada (semana 2) | 30 minutos con gerente y jefe de producción para revisar la primera proyección | Fundador |
| Registro de estimación del agrónomo | Para comparar contra la proyección del modelo y documentar la diferencia | Jefe producción |
| Formato de informe de fin de mes 1 | Plantilla para proyección vs. real, error del modelo, alertas emitidas | Fundador |

---

## PASO 5 — Meses 2–3: modelo calibrado

| Elemento | Descripción | Quién lo tiene |
|----------|-------------|---------------|
| Modelo refinado | Ajustado con el feedback del jefe de producción de las semanas anteriores | Fundador |
| Sistema de alertas activo | Notificación automática al detectar síntomas de enfermedad en campo | Sistema |
| Reporte semanal automático | Resumen en lenguaje gerencial enviado cada viernes por email o WhatsApp | Sistema |
| Dashboard de métricas de uso | El fundador monitorea silenciosamente cuándo y cómo usa el gerente el sistema | Fundador |
| Plantilla Informe de Impacto 90 días | Formato para presentar precisión acumulada y ROI al cliente | Fundador |

---

## PASO 6 — Temporada Alta

| Elemento | Descripción | Quién lo tiene |
|----------|-------------|---------------|
| Calendario de temporadas | San Valentín, Día de la Madre, Navidad — con fechas de asesoría agendadas | Fundador |
| Proyecciones para la temporada | Datos del modelo con vista a 4–6 semanas | Sistema |
| Modelo de simulación de escenarios | Calcular impacto si la producción sube o baja un ±15% vs. el pedido comprometido | Fundador |
| Plan de contingencia tipo | Qué lotes activar, cuánto tiempo toma, cuántos tallos se recuperan | Fundador + jefe producción |
| Plantilla Informe de Temporada (PDF) | Proyección final, escenarios simulados, acuerdos del día | Fundador |

---

## PASO 7 — Renovación

| Elemento | Descripción | Quién lo tiene |
|----------|-------------|---------------|
| Informe de Impacto Anual | Precisión del modelo, ROI total, temporadas navegadas con éxito | Fundador |
| Calculadora ROI actualizada | Pérdidas evitadas vs. costo real pagado durante el año | Fundador |
| Propuesta de expansión | Nuevas hectáreas, módulo logístico, benchmarks sectoriales (IAPF) | Fundador |
| Contrato de renovación | Documento actualizado con nuevas condiciones si aplica | Fundador |
| Script de pedido de referido | Frase concreta para pedir presentación a un colega del sector | Fundador |

---

## Resumen consolidado — todos los elementos

| Categoría | Elementos |
|-----------|-----------|
| **Documentos legales** | Contrato, Pacto de Datos, propuesta comercial |
| **Tecnología** | App PWA, dashboard web, modelo CV, modelo XGBoost, sistema de alertas |
| **Datos** | Históricos de producción del cliente, registros de enfermedades, variedades por lote |
| **Comunicación** | Plantillas de resumen semanal, WhatsApp del fundador, guía de captura impresa |
| **Informes** | Informe fin de mes 1, Informe 90 días, Informe Temporada, Informe Anual ROI |
| **Personas** | Fundador, gerente, jefe de producción, operador de campo |

---

*indice_proyecto.md — AgriVision | Abril 2026*

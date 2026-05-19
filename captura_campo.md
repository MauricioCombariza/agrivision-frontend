# Captura de Campo — Opciones técnicas y adopción del operador
> AgriVision | Abril 2026
> Contexto del piloto: 6 camas, ~10 minutos de recorrido, trabajadores de base, solo WiFi

---

## Lo que sabemos del contexto real — cuadro completo

| Pregunta | Respuesta | Implicación clave |
|----------|-----------|------------------|
| ¿Qué teléfonos tienen? | Android gama baja (Moto G / Samsung A básicos) | Offline obligatorio — notificación visible de upload, no Background Sync silencioso |
| ¿Cuántas camas y cuánto tiempo? | 6 camas, ~10 minutos de recorrido | Agregar video guiado suma < 5 min al recorrido que ya hacen |
| ¿Dónde hay WiFi? | Área administrativa. Sin router en cafetería para el MVP — se instala al crecer | MVP: upload al pasar por admin. Producción: router cafetería como punto de subida + incentivo |
| ¿Los postes son fijos? | Sí — permiten pegar QR | QR confirmado: plástico laminado en cada poste, < $30K COP para 6 camas |
| ¿Quién filma? | Trabajadores de base | UX ultra-simple, 1 botón, audio de guía, framing de protección y reconocimiento |
| ¿Tienen datos móviles? | No para esto — solo WiFi | Upload 100% diferido al llegar a zona WiFi |
| ¿Camas fijas o rotación? | Fijas normalmente — rotación ocasional por ausencia | App muestra "tus camas de hoy" por defecto + botón "cubrir a un compañero" |

---

## PARTE 1 — Opciones de captura técnica

### El flujo base que aplica a todas las opciones

Dado que no hay datos móviles y el WiFi está solo en administración, el flujo siempre es:

```
CAMPO (sin internet)              PUNTO DE WiFi (cafetería / admin)
────────────────────              ──────────────────────────────────
Trabajador recorre camas          Trabajador llega a descanso / almuerzo
→ Graba / fotografía              → Teléfono detecta WiFi
→ App guarda en el teléfono       → App sube automáticamente
→ "Guardado ✓"                    → "6 camas subidas ✓"
```

Esto no cambia según la tecnología elegida. Lo que cambia es cuán confiable es ese upload y cuán fácil es la captura.

---

### Opción A — PWA offline-first con upload al llegar al WiFi

**Cómo funciona:**
App web que corre en Chrome. Fotos o videos guardados en IndexedDB del teléfono mientras está en campo. Cuando llega al área de WiFi, el Service Worker detecta la conexión y sube los archivos.

**Problema real en gama baja:** los fabricantes como Samsung en teléfonos básicos y algunos Moto G matan los procesos del navegador en segundo plano para ahorrar batería. El Background Sync silencioso puede no dispararse.

**Solución para el piloto:** no depender del sync automático invisible. En cambio, cuando el trabajador llega al WiFi, la app muestra una pantalla activa:

```
┌─────────────────────────────────────┐
│  📶 WiFi detectado                  │
│                                     │
│  Tienes 6 camas guardadas           │
│  [ SUBIR AHORA → 45 segundos ]      │
│                                     │
│  O se sube solo en 1 minuto         │
└─────────────────────────────────────┘
```

El trabajador puede tocar el botón o simplemente dejar el teléfono y la app sube sola mientras está en la cafetería. Un toque o cero toques — lo que prefiera.

**Fortalezas:**
- Sin instalación — el jefe de producción envía un link, el trabajador lo abre en Chrome
- Funciona en cualquier Android básico con Chrome
- Una sola codebase para el equipo

**Limitaciones en gama baja:**
- IndexedDB puede ser limpiado si el teléfono queda con muy poco espacio libre
- Cámara web con menos control que nativa (exposición variable en el invernadero)

**Mitigación práctica:** grabar en 720p (8–12 MB por cama, 6 camas = ~70 MB total, manejable en cualquier teléfono con espacio normal).

**Veredicto:** Suficiente para el MVP del piloto. El link de acceso se envía por WhatsApp — cero fricción de instalación. La pantalla activa de upload resuelve el problema del Background Sync silencioso en gama baja.

---

### Opción B — APK Android directa (sin Play Store)

**Cómo funciona:**
App Android instalada como APK vía WhatsApp o link de descarga. El jefe de producción la instala en los teléfonos del equipo una sola vez en el Día Cero.

**Por qué es más robusta en gama baja:**
WorkManager de Android garantiza el upload aunque la app esté cerrada, el teléfono se reinicie, o el fabricante tenga configuración agresiva de batería. Es el estándar para tareas de fondo confiables en cualquier Android.

```
WorkManager: "Sube cuando llegue a WiFi"
→ Funciona aunque el trabajador cierre la app
→ Funciona en Samsung A-series, Moto G, cualquier Android
→ No depende del navegador ni del estado del proceso
→ Si pierde WiFi a mitad, retoma donde quedó
```

**Para el piloto de 6 camas:** la diferencia vs la PWA es pequeña — 6 camas son ~70MB y el upload tarda < 1 minuto. Pero a escala (múltiples lotes, muchos trabajadores), WorkManager es la diferencia entre un sistema confiable y uno que falla silenciosamente.

**Fortalezas:**
- Upload garantizado en cualquier Android gama baja
- Acceso completo a la cámara (exposición fija para invernadero)
- Sin riesgo de que el sistema limpie el almacenamiento

**Limitaciones:**
- 4–5 semanas adicionales de desarrollo vs la PWA
- El jefe de producción instala la APK en cada teléfono una vez

**Veredicto:** La opción correcta para el sistema en producción. Para el piloto de 6 camas, la PWA es suficiente para validar el flujo.

---

### Opción C — Protocolo de video guiado ⭐ La más poderosa

**Por qué encaja perfectamente con 6 camas y 10 minutos:**

El recorrido actual de 10 minutos con el protocolo de video quedaría:

```
SIN APP (hoy)                     CON VIDEO GUIADO
──────────────────────────        ──────────────────────────────────
10 min recorrido + conteo mental  10 min recorrido + 3 min de video
Llega con estimaciones             Llega con conteo exacto por cama
Reporta al jefe de producción      El jefe ya tiene los datos
(interrumpe su trabajo)            (no hay llamada)
```

El trabajador agrega solo 3–4 minutos a un recorrido que ya hace. El resultado es cuantitativamente diferente: ya no estima — tiene datos exactos.

**Flujo para trabajadores de base:**

```
Trabajador llega a la primera cama
  → Escanea QR del poste (o toca la cama en el mapa de la app)
  → Escucha por el audífono: "Empieza a caminar. Graba mientras avanzas."
  → Graba 30–40 segundos caminando el corredor
  → App dice: "Cama 1 guardada ✓ — siguiente: Cama 2"

Repite × 6 camas → ~4 minutos totales de grabación
  → Todo guardado en el teléfono
  → Al llegar al punto de WiFi: sube automáticamente
```

**Diseño para gama baja:** el video se graba a 720p, 30fps, H.264. Por cama: 8–12MB. Total 6 camas: ~60–70MB. El backend extrae los 8–10 frames más nítidos de cada video y los procesa con YOLOv8. El trabajador nunca ve ese procesamiento — solo ve el resultado.

**El QR en los postes:**
Impresión en plastificado resistente a humedad. Costo: < $30K COP para 6 camas. Elimina la selección manual del lote y hace el flujo 40% más rápido. El trabajador no escribe nada — solo apunta y graba.

**Veredicto:** Esta es la arquitectura definitiva. La combinación de video guiado + QR + extracción automática de frames elimina prácticamente toda la fricción cognitiva para el trabajador de base.

---

### Comparativa para este contexto específico

| Dimensión | A — PWA Offline | B — APK Nativa | C — Video Guiado |
|-----------|:--------------:|:--------------:|:----------------:|
| **Tiempo de desarrollo** | 2–3 semanas | 5–6 semanas | +2 sem sobre B |
| **Funciona en gama baja** | Sí (con upload activo) | Sí (WorkManager) | Sí (720p, ~70MB) |
| **Upload confiable sin datos** | Medio | Alto | Alto (con B) |
| **Fricción para el trabajador** | Baja | Baja | Muy baja |
| **Calidad de datos** | Media | Alta | Muy alta |
| **Tiempo adicional al recorrido** | +2 min (fotos) | +2 min (fotos) | +3–4 min (video) |
| **Lanzamiento piloto** | Semana 3 | Semana 6 | Semana 5–6 |

### Recomendación de secuencia

**MVP / Piloto (semanas 1–6):** PWA offline + fotos por cama + QR en postes + pantalla activa de upload al llegar al WiFi. Valida el flujo operativo y el modelo CV sin semanas extras de desarrollo.

**Sistema en producción (mes 3–4):** APK Android + protocolo de video guiado + WorkManager. El upload es garantizado en cualquier gama baja. El video da datos más ricos con menos fricción para el trabajador.

---

## PARTE 2 — Adopción: la estrategia del WiFi de cafetería

### La idea

Sin datos móviles y con WiFi solo en administración, el upload siempre ocurre en diferido — cuando el trabajador pasa por una zona con señal. La propuesta es convertir ese momento en un **incentivo concreto**: quien completa sus camas obtiene el WiFi de la cafetería.

El WiFi es un beneficio valorado por trabajadores de base. No es abstracto como "ayudas a la empresa" — es inmediato, personal y diario.

```
TRABAJADOR COMPLETA SUS 6 CAMAS        TRABAJADOR NO COMPLETA
─────────────────────────────────      ──────────────────────────────
App muestra: "✓ 6/6 camas grabadas"   App muestra: "⚠️ 3/6 pendientes"
Llega a zona WiFi → sube automático    Puede subir las que tiene
Tiene WiFi del día ✓                   Completa el resto → obtiene WiFi
```

No es punitivo — el trabajador siempre puede conectarse. La diferencia es que quien completó todo lo sabe de inmediato, y queda registrado para el jefe sin que nadie llame.

---

### Tres fases de implementación según el tamaño del cliente

**FASE MVP — Sin router adicional (piloto de 6 camas)**

Para el primer cliente, no hay router en cafetería todavía. El upload ocurre naturalmente cuando el trabajador pasa por el área administrativa al terminar el turno, ir al baño o buscar insumos. No se necesita infraestructura adicional.

La estrategia de incentivo en esta fase es más simple:

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   ✅  6 / 6 camas grabadas hoy                       │
│                                                      │
│   Muestra esta pantalla al jefe                      │
│   para el WiFi del descanso                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

El jefe de producción ve la pantalla en 2 segundos y sabe si el recorrido está completo — sin preguntar, sin llamar. Da la contraseña del WiFi admin para el descanso. Costo: $0. Implementación: inmediata.

**Limitación de esta fase:** el WiFi de admin no es el lugar natural de descanso. El trabajador tiene que ir al admin para obtener el beneficio. Funciona para el piloto pero no escala bien.

---

**FASE PRODUCCIÓN — Router en cafetería (al firmar contrato más grande)**

Cuando el cliente crece más allá del piloto de 6 camas y hay múltiples trabajadores, se instala un router TP-Link básico (~$150K COP) en la cafetería. Este router tiene una red separada que la app reconoce como el punto de upload.

Cuando el trabajador llega a la cafetería:
1. Su teléfono se conecta automáticamente al WiFi de cafetería
2. La app detecta la red y sube los videos en segundo plano
3. El jefe de producción recibe en su dashboard:
   ```
   📲 Juan Pérez — 6/6 camas subidas ✓ — 11:35am
   📲 Carlos Ríos — 4/6 camas subidas — 11:40am
   ```
4. El WiFi de cafetería está disponible para todos — el indicador de camas completadas es visible pero no bloquea el acceso

La transparencia crea el incentivo sin ser punitiva. El trabajador que completó todo aparece con ✓. El que no, sabe que el jefe lo ve — sin que nadie le llame.

**Componentes:** router TP-Link (~$150K COP) + configuración de red separada + integración con API de AgriVision (notificación al jefe). Tiempo: 1 semana de desarrollo, 2 horas de instalación en finca.

---

**FASE ESCALA — Portal cautivo (3+ clientes, sistema consolidado)**

Con muchos trabajadores y múltiples lotes, el portal cautivo da visibilidad completa sin supervisión manual. Cuando el trabajador se conecta al WiFi de cafetería, ve su propio estado antes de acceder:

```
┌──────────────────────────────────────────────────────┐
│   WiFi AgriVision — Cafetería                        │
│   Juan Pérez · Turno mañana                          │
│                                                      │
│   ✅ Cama 1    ✅ Cama 2    ✅ Cama 3                  │
│   ✅ Cama 4    ⚠️  Cama 5   ⚠️  Cama 6               │
│                                                      │
│   4 subidas · 2 grabadas, subiendo ahora...          │
│   [ Conectando → ]                                   │
└──────────────────────────────────────────────────────┘
```

El acceso nunca se bloquea — la pantalla es informativa. Las camas grabadas se suben en ese momento. Las pendientes quedan marcadas para el jefe.

**Componentes:** router con OpenWRT + portal cautivo integrado con la API. Tiempo: 2 semanas de desarrollo.

---

### Cuál usar en cada momento

| Momento | Versión | Costo | Desarrollo |
|---------|---------|-------|-----------|
| Piloto 6 camas | Pantalla de estado + jefe verifica | $0 | Cero días extra |
| Al firmar contrato mayor | Router cafetería + notificación al jefe | $150K COP hardware | 1 semana |
| 3+ clientes | Portal cautivo | $0 (ya tiene router) | 2 semanas adicionales |

---

## PARTE 3 — Diseño específico para trabajadores de base

### El perfil real

Trabajadores de base en una floricultora colombiana:
- Entre 20 y 50 años
- Usan WhatsApp con fluidez pero no apps complejas
- No les gusta recibir más tareas
- Valoran ser reconocidos por su trabajo
- Desconfían de herramientas que "los vigilan"
- Tienen teléfonos básicos con poco espacio libre

### Los mensajes que funcionan — y los que no

| Mensaje que NO funciona | Por qué falla | Mensaje que SÍ funciona |
|------------------------|---------------|------------------------|
| "Ayudas al gerente a tener mejores datos" | No es su problema | "Ya no tienes que contar las flores — la app cuenta por ti" |
| "Es una herramienta nueva que debes aprender" | Más trabajo | "Caminas igual que siempre — solo llevas el teléfono" |
| "El sistema te monitorea" | Desconfianza | "Queda registrado que hiciste tu trabajo — nadie te puede decir que no fuiste" |
| "Es rápido y fácil" | Promesa vacía | "Son 4 minutos extra en un recorrido de 10 — pruébalo hoy y dime" |

### Las tres motivaciones reales del trabajador de base

**1. Protección propia**
El registro de captura con nombre, hora y fotos protege al trabajador de acusaciones falsas. Si alguien dice "ese lote no fue revisado el martes", el sistema muestra quién fue, a qué hora, y qué encontró.

> *"Si alguna vez el jefe dice que no revisaste algo, el sistema tiene la prueba de que sí lo hiciste."*

**2. Menos trabajo tedioso**
El conteo manual de plantas es repetitivo y cognitivamente agotador. Si la app lo hace automáticamente, el trabajador llega al reporte sin haber contado una sola planta.

> *"Ya no tienes que llevar la cuenta en la cabeza. Graba el video y la app te dice cuánto hay."*

**3. El WiFi de la cafetería**
Concreto, inmediato, valorado. No es abstracto como "ayudas a la empresa".

> *"Las camas que grabas hoy te dan el WiFi del descanso."*

---

### Diseño del flujo para gama baja con trabajadores de base

**Reglas no negociables:**

| Regla | Justificación |
|-------|--------------|
| Pantalla principal: 1 botón grande | Un trabajador de base con guantes en el campo no navega menús |
| Audio de guía (opcional, por audífono) | Manos y ojos ocupados en el cultivo — no en la pantalla |
| Texto en pantalla: máximo 5 palabras por instrucción | Pantallas pequeñas + sol = texto chico invisible |
| PIN de 4 dígitos, nunca contraseña | El trabajador no recuerda emails en el campo |
| Feedback inmediato y grande: "✓ Cama 3 lista" | Confirma que funcionó — reduce ansiedad de uso |
| Sin pasos después de grabar el video | La app hace el resto — el trabajador ya terminó |
| Sin internet durante la captura, siempre | Si la app exige internet en campo, el trabajador la abandona |

**La pantalla principal del trabajador (lo que ve cuando abre la app):**

```
┌─────────────────────────────────────────────────────┐
│  BUENOS DÍAS, JUAN            Viernes 25 abril       │
│                                                      │
│  TUS CAMAS DE HOY                                    │
│  ✅ Cama 1    ✅ Cama 2    ✅ Cama 3                  │
│  ⬜ Cama 4    ⬜ Cama 5    ⬜ Cama 6                  │
│                                                      │
│          [ 📹  GRABAR SIGUIENTE CAMA ]               │
│                                                      │
│  3 de 6 listas · WiFi al terminar todas              │
└─────────────────────────────────────────────────────┘
```

Un solo botón grande. El progreso visible. El incentivo (WiFi) recordado. Sin menús adicionales.

---

### El Día Cero con los trabajadores de base

El protocolo de onboarding es diferente al del jefe de producción — más corto, más práctico, más demostrativo:

```
ONBOARDING DEL TRABAJADOR DE BASE — 20 minutos en campo

1. El jefe de producción presenta la app brevemente:
   "Esto reemplaza el conteo manual. Graben el video mientras caminan."

2. El trabajador más curioso del grupo prueba primero (siempre hay uno)
   → Graba la primera cama con el fundador al lado
   → Ve el resultado en 30 segundos: "Cama 1 — 188 plantas estado 3"
   → Reacción natural: "¡Y eso lo detecta solo!"

3. El resto del grupo ve la reacción del primero
   → La adopción social ocurre aquí, no en una explicación
   → El fundador no convence — el resultado convence

4. Cada trabajador graba una cama solo mientras el fundador observa
   → Sin intervenir, sin corregir en el momento
   → Si hay error, corregir después (no frente al grupo)

5. Al final: "Estas 6 pantallas verdes son el WiFi de la cafetería hoy."
   → Los trabajadores conectan y ven que funciona → adopción sellada
```

**La regla de oro del onboarding con trabajadores de base:**
> Que el resultado hable primero. Una sola demostración vale más que cinco minutos de explicación.

---

## PARTE 3B — Asignación de camas: fijas con rotación ocasional

### El diseño por defecto: "tus camas de hoy"

Cada trabajador tiene sus camas asignadas permanentemente en el sistema. Cuando abre la app en la mañana, ve directamente sus camas — sin seleccionar nada, sin buscar nada:

```
┌─────────────────────────────────────────────────────┐
│  BUENOS DÍAS, JUAN            Lunes 28 abril         │
│                                                      │
│  TUS CAMAS DE HOY                                    │
│  ⬜ Cama 1    ⬜ Cama 2    ⬜ Cama 3                  │
│  ⬜ Cama 4    ⬜ Cama 5    ⬜ Cama 6                  │
│                                                      │
│          [ 📹  GRABAR SIGUIENTE CAMA ]               │
│                                                      │
│  0 de 6 listas                                       │
└─────────────────────────────────────────────────────┘
```

El botón "Grabar siguiente cama" siempre apunta a la primera cama pendiente en orden. El trabajador no decide qué grabar — solo toca el botón y va al QR de esa cama.

---

### El caso de rotación: "cubrir a un compañero"

Cuando un trabajador cubre las camas de alguien ausente, el flujo es:

**Opción A — El jefe reasigna en la app (recomendado para el MVP)**

El jefe de producción tiene una pantalla simple de asignación diaria:

```
ASIGNACIONES — Lunes 28 abril

Juan Pérez     → Camas 1-6  (normal)
Carlos Ríos    → Camas 7-12 (normal)
Pedro Sánchez  → AUSENTE
  ↳ Camas 13-18 sin asignar

[ + Asignar camas 13-18 a... ]
  → Juan Pérez (ya tiene 6 → quedaría con 12)
  → Carlos Ríos
  → Repartir: 3 a Juan + 3 a Carlos
```

El jefe toca la opción y los trabajadores ven las camas adicionales en su app esa mañana. Sin llamadas, sin explicaciones verbales. Juan abre la app y ve "9 camas hoy" con las 3 extra marcadas como "cubriendo a Pedro".

**Opción B — El trabajador escanea el QR de la cama sin asignar**

Si el jefe no reasignó digitalmente, el trabajador llega a una cama sin asignar, escanea el QR del poste y la app pregunta:

```
Esta cama no está en tu lista de hoy.

¿Estás cubriendo a alguien?
[ Sí — agregar a mi recorrido ]  [ No — cancelar ]
```

Si confirma, la cama queda registrada bajo el nombre del trabajador que la cubrió — útil tanto para el conteo del cultivo como para el registro del trabajo realizado.

---

### Lo que el sistema registra en ambos casos

Independientemente de si es una cama asignada o de rotación, cada captura guarda:

```
cama_capture
─────────────────────────────────────
trabajador_id    → "Juan Pérez"
cama_id          → "Lote 3 - Cama 5"
tipo             → "normal" | "rotación" | "cobertura"
trabajador_original → "Pedro Sánchez" (si es cobertura)
fecha            → 2026-04-28
hora             → 07:42
video_path       → minIO / fotos
estados          → {e1: 12, e2: 45, e3: 89, e4: 34, e5: 8}
```

Esto es importante para el trabajador que cubre: queda documentado que lo hizo, a qué hora, y qué encontró. Es su protección y su prueba de trabajo adicional.

---

## Resumen final — Qué construir y en qué orden

### Sistema de captura

| Fase | Qué | Cómo |
|------|-----|------|
| **Piloto (semanas 1–6)** | PWA offline + fotos + QR en postes | Link por WhatsApp, sin instalación, pantalla activa de upload al llegar al WiFi de admin |
| **Producción (mes 3–4)** | APK + protocolo de video guiado | WorkManager garantiza upload, video 720p, extracción de frames en backend |
| **Desde el día 1** | QR plastificado en postes de cada cama | < $30K COP para 6 camas, elimina selección manual de lote y nombre de variedad |

### Sistema de adopción (WiFi por fases)

| Fase | Infraestructura | Mecanismo |
|------|-----------------|-----------|
| **Piloto** | WiFi admin existente | Trabajador muestra pantalla "✓ 6/6" al jefe → recibe contraseña WiFi del descanso. Costo: $0 |
| **Al crecer** | Router TP-Link en cafetería (~$150K COP) | Upload automático al llegar a cafetería → jefe recibe push "Juan 6/6 ✓". Se instala al firmar el contrato grande |
| **A escala** | Portal cautivo sobre el mismo router | Trabajador ve su estado de camas al conectarse — pantalla informativa, no bloqueante |

### Gestión de camas

| Caso | Qué hace el sistema |
|------|---------------------|
| **Día normal** | App muestra "tus camas de hoy" sin que el trabajador seleccione nada |
| **Compañero ausente — jefe reasigna** | Jefe toca "asignar camas de Pedro a Juan" → Juan las ve en su app esa mañana |
| **Compañero ausente — trabajador actúa** | Escanea QR de cama no asignada → app pregunta "¿cubriendo a alguien?" → queda bajo su nombre |
| **Registro de cobertura** | Cada captura de cobertura queda documentada con nombre, hora y cama original — protege y reconoce al trabajador que cubrió |

### Los tres mensajes para el primer día con los trabajadores de base

1. **"Ya no tienes que contar."** Graba el video mientras caminas — la app cuenta por ti. Tardas lo mismo que el recorrido normal.
2. **"Queda registrado con tu nombre, hora y fotos."** Si hiciste tu trabajo, el sistema lo prueba. Nadie puede decir que no fuiste.
3. **"Las 6 camas te dan el WiFi del descanso."** Concreto, inmediato, hoy. Y si cubres a alguien, eso también queda a tu nombre.

---

*captura_campo.md — AgriVision | Abril 2026*

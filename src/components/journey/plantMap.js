// Coordenadas sobre public/brand/planta.webp (724×2172, recorte de la planta del Manual de Marca).
// `y` de los anclajes es fracción de la altura de la planta que queda centrada en pantalla
// cuando ese bloque de contenido está en el centro del viewport. Deben crecer en orden de documento.
export const PLANT = { width: 724, height: 2172, soil: 0.644 }

export const NODES = {
  flor:   { x: 358, y: 130 },
  campo:  { x: 450, y: 335 },
  proyeccion: { x: 470, y: 645 },
  logistica:  { x: 480, y: 945 },
  suelo:  { x: 358, y: 1400 },
  valor0: { x: 330, y: 1560 },
  valor1: { x: 400, y: 1700 },
  valor2: { x: 300, y: 1850 },
  valor3: { x: 370, y: 2000 },
}

export const ANCHORS = {
  hero: 0.05,
  about: 0.08,
  video: 0.11,
  problem: 0.13,
  modules: [0.155, 0.297, 0.435],
  howItWorks: 0.53,
  metrics: 0.6,
  mission: 0.655,
  vision: 0.69,
  values: [0.718, 0.782, 0.852, 0.92],
  whyUs: 0.95,
  segments: 0.98,
}

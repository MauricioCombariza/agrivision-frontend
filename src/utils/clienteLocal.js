// Descarga del cliente de escritorio (procesa el video en el laptop de la
// finca y sube solo el lote de fotos — ver alstroemeria/vision,
// backend/scripts/cliente_local.py). Se sirve desde un repo público separado
// (solo releases) porque el repo del código es privado y los assets de
// releases de un repo privado no se pueden bajar sin sesión de GitHub. Al
// subir una versión nueva del cliente, actualizar el tag de esta URL.
export const URL_CLIENTE_LOCAL =
  'https://github.com/MauricioCombariza/agrivision-captura-releases/releases/download/v1.0.0/AgriVisionCaptura.exe'

export function descargarClienteLocal() {
  const enlace = document.createElement('a')
  enlace.href = URL_CLIENTE_LOCAL
  enlace.download = 'AgriVisionCaptura.exe'
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
}

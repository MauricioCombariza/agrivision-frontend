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

// Solo oculta el panel de "descarga el programa" para no insistirle a quien ya
// lo tiene instalado — no reemplaza la casilla de confirmación obligatoria
// antes de subir un video crudo, esa sigue pidiéndose siempre.
const CLAVE_INSTALADO = 'agrivision_cliente_local_instalado'

export function clienteYaInstalado() {
  try {
    return localStorage.getItem(CLAVE_INSTALADO) === '1'
  } catch {
    return false
  }
}

export function marcarClienteInstalado() {
  try {
    localStorage.setItem(CLAVE_INSTALADO, '1')
  } catch {
    /* localStorage no disponible */
  }
}

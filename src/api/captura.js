/**
 * Subida de videos de captura de campo.
 *
 * El video va del navegador de la finca directo al bucket con una URL firmada: no pasa
 * por Vercel ni por el VPS. Por eso funciona con archivos de varios GB.
 */

const RUTA_FIRMA = '/api/upload-url'

export async function pedirUrlDeSubida(datos) {
  const res = await fetch(RUTA_FIRMA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  const cuerpo = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(cuerpo.detail || `Error ${res.status}`)
  return cuerpo
}

/**
 * PUT del archivo con progreso real. Se usa XMLHttpRequest y no fetch porque es la
 * única forma de saber cuánto lleva subido: con archivos de GB sobre internet rural,
 * una barra que no se mueve es indistinguible de un cuelgue.
 */
export function subirArchivo(url, archivo, alProgresar) {
  return new Promise((resolver, rechazar) => {
    const peticion = new XMLHttpRequest()
    peticion.open('PUT', url)
    peticion.setRequestHeader('Content-Type', archivo.type || 'application/octet-stream')

    peticion.upload.onprogress = (e) => {
      if (e.lengthComputable) alProgresar(e.loaded / e.total)
    }
    peticion.onload = () =>
      peticion.status >= 200 && peticion.status < 300
        ? resolver()
        : rechazar(new Error(`El bucket rechazó la subida (${peticion.status})`))
    peticion.onerror = () => rechazar(new Error('Se perdió la conexión durante la subida'))
    peticion.onabort = () => rechazar(new Error('Subida cancelada'))

    peticion.send(archivo)
    subirArchivo.enCurso = peticion
  })
}

export function cancelarSubida() {
  subirArchivo.enCurso?.abort()
}

export async function subirMetadatos(url, metadatos) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metadatos, null, 2),
  })
  if (!res.ok) throw new Error(`No se pudo guardar la ficha del video (${res.status})`)
}

export function extensionDe(nombre) {
  const partes = String(nombre).split('.')
  return partes.length > 1 ? partes.pop().toLowerCase() : ''
}

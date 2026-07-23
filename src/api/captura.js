/**
 * Subida de videos de captura de campo al buzón del servidor.
 *
 * El video se manda como cuerpo crudo de un POST, no como multipart: el servidor lo
 * escribe en streaming directo a un área de disco con tope duro, sin pasar por memoria
 * ni por archivos temporales. La ficha del lote viaja en una cabecera codificada.
 */

const BASE = import.meta.env.VITE_API_URL ?? ''

/**
 * Sube el video con progreso real. Se usa XMLHttpRequest y no fetch porque es la única
 * forma de saber cuánto lleva subido: con archivos de cientos de MB sobre internet
 * rural, una barra que no se mueve es indistinguible de un cuelgue.
 */
export function subirVideo(archivo, ficha, codigo, alProgresar) {
  return new Promise((resolver, rechazar) => {
    const peticion = new XMLHttpRequest()
    peticion.open('POST', `${BASE}/api/v1/capturas`)
    peticion.setRequestHeader('Content-Type', 'application/octet-stream')
    peticion.setRequestHeader('X-Codigo', codigo)
    peticion.setRequestHeader('X-Extension', extensionDe(archivo.name))
    peticion.setRequestHeader('X-Ficha', codificarFicha(ficha))

    peticion.upload.onprogress = (e) => {
      if (e.lengthComputable) alProgresar(e.loaded / e.total)
    }
    peticion.onload = () => {
      if (peticion.status === 201) {
        resolver(JSON.parse(peticion.responseText))
      } else {
        rechazar(new Error(detalleDe(peticion.responseText) ?? `Error ${peticion.status}`))
      }
    }
    peticion.onerror = () => rechazar(new Error('Se perdió la conexión durante la subida'))
    peticion.onabort = () => rechazar(new Error('Subida cancelada'))

    peticion.send(archivo)
    subirVideo.enCurso = peticion
  })
}

export function cancelarSubida() {
  subirVideo.enCurso?.abort()
}

export async function estadoBuzon() {
  const res = await fetch(`${BASE}/api/v1/capturas/health`)
  const cuerpo = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(cuerpo.detalle || `El buzón no responde (${res.status})`)
  return cuerpo
}

/**
 * Cambia usuario/contraseña por el token admin del buzón. El buzón no guarda
 * sesiones: de aquí en adelante el token viaja como X-Admin en cada llamada.
 */
export async function iniciarSesionAdmin(usuario, contrasena) {
  const res = await fetch(`${BASE}/api/v1/capturas/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena }),
  })
  const cuerpo = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(detalleDe(JSON.stringify(cuerpo)) || `Error ${res.status}`)
  return cuerpo.token
}

export async function listarCapturas(token) {
  const res = await fetch(`${BASE}/api/v1/capturas`, { headers: { 'X-Admin': token } })
  const cuerpo = await res.json().catch(() => ([]))
  if (!res.ok) throw new Error(detalleDe(JSON.stringify(cuerpo)) || `Error ${res.status}`)
  return cuerpo
}

/**
 * Baja el video al navegador del admin. Se hace por fetch (no un <a href>) porque el
 * token viaja como header X-Admin, y un link normal no puede mandar headers custom.
 */
export async function descargarCaptura(token, identificador, nombreArchivo) {
  const res = await fetch(`${BASE}/api/v1/capturas/${identificador}`, {
    headers: { 'X-Admin': token },
  })
  if (!res.ok) throw new Error(`No se pudo descargar (${res.status})`)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo || identificador
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

/**
 * base64url del JSON en UTF-8. `btoa` solo acepta Latin-1, así que un nombre de finca
 * con tilde lo rompería: hay que codificar a bytes primero.
 */
function codificarFicha(ficha) {
  const bytes = new TextEncoder().encode(JSON.stringify(ficha))
  let binario = ''
  for (const b of bytes) binario += String.fromCharCode(b)
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function extensionDe(nombre) {
  const partes = String(nombre).split('.')
  return partes.length > 1 ? partes.pop().toLowerCase() : 'mp4'
}

function detalleDe(texto) {
  try {
    const cuerpo = JSON.parse(texto)
    if (typeof cuerpo.detail === 'string') return cuerpo.detail
  } catch {
    /* respuesta no JSON */
  }
  return null
}

/**
 * Lotes de imágenes ya procesados y subidos por el cliente de escritorio
 * (backend-jobs, api.combariza.com/api/v1/jobs). Autenticación HTTP Basic por
 * finca — las mismas credenciales que ya usa el operario en el programa de
 * escritorio, no el token de administrador del buzón.
 *
 * El backend desactiva a propósito el desafío nativo de HTTP Basic (sin header
 * WWW-Authenticate en los 401), así que hay que mandar el header Authorization
 * a mano en cada fetch — un <img src="..."> normal no puede adjuntarlo, por
 * eso las miniaturas y el ZIP se traen por fetch + blob en vez de un link o
 * <img> directos.
 */

const BASE = import.meta.env.VITE_API_URL ?? ''

export function construirAuth(usuario, clave) {
  return `Basic ${btoa(`${usuario}:${clave}`)}`
}

async function peticionAutenticada(ruta, auth, opciones = {}) {
  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: { ...(opciones.headers ?? {}), Authorization: auth },
  })
  if (res.status === 401) {
    throw new SesionInvalidaError('Usuario o contraseña incorrectos')
  }
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}))
    throw new Error(cuerpo.detail || `Error ${res.status}`)
  }
  return res
}

export class SesionInvalidaError extends Error {}

export async function listarLotes(auth) {
  const res = await peticionAutenticada('/api/v1/jobs', auth)
  return res.json()
}

export async function obtenerManifiesto(auth, jobId) {
  const res = await peticionAutenticada(`/api/v1/jobs/${jobId}/manifest`, auth)
  return res.json()
}

export async function obtenerMiniatura(auth, jobId, indice) {
  const res = await peticionAutenticada(`/api/v1/jobs/${jobId}/frames/${indice}`, auth)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

export async function descargarLoteZip(auth, jobId, nombreArchivo) {
  const res = await peticionAutenticada(`/api/v1/jobs/${jobId}/zip`, auth)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo || `${jobId}.zip`
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

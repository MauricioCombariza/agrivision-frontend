import { useEffect, useState } from 'react'
import {
  SesionInvalidaError,
  construirAuth,
  descargarLoteZip,
  listarLotes,
  obtenerManifiesto,
  obtenerMiniatura,
} from '../../api/jobs'

const CLAVE_AUTH = 'agrivision_jobs_auth'

export default function GaleriaLotes() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem(CLAVE_AUTH) || '')
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [lotes, setLotes] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [descargando, setDescargando] = useState(null)
  const [expandido, setExpandido] = useState(null)

  useEffect(() => {
    if (auth && lotes === null) cargar(auth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  async function cargar(credencial) {
    setCargando(true)
    setError(null)
    try {
      const datos = await listarLotes(credencial)
      // Más reciente primero, aunque el backend ya los entrega así.
      datos.sort((a, b) => new Date(b.creado) - new Date(a.creado))
      setLotes(datos)
    } catch (e) {
      if (e instanceof SesionInvalidaError) {
        sessionStorage.removeItem(CLAVE_AUTH)
        setAuth('')
      }
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  async function entrar(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    const credencial = construirAuth(usuario, clave)
    try {
      await listarLotes(credencial) // valida usuario/clave antes de guardar
      sessionStorage.setItem(CLAVE_AUTH, credencial)
      setAuth(credencial)
      setClave('')
      await cargar(credencial)
    } catch (e) {
      setError(e instanceof SesionInvalidaError ? 'Usuario o contraseña incorrectos' : e.message)
      setCargando(false)
    }
  }

  function salir() {
    sessionStorage.removeItem(CLAVE_AUTH)
    setAuth('')
    setLotes(null)
    setUsuario('')
    setClave('')
    setExpandido(null)
  }

  async function bajar(lote) {
    setDescargando(lote.job_id)
    setError(null)
    try {
      await descargarLoteZip(auth, lote.job_id, `${lote.job_id}.zip`)
    } catch (e) {
      setError(e.message)
    } finally {
      setDescargando(null)
    }
  }

  function alternarExpandido(jobId) {
    setExpandido((actual) => (actual === jobId ? null : jobId))
  }

  if (!auth) {
    return (
      <div className="cap-admin">
        <h2>Ver fotos subidas</h2>
        <p className="det-hint">
          Entra con el mismo usuario y contraseña que usas en el programa de escritorio.
        </p>
        <form className="det-stack" onSubmit={entrar}>
          <label className="cap-campo">
            <span>Usuario (finca)</span>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              disabled={cargando}
              required
            />
          </label>
          <label className="cap-campo">
            <span>Contraseña</span>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="current-password"
              disabled={cargando}
              required
            />
          </label>
          <button className="det-upload-btn" type="submit" disabled={cargando}>
            <span>{cargando ? 'Entrando…' : 'Entrar'}</span>
          </button>
        </form>
        {error && <div className="det-error">{error}</div>}
      </div>
    )
  }

  return (
    <div className="cap-admin">
      <div className="cap-admin__header">
        <h2>Fotos subidas</h2>
        <button className="cap-admin-toggle" onClick={salir}>
          Cerrar sesión
        </button>
      </div>

      {error && <div className="det-error">{error}</div>}

      {cargando && !lotes && <p className="cap-meta">Cargando…</p>}

      {lotes && lotes.length === 0 && (
        <p className="cap-meta">Todavía no hay fotos subidas para esta finca.</p>
      )}

      {lotes && lotes.length > 0 && (
        <ul className="cap-lista">
          {lotes.map((lote) => (
            <li key={lote.job_id} className="cap-fila cap-fila--columna">
              <div className="cap-fila__info">
                <strong>{formatear(lote.creado)}</strong>
                <span className="cap-meta">
                  {lote.mensaje || lote.estado}
                  {lote.estado !== 'completado' && ` · ${lote.estado}`}
                </span>
              </div>
              {lote.estado === 'completado' && (
                <div className="cap-fila__acciones">
                  <button
                    className="cap-admin-toggle"
                    onClick={() => alternarExpandido(lote.job_id)}
                  >
                    {expandido === lote.job_id ? 'Ocultar fotos' : 'Ver fotos'}
                  </button>
                  <button
                    className="cap-admin-toggle"
                    onClick={() => bajar(lote)}
                    disabled={descargando === lote.job_id}
                  >
                    {descargando === lote.job_id ? 'Bajando…' : 'Descargar ZIP'}
                  </button>
                </div>
              )}
              {expandido === lote.job_id && (
                <MiniaturasLote auth={auth} jobId={lote.job_id} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function MiniaturasLote({ auth, jobId }) {
  const [frames, setFrames] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false
    const urls = []

    async function cargar() {
      try {
        const manifiesto = await obtenerManifiesto(auth, jobId)
        if (cancelado) return
        const conMiniatura = await Promise.all(
          manifiesto.frames.map(async (frame) => {
            const url = await obtenerMiniatura(auth, jobId, frame.indice)
            urls.push(url)
            return { ...frame, url }
          }),
        )
        if (!cancelado) setFrames(conMiniatura)
      } catch (e) {
        if (!cancelado) setError(e.message)
      }
    }
    cargar()

    return () => {
      cancelado = true
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [auth, jobId])

  if (error) return <div className="det-error">{error}</div>
  if (!frames) return <p className="cap-meta">Cargando fotos…</p>

  return (
    <div className="lote-galeria">
      {frames.map((frame) => (
        <figure key={frame.indice}>
          <img src={frame.url} alt={`Foto ${frame.indice}`} loading="lazy" />
          <figcaption>
            #{frame.indice} · {(frame.bytes / 1024).toFixed(0)} KB
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function formatear(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

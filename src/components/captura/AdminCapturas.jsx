import { useEffect, useState } from 'react'
import { descargarCaptura, iniciarSesionAdmin, listarCapturas } from '../../api/captura'

const CLAVE_TOKEN = 'agrivision_admin_token'

export default function AdminCapturas({ ultimaDescargaGlobal }) {
  const [abierto, setAbierto] = useState(false)
  const [token, setToken] = useState(() => sessionStorage.getItem(CLAVE_TOKEN) || '')
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [capturas, setCapturas] = useState(null)
  const [descargando, setDescargando] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (abierto && token && capturas === null) cargar(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto, token])

  async function cargar(tok) {
    setCargando(true)
    setError(null)
    try {
      setCapturas(await listarCapturas(tok))
    } catch (e) {
      // El token guardado pudo quedar viejo (se regenera si se reinstala el buzón).
      sessionStorage.removeItem(CLAVE_TOKEN)
      setToken('')
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  async function entrar(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    try {
      const tok = await iniciarSesionAdmin(usuario, contrasena)
      sessionStorage.setItem(CLAVE_TOKEN, tok)
      setToken(tok)
      setContrasena('')
      await cargar(tok)
    } catch (e) {
      setError(e.message)
      setCargando(false)
    }
  }

  function salir() {
    sessionStorage.removeItem(CLAVE_TOKEN)
    setToken('')
    setCapturas(null)
    setUsuario('')
    setContrasena('')
  }

  async function bajar(captura) {
    setDescargando(captura.id)
    setError(null)
    try {
      await descargarCaptura(token, captura.id, captura.archivo)
    } catch (e) {
      setError(e.message)
    } finally {
      setDescargando(null)
    }
  }

  if (!abierto) {
    return (
      <button className="cap-admin-toggle" onClick={() => setAbierto(true)}>
        Acceso admin
      </button>
    )
  }

  return (
    <div className="cap-admin">
      <div className="cap-admin__header">
        <h2>Videos en el buzón</h2>
        {token && (
          <button className="cap-admin-toggle" onClick={salir}>
            Cerrar sesión
          </button>
        )}
      </div>

      {token && ultimaDescargaGlobal && (
        <p className="cap-meta">Última sincronización: {formatear(ultimaDescargaGlobal)}</p>
      )}

      {!token && (
        <form className="det-stack" onSubmit={entrar}>
          <label className="cap-campo">
            <span>Usuario</span>
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
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              autoComplete="current-password"
              disabled={cargando}
              required
            />
          </label>
          <button className="det-upload-btn" type="submit" disabled={cargando}>
            <span>{cargando ? 'Entrando…' : 'Entrar'}</span>
          </button>
        </form>
      )}

      {error && <div className="det-error">{error}</div>}

      {token && cargando && !capturas && <p className="cap-meta">Cargando…</p>}

      {token && capturas && capturas.length === 0 && (
        <p className="cap-meta">No hay videos pendientes en el buzón.</p>
      )}

      {token && capturas && capturas.length > 0 && (
        <ul className="cap-lista">
          {capturas.map((c) => (
            <li key={c.id} className="cap-fila">
              <div className="cap-fila__info">
                <strong>{c.finca || '?'}/{c.bloque || '?'}</strong>
                <span className="cap-meta">
                  {(c.bytes / 1024 ** 2).toFixed(0)} MB · subido {formatear(c.recibido_en)}
                  {c.descargado_en && ` · última descarga ${formatear(c.descargado_en)}`}
                </span>
              </div>
              <button
                className="cap-admin-toggle"
                onClick={() => bajar(c)}
                disabled={descargando === c.id}
              >
                {descargando === c.id ? 'Bajando…' : 'Descargar'}
              </button>
            </li>
          ))}
        </ul>
      )}
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

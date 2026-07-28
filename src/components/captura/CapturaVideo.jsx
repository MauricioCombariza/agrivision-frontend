import { useEffect, useRef, useState } from 'react'
import { cancelarSubida, subirVideo } from '../../api/captura'
import {
  clienteYaInstalado,
  descargarClienteLocal,
  marcarClienteInstalado,
} from '../../utils/clienteLocal'

const CLAVE_RECORDADOS = 'agrivision_captura_finca'

// El código va fijo en el despliegue para que la finca no tenga que escribirlo.
// Queda visible en el bundle: sirve para frenar bots y accesos casuales, no como
// autenticación. Lo que de verdad acota el daño es el tope duro de 6 GB del buzón.
const CODIGO = import.meta.env.VITE_CAPTURA_CODIGO ?? ''

// Alturas de montaje de captura_video_muestreo.md §7. A 2.00 m la cámara no alcanza a
// cubrir el ancho de la cama por 4 cm, por eso el recomendado es 2.10 m.
const ALTURAS = [
  { valor: 2.1, etiqueta: '2.10 m — recomendado' },
  { valor: 2.0, etiqueta: '2.00 m' },
  { valor: 3.5, etiqueta: '3.50 m — varias camas' },
]

const VACIO = {
  finca: '',
  bloque: '',
  variedad: '',
  cama: '',
  altura_montaje_m: 2.1,
  largo_cama_m: 30.7,
  notas: '',
}

export default function CapturaVideo() {
  const [datos, setDatos] = useState(VACIO)
  const [archivo, setArchivo] = useState(null)
  const [estado, setEstado] = useState('idle') // idle | subiendo | listo | error
  const [progreso, setProgreso] = useState(0)
  const [error, setError] = useState(null)
  const [enviado, setEnviado] = useState(null)
  // Un video de este tamaño no se sube bien por una red rural: hay que confirmar
  // explícitamente, cada vez, que de verdad no se pudo usar el programa de
  // escritorio antes de permitir la subida cruda. Se reinicia con cada archivo
  // nuevo para que no quede "marcado para siempre" tras la primera vez.
  const [confirmoSubidaCruda, setConfirmoSubidaCruda] = useState(false)
  // Solo oculta el panel de descarga para no insistirle a quien ya lo instaló;
  // no afecta la casilla de confirmación de arriba, esa sigue siendo obligatoria.
  const [clienteInstalado, setClienteInstalado] = useState(() => clienteYaInstalado())
  const entrada = useRef(null)

  // La finca sube muchos videos seguidos del mismo sitio: se recuerdan los campos
  // fijos para que solo tenga que cambiar el bloque y la cama.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_RECORDADOS)
      if (guardado) setDatos((d) => ({ ...d, ...JSON.parse(guardado) }))
    } catch {
      /* localStorage no disponible */
    }
  }, [])

  function fijar(campo, valor) {
    setDatos((d) => ({ ...d, [campo]: valor }))
  }

  function recordar(siguiente) {
    try {
      const { finca, variedad, altura_montaje_m, largo_cama_m } = siguiente
      localStorage.setItem(
        CLAVE_RECORDADOS,
        JSON.stringify({ finca, variedad, altura_montaje_m, largo_cama_m }),
      )
    } catch {
      /* localStorage no disponible */
    }
  }

  async function enviar() {
    if (!archivo) return
    setError(null)
    setEnviado(null)
    setProgreso(0)
    setEstado('subiendo')
    try {
      const recibido = await subirVideo(
        archivo,
        { ...datos, archivo: archivo.name, subido_en: new Date().toISOString() },
        CODIGO,
        setProgreso,
      )

      recordar(datos)
      setEnviado({ clave: recibido.id, bytes: recibido.bytes })
      setEstado('listo')
      setArchivo(null)
      setConfirmoSubidaCruda(false)
      if (entrada.current) entrada.current.value = ''
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }

  const ocupado = estado === 'subiendo'
  const completo =
    datos.finca.trim() && datos.bloque.trim() && archivo && CODIGO && confirmoSubidaCruda

  return (
    <div className="det-stack">
      <p className="det-hint">
        Graba la cama completa con la cámara cenital, caminando parejo de un extremo al
        otro. El video se envía al servidor de AgriVision, de donde se extraen después
        las fotos sin traslape para el conteo de flores.
      </p>

      {!clienteInstalado && (
        <div className="cap-aviso">
          <strong>Usa el programa de escritorio en vez de subir el video aquí.</strong>
          <p>
            Un video de este tamaño no se sube bien por una red rural: puede tardar 30
            minutos y colgarse a mitad de camino. El programa procesa el video en tu
            propio computador y sube solo las fotos ya extraídas (30-70× más liviano).
          </p>
          <button
            type="button"
            className="det-upload-btn"
            onClick={() => descargarClienteLocal()}
          >
            <span className="det-upload-btn__icon">💻</span>
            <span>Descargar programa (Windows)</span>
          </button>
          <p className="cap-aviso__nota">
            El navegador y Windows van a advertir porque el programa es nuevo — no es
            un virus, son las dos veces que hay que confirmar:
            <br />
            1. Al descargar: si el navegador dice algo como "Este tipo de archivo puede
            dañar tu dispositivo", elige <strong>"Descargar de todas formas"</strong>{' '}
            (o "Mantener").
            <br />
            2. Al abrir el archivo: si aparece "Windows protegió su PC", haz clic en{' '}
            <strong>"Más información"</strong> y luego en{' '}
            <strong>"Instalar de todas formas"</strong>.
          </p>
          <button
            type="button"
            className="cap-ya-instalado"
            onClick={() => {
              marcarClienteInstalado()
              setClienteInstalado(true)
            }}
          >
            Ya lo tengo instalado, no preguntar más
          </button>
        </div>
      )}

      <div className="cap-grid">
        <Campo etiqueta="Finca" requerido>
          <input
            value={datos.finca}
            disabled={ocupado}
            placeholder="Ej. Agrícola Tibar"
            onChange={(e) => fijar('finca', e.target.value)}
          />
        </Campo>
        <Campo etiqueta="Bloque" requerido>
          <input
            value={datos.bloque}
            disabled={ocupado}
            placeholder="Ej. B12"
            onChange={(e) => fijar('bloque', e.target.value)}
          />
        </Campo>
        <Campo etiqueta="Variedad">
          <input
            value={datos.variedad}
            disabled={ocupado}
            placeholder="Ej. Winterfell"
            onChange={(e) => fijar('variedad', e.target.value)}
          />
        </Campo>
        <Campo etiqueta="Cama">
          <input
            value={datos.cama}
            disabled={ocupado}
            placeholder="Ej. 4"
            onChange={(e) => fijar('cama', e.target.value)}
          />
        </Campo>
        <Campo etiqueta="Altura de la cámara">
          <select
            value={datos.altura_montaje_m}
            disabled={ocupado}
            onChange={(e) => fijar('altura_montaje_m', Number(e.target.value))}
          >
            {ALTURAS.map((a) => (
              <option key={a.valor} value={a.valor}>
                {a.etiqueta}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etiqueta="Largo de la cama (m)">
          <input
            type="number"
            step="0.1"
            value={datos.largo_cama_m}
            disabled={ocupado}
            onChange={(e) => fijar('largo_cama_m', Number(e.target.value))}
          />
        </Campo>
      </div>

      <Campo etiqueta="Notas (opcional)">
        <input
          value={datos.notas}
          disabled={ocupado}
          placeholder="Ej. cama con encharcamiento en el tramo final"
          onChange={(e) => fijar('notas', e.target.value)}
        />
      </Campo>

      <input
        ref={entrada}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          setArchivo(e.target.files?.[0] ?? null)
          setConfirmoSubidaCruda(false)
        }}
      />

      <button
        className="det-upload-btn"
        onClick={() => entrada.current?.click()}
        disabled={ocupado}
      >
        <span className="det-upload-btn__icon">🎥</span>
        <span>{archivo ? archivo.name : 'Seleccionar video de la cama'}</span>
      </button>

      {archivo && (
        <p className="cap-meta">
          {(archivo.size / 1024 ** 3).toFixed(2)} GB · se envía al servidor de AgriVision
        </p>
      )}

      {archivo && (
        <label className="cap-campo cap-confirmacion">
          <input
            type="checkbox"
            checked={confirmoSubidaCruda}
            disabled={ocupado}
            onChange={(e) => setConfirmoSubidaCruda(e.target.checked)}
          />
          <span>
            Ya intenté usar el programa de escritorio y aun así necesito subir el video
            completo por aquí.
          </span>
        </label>
      )}

      {ocupado && (
        <div className="det-progress">
          <div className="det-progress__header">
            <span className="det-progress__label">Subiendo video…</span>
            <span className="det-progress__pct">{Math.round(progreso * 100)}%</span>
          </div>
          <div className="det-progress__track">
            <div
              className="det-progress__bar"
              style={{ width: `${Math.round(progreso * 100)}%` }}
            />
          </div>
          <button className="cap-cancelar" onClick={cancelarSubida}>
            Cancelar
          </button>
        </div>
      )}

      {!CODIGO && (
        <div className="det-error">
          Este despliegue no tiene configurado el acceso al servidor
          (falta VITE_CAPTURA_CODIGO). Avisa a AgriVision.
        </div>
      )}

      {error && <div className="det-error">{error}</div>}

      {estado === 'listo' && enviado && (
        <div className="cap-ok">
          <strong>Video recibido</strong>
          <p>
            {(enviado.bytes / 1024 ** 3).toFixed(2)} GB subidos. Ya puedes grabar la
            siguiente cama: los datos de finca y variedad quedan guardados.
          </p>
          <code>{enviado.clave}</code>
        </div>
      )}

      <button className="det-upload-btn" onClick={enviar} disabled={!completo || ocupado}>
        <span className="det-upload-btn__icon">⬆️</span>
        <span>Enviar</span>
      </button>
    </div>
  )
}

function Campo({ etiqueta, requerido, children }) {
  return (
    <label className="cap-campo">
      <span>
        {etiqueta}
        {requerido && <em> *</em>}
      </span>
      {children}
    </label>
  )
}

import { useEffect, useRef, useState } from 'react'
import {
  cancelarSubida,
  extensionDe,
  pedirUrlDeSubida,
  subirArchivo,
  subirMetadatos,
} from '../../api/captura'

const CLAVE_RECORDADOS = 'agrivision_captura_finca'

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
  codigo: '',
}

export default function CapturaVideo() {
  const [datos, setDatos] = useState(VACIO)
  const [archivo, setArchivo] = useState(null)
  const [estado, setEstado] = useState('idle') // idle | firmando | subiendo | listo | error
  const [progreso, setProgreso] = useState(0)
  const [error, setError] = useState(null)
  const [enviado, setEnviado] = useState(null)
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
      const { finca, variedad, altura_montaje_m, largo_cama_m, codigo } = siguiente
      localStorage.setItem(
        CLAVE_RECORDADOS,
        JSON.stringify({ finca, variedad, altura_montaje_m, largo_cama_m, codigo }),
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
    setEstado('firmando')

    try {
      const extension = extensionDe(archivo.name)
      const firma = await pedirUrlDeSubida({
        finca: datos.finca,
        bloque: datos.bloque,
        extension,
        bytes: archivo.size,
        codigo: datos.codigo,
      })

      setEstado('subiendo')
      await subirArchivo(firma.url_video, archivo, setProgreso)

      await subirMetadatos(firma.url_meta, {
        ...datos,
        codigo: undefined, // el código de acceso no se guarda con la ficha
        clave: firma.clave,
        archivo: archivo.name,
        bytes: archivo.size,
        extension,
        subido_en: new Date().toISOString(),
        agente: navigator.userAgent,
      })

      recordar(datos)
      setEnviado({ clave: firma.clave, bytes: archivo.size })
      setEstado('listo')
      setArchivo(null)
      if (entrada.current) entrada.current.value = ''
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }

  const ocupado = estado === 'firmando' || estado === 'subiendo'
  const completo = datos.finca.trim() && datos.bloque.trim() && archivo

  return (
    <div className="det-stack">
      <p className="det-hint">
        Graba la cama completa con la cámara cenital, caminando parejo de un extremo al
        otro. El video se sube directo al almacenamiento — no se guarda en esta página —
        y de él se extraen después las fotos sin traslape para el conteo.
      </p>

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

      <Campo etiqueta="Código de acceso">
        <input
          type="password"
          value={datos.codigo}
          disabled={ocupado}
          placeholder="El que te compartió AgriVision"
          onChange={(e) => fijar('codigo', e.target.value)}
        />
      </Campo>

      <input
        ref={entrada}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
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
          {(archivo.size / 1024 ** 3).toFixed(2)} GB · se sube directo al almacenamiento
        </p>
      )}

      {ocupado && (
        <div className="det-progress">
          <div className="det-progress__header">
            <span className="det-progress__label">
              {estado === 'firmando' ? 'Preparando subida…' : 'Subiendo video…'}
            </span>
            <span className="det-progress__pct">{Math.round(progreso * 100)}%</span>
          </div>
          <div className="det-progress__track">
            <div
              className="det-progress__bar"
              style={{ width: `${Math.round(progreso * 100)}%` }}
            />
          </div>
          {estado === 'subiendo' && (
            <button className="cap-cancelar" onClick={cancelarSubida}>
              Cancelar
            </button>
          )}
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

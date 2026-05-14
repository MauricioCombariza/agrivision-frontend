import { useRef, useState } from 'react'
import { detectPhoto } from '../../api/detector'
import DetectionResults from './DetectionResults'

export default function CameraCapture({ accumulated, onAccumulate, onClear }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastAnnotated, setLastAnnotated] = useState(null)
  const [lastCount, setLastCount] = useState(0)

  async function handleCapture(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setLoading(true)
    setError(null)
    try {
      const res = await detectPhoto(file)
      setLastAnnotated(res.detections.length > 0 ? res.annotated_image : null)
      setLastCount(res.detections.length)
      onAccumulate(res.detections)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="det-stack">
      {/* Banner acumulado */}
      {accumulated.length > 0 && (
        <div className="det-banner">
          <div className="det-banner__title">Tags acumulados</div>
          <div className="det-banner__count">{accumulated.length}</div>
          <div className="det-banner__ids">
            [{accumulated.map(d => d.tag_id).sort((a, b) => a - b).join(' · ')}]
          </div>
        </div>
      )}

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleCapture}
      />

      {/* Botón de captura */}
      <button
        className="det-capture-btn"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        {loading
          ? <><div className="det-spinner" style={{ borderTopColor: '#0f2519' }} /><span className="det-capture-btn__label">Procesando…</span></>
          : <>
              <span className="det-capture-btn__icon">📷</span>
              <span className="det-capture-btn__label">Capturar foto</span>
              <span className="det-capture-btn__sublabel">Apunta al palet y presiona</span>
            </>
        }
      </button>

      {error && <div className="det-error">{error}</div>}

      {/* Última foto anotada */}
      {lastAnnotated && (
        <div className="det-annotated">
          <div className="det-annotated__label">
            Última captura — {lastCount} tag{lastCount !== 1 ? 's' : ''} detectado{lastCount !== 1 ? 's' : ''}
          </div>
          <img src={`data:image/jpeg;base64,${lastAnnotated}`} alt="Imagen anotada" />
        </div>
      )}

      {/* Resultados acumulados */}
      {accumulated.length > 0 && (
        <DetectionResults detections={accumulated} onClear={onClear} />
      )}
    </div>
  )
}

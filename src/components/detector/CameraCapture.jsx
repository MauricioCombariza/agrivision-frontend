import { useRef, useState } from 'react'
import { detectPhotoQuick, getPhotoJobStatus } from '../../api/detector'
import { compressImage, annotateImage } from '../../utils/imageUtils'
import DetectionResults from './DetectionResults'

export default function CameraCapture({ accumulated, onAccumulate, onClear, family = 'tagStandard52h13' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading]       = useState(false)
  const [analyzing, setAnalyzing]       = useState(0)   // jobs en background
  const [quickCount, setQuickCount]     = useState(null) // conteo rápido última foto
  const [lastAnnotated, setLastAnnotated] = useState(null)
  const [lastFinalCount, setLastFinalCount] = useState(null)
  const [error, setError]               = useState(null)
  const [expectedCount, setExpectedCount] = useState(null)
  const [caajasSinLeer, setCaajasSinLeer] = useState(null)
  const [lockedExpected, setLockedExpected] = useState(null)

  const effectiveExpected = lockedExpected ?? expectedCount

  function handleClear() {
    setExpectedCount(null)
    setCaajasSinLeer(null)
    setLockedExpected(null)
    onClear()
  }

  async function pollPhotoJob(jobId, blob) {
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 400))
      try {
        const res = await getPhotoJobStatus(jobId)
        if (res.status === 'done') {
          const dataUrl = await annotateImage(blob, res.detections)
          setLastAnnotated(dataUrl)
          setLastFinalCount(res.detections.length)
          onAccumulate(res.detections)
          setAnalyzing(n => n - 1)
          return
        }
        if (res.status === 'error') {
          setError(res.error ?? 'Error al procesar la foto')
          setAnalyzing(n => n - 1)
          return
        }
      } catch (_) { /* reintenta en el siguiente tick */ }
    }
    setError('Tiempo de espera agotado')
    setAnalyzing(n => n - 1)
  }

  async function handleCapture(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setUploading(true)
    setError(null)
    try {
      const blob = await compressImage(file)
      const { quick_count, job_id } = await detectPhotoQuick(blob, effectiveExpected, accumulated.length, family)
      setQuickCount(quick_count)
      setAnalyzing(n => n + 1)
      pollPhotoJob(job_id, blob) // no await — corre en background
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const analysisLabel = analyzing === 1
    ? 'Analizando 1 foto…'
    : analyzing > 1
      ? `Analizando ${analyzing} fotos…`
      : null

  return (
    <div className="det-stack">
      {/* Campo conteo esperado total */}
      <div className="det-expected-field">
        <span className="det-expected-field__label">¿Cuántas cajas hay? <em style={{ fontStyle: 'normal', opacity: 0.6 }}>(opcional)</em></span>
        <input
          type="number"
          min={1}
          value={expectedCount ?? ''}
          onChange={e => {
            const v = parseInt(e.target.value)
            setExpectedCount(isNaN(v) || v < 1 ? null : v)
            setCaajasSinLeer(null)
            setLockedExpected(null)
          }}
          placeholder="—"
          className="det-expected-field__input"
          disabled={lockedExpected != null}
        />
        <span className="det-expected-field__unit">cajas</span>
      </div>

      {/* Campo cajas sin leer */}
      <div className="det-expected-field">
        <span className="det-expected-field__label">Cajas sin leer <em style={{ fontStyle: 'normal', opacity: 0.6 }}>(opcional)</em></span>
        <input
          type="number"
          min={0}
          value={caajasSinLeer ?? ''}
          onChange={e => {
            const v = parseInt(e.target.value)
            const val = isNaN(v) || v < 0 ? null : v
            setCaajasSinLeer(val)
            setLockedExpected(val != null ? accumulated.length + val : null)
            if (val != null) setExpectedCount(null)
          }}
          placeholder="—"
          className="det-expected-field__input"
          disabled={expectedCount != null}
        />
        <span className="det-expected-field__unit">cajas</span>
      </div>

      {accumulated.length > 0 && (
        <div className="det-banner">
          <div className="det-banner__title">Tags acumulados</div>
          <div className="det-banner__count">{accumulated.length}</div>
          <div className="det-banner__ids">
            [{accumulated.map(d => d.tag_id).sort((a, b) => a - b).join(' · ')}]
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleCapture}
      />

      <button
        className="det-capture-btn"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading
          ? <><div className="det-spinner" style={{ borderTopColor: '#0f2519' }} /><span className="det-capture-btn__label">Subiendo…</span></>
          : <>
              <span className="det-capture-btn__icon">📷</span>
              <span className="det-capture-btn__label">Capturar foto</span>
              <span className="det-capture-btn__sublabel">
                {analysisLabel ?? 'Apunta al palet y presiona'}
              </span>
            </>
        }
      </button>

      {error && <div className="det-error">{error}</div>}

      {quickCount !== null && (
        <div className={`det-quick-status ${analyzing > 0 ? 'det-quick-status--analyzing' : 'det-quick-status--done'}`}>
          {analyzing > 0
            ? <>
                <div className="det-spinner det-spinner--sm" />
                <span>~{quickCount} tags detectados — analizando en detalle…</span>
              </>
            : lastFinalCount !== null
              ? <span>✓ {lastFinalCount} tags confirmados</span>
              : null
          }
        </div>
      )}

      {lastAnnotated && (
        <div className="det-annotated">
          <div className="det-annotated__label">
            Última captura — {lastFinalCount} tag{lastFinalCount !== 1 ? 's' : ''} detectado{lastFinalCount !== 1 ? 's' : ''}
          </div>
          <img src={lastAnnotated} alt="Imagen anotada" />
        </div>
      )}

      {accumulated.length > 0 && (
        <DetectionResults detections={accumulated} expectedCount={effectiveExpected} onClear={handleClear} />
      )}
    </div>
  )
}

import { useRef, useState } from 'react'
import { startVideoDetection, getVideoStatus } from '../../api/detector'
import DetectionResults from './DetectionResults'

export default function VideoUpload() {
  const inputRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [detections, setDetections] = useState([])
  const [previewImage, setPreviewImage] = useState(null) // verde claro — primer frame del video
  const [error, setError] = useState(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setStatus('uploading')
    setError(null)
    setDetections([])
    setPreviewImage(null)
    setProgress(0)
    try {
      const { job_id, preview_image } = await startVideoDetection(file)
      if (preview_image) setPreviewImage(`data:image/jpeg;base64,${preview_image}`)
      setStatus('processing')
      await pollJob(job_id)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  function pollJob(jobId) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const res = await getVideoStatus(jobId)
          setProgress(res.progress)
          if (res.status === 'done') {
            clearInterval(interval)
            setDetections(res.detections ?? [])
            setStatus('done')
            resolve()
          } else if (res.status === 'error') {
            clearInterval(interval)
            setStatus('error')
            setError(res.error ?? 'Error en el procesamiento')
            reject(new Error(res.error))
          }
        } catch (err) {
          clearInterval(interval)
          setStatus('error')
          setError(err.message)
          reject(err)
        }
      }, 500)
    })
  }

  const busy = status === 'uploading' || status === 'processing'

  return (
    <div className="det-stack">
      <p className="det-hint">
        Graba un video de 5–10 segundos barriendo el palet lentamente. Cada frame se analiza con 5 variantes de preprocesado.
      </p>

      <input ref={inputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFile} />

      <button className="det-upload-btn" onClick={() => inputRef.current?.click()} disabled={busy}>
        {busy
          ? <><div className="det-spinner" /><span>Procesando…</span></>
          : <><span className="det-upload-btn__icon">🎬</span><span>Seleccionar video</span></>
        }
      </button>

      {busy && (
        <div className="det-progress">
          <div className="det-progress__header">
            <span className="det-progress__label">
              {status === 'uploading' ? 'Subiendo archivo…' : 'Analizando frames…'}
            </span>
            <span className="det-progress__pct">{Math.round(progress * 100)}%</span>
          </div>
          <div className="det-progress__track">
            <div className="det-progress__bar" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </div>
      )}

      {error && <div className="det-error">{error}</div>}

      {previewImage && status !== 'done' && (
        <div className="det-annotated">
          <div className="det-annotated__label">Vista previa — tags detectados en verde claro</div>
          <img src={previewImage} alt="Vista previa del video" />
        </div>
      )}

      {status === 'done' && (
        <DetectionResults
          detections={detections}
          onClear={() => { setStatus('idle'); setDetections([]) }}
        />
      )}
    </div>
  )
}

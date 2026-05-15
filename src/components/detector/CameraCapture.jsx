import { useRef, useState, useEffect, useCallback } from 'react'
import { detectPhotoQuick, getPhotoJobStatus, detectLivePreview } from '../../api/detector'
import { annotateImage } from '../../utils/imageUtils'
import DetectionResults from './DetectionResults'

const POLL_INTERVAL = 350   // ms entre frames enviados al servidor
const POLL_SIZE     = 640   // px lado mayor del frame comprimido para polling
const SNAP_SIZE     = 1600  // px lado mayor de la foto final

export default function CameraCapture({ accumulated, onAccumulate, onClear }) {
  const videoRef      = useRef(null)
  const overlayRef    = useRef(null)
  const pollCanvasRef = useRef(document.createElement('canvas'))
  const pollRef       = useRef(null)

  const [stream,         setStream]         = useState(null)
  const [liveCount,      setLiveCount]      = useState(0)
  const [uploading,      setUploading]      = useState(false)
  const [analyzing,      setAnalyzing]      = useState(0)
  const [quickCount,     setQuickCount]     = useState(null)
  const [previewImage,   setPreviewImage]   = useState(null)
  const [lastAnnotated,  setLastAnnotated]  = useState(null)
  const [lastFinalCount, setLastFinalCount] = useState(null)
  const [error,          setError]          = useState(null)
  const [camError,       setCamError]       = useState(null)

  // ── Overlay ────────────────────────────────────────────────────────────────

  const drawOverlay = useCallback((detections, vw, vh, pw, ph) => {
    const canvas = overlayRef.current
    if (!canvas) return
    canvas.width  = vw
    canvas.height = vh
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, vw, vh)
    if (!detections.length) return

    const sx = vw / pw
    const sy = vh / ph
    const lw = Math.max(2, Math.round(vw / 300))
    const fs = Math.max(14, Math.round(vw / 60))
    ctx.strokeStyle = '#90EE90'
    ctx.lineWidth   = lw
    ctx.font        = `bold ${fs}px monospace`

    for (const d of detections) {
      const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = d.corners
      ctx.beginPath()
      ctx.moveTo(x0 * sx, y0 * sy)
      ctx.lineTo(x1 * sx, y1 * sy)
      ctx.lineTo(x2 * sx, y2 * sy)
      ctx.lineTo(x3 * sx, y3 * sy)
      ctx.closePath()
      ctx.stroke()

      const cx  = (x0 + x1 + x2 + x3) / 4 * sx
      const cy  = (y0 + y1 + y2 + y3) / 4 * sy - 10
      const lbl = `ID ${d.tag_id}`
      const tw  = ctx.measureText(lbl).width
      ctx.fillStyle = 'rgba(0,0,0,0.72)'
      ctx.fillRect(cx - 4, cy - fs - 2, tw + 8, fs + 6)
      ctx.fillStyle = '#90EE90'
      ctx.fillText(lbl, cx, cy)
    }
  }, [])

  // ── Polling ────────────────────────────────────────────────────────────────

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
    setLiveCount(0)
    const canvas = overlayRef.current
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startPolling = useCallback(() => {
    if (pollRef.current) return
    pollRef.current = setInterval(async () => {
      const video = videoRef.current
      if (!video || video.readyState < 2) return
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return

      const ratio = POLL_SIZE / Math.max(vw, vh)
      const pw = Math.round(vw * ratio)
      const ph = Math.round(vh * ratio)
      const pc = pollCanvasRef.current
      pc.width  = pw
      pc.height = ph
      pc.getContext('2d').drawImage(video, 0, 0, pw, ph)

      const blob = await new Promise(r => pc.toBlob(r, 'image/jpeg', 0.7))
      try {
        const { detections } = await detectLivePreview(blob)
        setLiveCount(detections.length)
        drawOverlay(detections, vw, vh, pw, ph)
      } catch (_) {}
    }, POLL_INTERVAL)
  }, [drawOverlay])

  // ── Configurar video DESPUÉS del render (cuando videoRef.current existe) ──
  // El <video> está siempre en el DOM (display:none cuando no hay stream),
  // así que videoRef.current ya existe cuando stream cambia de null → MediaStream.

  useEffect(() => {
    const video = videoRef.current
    if (!stream || !video) return

    video.srcObject = stream

    const handleCanPlay = () => startPolling()
    video.addEventListener('canplay', handleCanPlay)
    video.play().catch(() => {}) // iOS requiere play() explícito aunque tenga autoPlay

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      stopPolling()
      video.srcObject = null
    }
  }, [stream, startPolling, stopPolling])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      stopPolling()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stream?.getTracks().forEach(t => t.stop())
    }
  }, []) // intencionalmente vacío — solo al desmontar

  // ── Cámara ─────────────────────────────────────────────────────────────────

  async function activateCamera() {
    setCamError(null)
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })
      setStream(s) // useEffect([stream]) asigna srcObject y llama play() tras el render
    } catch (err) {
      setCamError('No se pudo acceder a la cámara: ' + err.message)
    }
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null) }
  }

  // ── Captura ────────────────────────────────────────────────────────────────

  async function handleCapture() {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const vw = video.videoWidth, vh = video.videoHeight
    const ratio = Math.min(SNAP_SIZE / vw, SNAP_SIZE / vh, 1)
    const snapCanvas = document.createElement('canvas')
    snapCanvas.width  = Math.round(vw * ratio)
    snapCanvas.height = Math.round(vh * ratio)
    snapCanvas.getContext('2d').drawImage(video, 0, 0, snapCanvas.width, snapCanvas.height)
    const blob = await new Promise(r => snapCanvas.toBlob(r, 'image/jpeg', 0.88))

    setUploading(true)
    setError(null)
    setPreviewImage(null)
    setLastAnnotated(null)
    try {
      const { quick_count, preview_image, job_id } = await detectPhotoQuick(blob, 25, accumulated.length)
      setQuickCount(quick_count)
      if (preview_image) setPreviewImage(`data:image/jpeg;base64,${preview_image}`)
      setAnalyzing(n => n + 1)
      pollPhotoJob(job_id, blob)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function pollPhotoJob(jobId, blob) {
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 400))
      try {
        const res = await getPhotoJobStatus(jobId)
        if (res.status === 'done') {
          const dataUrl = await annotateImage(blob, res.detections)
          setPreviewImage(null)
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
      } catch (_) {}
    }
    setError('Tiempo de espera agotado')
    setAnalyzing(n => n - 1)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const analysisLabel = analyzing === 1
    ? 'Analizando 1 foto…'
    : analyzing > 1 ? `Analizando ${analyzing} fotos…` : null

  return (
    <div className="det-stack">
      {accumulated.length > 0 && (
        <div className="det-banner">
          <div className="det-banner__title">Tags acumulados</div>
          <div className="det-banner__count">{accumulated.length}</div>
          <div className="det-banner__ids">
            [{accumulated.map(d => d.tag_id).sort((a, b) => a - b).join(' · ')}]
          </div>
        </div>
      )}

      {/* Viewport: siempre en DOM para que videoRef esté disponible antes de stream */}
      <div style={{
        position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden',
        background: '#000', display: stream ? 'block' : 'none',
      }}>
        <video
          ref={videoRef}
          autoPlay playsInline muted
          style={{ width: '100%', display: 'block' }}
        />
        <canvas
          ref={overlayRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          background: 'rgba(0,0,0,0.6)', color: '#90EE90',
          padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 600,
        }}>
          🟢 {liveCount} tag{liveCount !== 1 ? 's' : ''} detectado{liveCount !== 1 ? 's' : ''}
        </div>
      </div>

      {!stream ? (
        <button className="det-capture-btn" onClick={activateCamera}>
          <span className="det-capture-btn__icon">📷</span>
          <span className="det-capture-btn__label">Activar cámara</span>
          <span className="det-capture-btn__sublabel">Vista previa en vivo con detección</span>
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="det-capture-btn"
            style={{ flex: 3 }}
            onClick={handleCapture}
            disabled={uploading}
          >
            {uploading
              ? <><div className="det-spinner" style={{ borderTopColor: '#0f2519' }} /><span className="det-capture-btn__label">Subiendo…</span></>
              : <>
                  <span className="det-capture-btn__icon">📸</span>
                  <span className="det-capture-btn__label">Capturar</span>
                  <span className="det-capture-btn__sublabel">{analysisLabel ?? 'Cuando veas todos los tags en verde'}</span>
                </>
            }
          </button>
          <button className="det-upload-btn" style={{ flex: 1, minWidth: 0 }} onClick={stopCamera}>
            ⏹
          </button>
        </div>
      )}

      {camError && <div className="det-error">{camError}</div>}
      {error    && <div className="det-error">{error}</div>}

      {quickCount !== null && (
        <div className={`det-quick-status ${analyzing > 0 ? 'det-quick-status--analyzing' : 'det-quick-status--done'}`}>
          {analyzing > 0
            ? <><div className="det-spinner det-spinner--sm" /><span>~{quickCount} tags detectados — analizando en detalle…</span></>
            : lastFinalCount !== null
              ? <span>✓ {lastFinalCount} tags confirmados</span>
              : null
          }
        </div>
      )}

      {previewImage && !lastAnnotated && (
        <div className="det-annotated">
          <div className="det-annotated__label">
            Vista previa — {quickCount} tag{quickCount !== 1 ? 's' : ''} detectado{quickCount !== 1 ? 's' : ''} · analizando en detalle…
          </div>
          <img src={previewImage} alt="Vista previa con bounding boxes" />
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
        <DetectionResults detections={accumulated} onClear={onClear} />
      )}
    </div>
  )
}

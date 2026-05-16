import { useRef, useState } from 'react'
import { detectPhoto } from '../../api/detector'
import { compressImage, annotateImage } from '../../utils/imageUtils'
import DetectionResults from './DetectionResults'

export default function PhotoUpload() {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [accumulated, setAccumulated] = useState([])

  async function handleFiles(e) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''
    setLoading(true)
    setResults([])
    setAccumulated([])
    const photoResults = []
    const accMap = new Map()
    for (const file of files) {
      try {
        const compressed = await compressImage(file)
        const res = await detectPhoto(compressed, 25, accMap.size)
        const annotatedUrl = await annotateImage(compressed, res.detections)
        photoResults.push({ name: file.name, detections: res.detections, annotatedUrl })
        for (const d of res.detections) {
          const ex = accMap.get(d.tag_id)
          if (!ex || d.confidence > ex.confidence) accMap.set(d.tag_id, d)
        }
      } catch (err) {
        photoResults.push({ name: file.name, detections: [], annotatedUrl: null, error: err.message })
      }
      setResults([...photoResults])
    }
    setAccumulated(Array.from(accMap.values()))
    setLoading(false)
  }

  return (
    <div className="det-stack">
      <p className="det-hint">
        Sube varias fotos desde distintos ángulos. Cada imagen se procesa con 7 variantes y tiling 2×2.
      </p>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />

      <button className="det-upload-btn" onClick={() => inputRef.current?.click()} disabled={loading}>
        {loading
          ? <><div className="det-spinner" /><span>Procesando…</span></>
          : <><span className="det-upload-btn__icon">🖼️</span><span>Seleccionar fotos</span></>
        }
      </button>

      {results.map((r, i) => (
        <div key={i} className="det-photo-card">
          <div className="det-photo-card__header">
            <span className="det-photo-card__name">{r.name}</span>
            <span className="det-photo-card__count">
              {r.error ? '⚠ error' : `${r.detections.length} tags`}
            </span>
          </div>
          <div className="det-photo-card__body">
            {r.error
              ? <p style={{ color: '#f87171', fontSize: '0.82rem' }}>{r.error}</p>
              : <>
                  {r.annotatedUrl && (
                    <img src={r.annotatedUrl} alt={`Anotada ${r.name}`} style={{ borderRadius: 8 }} />
                  )}
                  {r.detections.length > 0
                    ? <p className="det-photo-card__ids">
                        IDs: [{r.detections.map(d => d.tag_id).sort((a, b) => a - b).join(', ')}]
                      </p>
                    : <p style={{ fontSize: '0.78rem', color: 'var(--mist)', marginTop: '0.4rem' }}>
                        No se detectaron tags
                      </p>
                  }
                </>
            }
          </div>
        </div>
      ))}

      {accumulated.length > 0 && (
        <>
          <hr className="det-divider" />
          <p className="det-section-title">Resumen acumulado</p>
          <DetectionResults
            detections={accumulated}
            onClear={() => { setResults([]); setAccumulated([]) }}
          />
        </>
      )}
    </div>
  )
}

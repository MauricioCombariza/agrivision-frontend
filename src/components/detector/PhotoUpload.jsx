import { useRef, useState } from 'react'
import { detectPhoto } from '../../api/detector'
import { compressImage, annotateImage } from '../../utils/imageUtils'
import DetectionResults from './DetectionResults'

export default function PhotoUpload({ family = 'tagStandard52h13' }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [accumulated, setAccumulated] = useState([])
  const [expectedCount, setExpectedCount] = useState(null)
  const [caajasSinLeer, setCaajasSinLeer] = useState(null)
  const [lockedExpected, setLockedExpected] = useState(null)
  const [newInBatch, setNewInBatch] = useState(null)

  const effectiveExpected = lockedExpected ?? expectedCount

  function handleNewSession() {
    setResults([])
    setAccumulated([])
    setNewInBatch(null)
    setCaajasSinLeer(null)
    setLockedExpected(null)
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''
    setLoading(true)
    setNewInBatch(null)

    // Snapshot del acumulado actual para calcular nuevos en este lote
    const prevAccMap = new Map(accumulated.map(d => [d.tag_id, d]))
    const accMap = new Map(prevAccMap)

    for (const file of files) {
      const sizeBeforeFile = accMap.size
      let result
      try {
        const compressed = await compressImage(file)
        const res = await detectPhoto(compressed, effectiveExpected, accMap.size, family)
        const annotatedUrl = await annotateImage(compressed, res.detections)
        for (const d of res.detections) {
          const ex = accMap.get(d.tag_id)
          if (!ex || d.confidence > ex.confidence) accMap.set(d.tag_id, d)
        }
        result = {
          name: file.name,
          detections: res.detections,
          annotatedUrl,
          newCount: accMap.size - sizeBeforeFile,
        }
      } catch (err) {
        result = { name: file.name, detections: [], annotatedUrl: null, newCount: 0, error: err.message }
      }
      setResults(prev => [...prev, result])
      setAccumulated(Array.from(accMap.values()))
    }

    setNewInBatch(accMap.size - prevAccMap.size)
    setLoading(false)
  }

  const hasResults = accumulated.length > 0

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

      <p className="det-hint">
        Sube varias fotos desde distintos ángulos. Cada imagen se procesa con 7 variantes y tiling 2×2.
      </p>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          className="det-upload-btn"
          style={{ flex: 1 }}
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {loading
            ? <><div className="det-spinner" /><span>Procesando…</span></>
            : <><span className="det-upload-btn__icon">🖼️</span><span>{hasResults ? 'Agregar más fotos' : 'Seleccionar fotos'}</span></>
          }
        </button>
        {hasResults && !loading && (
          <button className="det-btn-session" onClick={handleNewSession}>
            Nueva sesión
          </button>
        )}
      </div>

      {/* Banner de convergencia (solo sin effectiveExpected) */}
      {newInBatch !== null && !effectiveExpected && hasResults && (
        <div className="det-convergence-banner">
          {newInBatch === 0
            ? 'Sin tags nuevos en la última carga — posiblemente completo'
            : `+${newInBatch} tag${newInBatch !== 1 ? 's' : ''} nuevos en esta carga`}
        </div>
      )}

      {results.map((r, i) => (
        <div key={i} className="det-photo-card">
          <div className="det-photo-card__header">
            <span className="det-photo-card__name">{r.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {r.newCount > 0 && <span className="det-new-count">+{r.newCount} nuevos</span>}
              <span className="det-photo-card__count">
                {r.error ? '⚠ error' : `${r.detections.length} tags`}
              </span>
            </div>
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

      {hasResults && (
        <>
          <hr className="det-divider" />
          <p className="det-section-title">Resumen acumulado</p>
          <DetectionResults
            detections={accumulated}
            expectedCount={effectiveExpected}
            onClear={handleNewSession}
          />
        </>
      )}
    </div>
  )
}

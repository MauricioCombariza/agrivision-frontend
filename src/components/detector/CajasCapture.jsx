import { useRef, useState } from 'react'
import { detectCajasPhoto } from '../../api/detector'

const MAX_PHOTOS = 4

function subtotal(p) {
  return Math.max(0, p.detected + p.to_add - p.to_subtract)
}

export default function CajasCapture() {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const inputRef = useRef(null)

  async function handleCapture(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setError(null)
    setLoading(true)
    try {
      const res = await detectCajasPhoto(file)
      setPhotos(prev => [...prev, {
        id: crypto.randomUUID(),
        annotated_image: res.annotated_image,
        detected: res.detected_lateral,
        pallet_detected: res.pallet_detected,
        to_add: 0,
        to_subtract: 0,
      }])
    } catch (err) {
      setError(err.message ?? 'Error al procesar la foto')
    } finally {
      setLoading(false)
    }
  }

  function update(id, field, value) {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  function remove(id) {
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const total = photos.reduce((acc, p) => acc + subtotal(p), 0)
  const canCapture = photos.length < MAX_PHOTOS && !loading

  return (
    <div className="det-stack">
      {/* Botón captura */}
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
        disabled={!canCapture}
      >
        {loading ? (
          <>
            <div className="det-spinner" style={{ borderTopColor: '#0f2519' }} />
            <span className="det-capture-btn__label">Procesando…</span>
          </>
        ) : photos.length >= MAX_PHOTOS ? (
          <>
            <span className="det-capture-btn__icon">📦</span>
            <span className="det-capture-btn__label">Máximo 4 fotos</span>
          </>
        ) : (
          <>
            <span className="det-capture-btn__icon">📦</span>
            <span className="det-capture-btn__label">Capturar foto {photos.length + 1}/{MAX_PHOTOS}</span>
            <span className="det-capture-btn__sublabel">Apunta al lateral del palet</span>
          </>
        )}
      </button>

      {error && <div className="det-error">{error}</div>}

      {/* Tarjeta por foto */}
      {photos.map((photo, i) => {
        const sub = subtotal(photo)
        return (
          <div key={photo.id} className="cajas-card">
            <div className="cajas-card__header">
              <span className="cajas-card__title">Foto {i + 1}</span>
              <div className="cajas-card__badges">
                {!photo.pallet_detected && (
                  <span className="cajas-badge cajas-badge--warn">Sin pallet</span>
                )}
                <span className="cajas-badge cajas-badge--blue">{photo.detected} detectadas</span>
                <button className="cajas-card__remove" onClick={() => remove(photo.id)} aria-label="Eliminar">×</button>
              </div>
            </div>

            <div className="det-annotated" style={{ borderRadius: 0, border: 'none' }}>
              <img
                src={`data:image/jpeg;base64,${photo.annotated_image}`}
                alt={`Foto ${i + 1}`}
                style={{ maxHeight: '240px', objectFit: 'contain', width: '100%', display: 'block' }}
              />
            </div>

            <div className="cajas-card__controls">
              <div className="cajas-adj">
                <span className="cajas-adj__label">+ Cajas a sumar</span>
                <div className="cajas-stepper cajas-stepper--green">
                  <button className="cajas-stepper__btn" onClick={() => update(photo.id, 'to_add', Math.max(0, photo.to_add - 1))}>−</button>
                  <span className="cajas-stepper__val">{photo.to_add}</span>
                  <button className="cajas-stepper__btn" onClick={() => update(photo.id, 'to_add', photo.to_add + 1)}>+</button>
                </div>
              </div>
              <div className="cajas-adj">
                <span className="cajas-adj__label">− Cajas a descontar</span>
                <div className="cajas-stepper cajas-stepper--red">
                  <button className="cajas-stepper__btn" onClick={() => update(photo.id, 'to_subtract', Math.max(0, photo.to_subtract - 1))}>−</button>
                  <span className="cajas-stepper__val">{photo.to_subtract}</span>
                  <button className="cajas-stepper__btn" onClick={() => update(photo.id, 'to_subtract', photo.to_subtract + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="cajas-card__subtotal">
              <span>Subtotal foto {i + 1}</span>
              <span className="cajas-card__subtotal-val">{sub}</span>
            </div>
          </div>
        )
      })}

      {/* Resumen total */}
      {photos.length > 0 && (
        <div className="cajas-summary">
          <div className="cajas-summary__header">Resumen del palet</div>
          <table className="cajas-summary__table">
            <thead>
              <tr>
                <th>Foto</th><th>Det.</th><th className="cajas-col-green">+</th><th className="cajas-col-red">−</th><th>Sub.</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td style={{ color: 'var(--amber-400)', fontWeight: 600 }}>{p.detected}</td>
                  <td className="cajas-col-green">{p.to_add > 0 ? `+${p.to_add}` : '—'}</td>
                  <td className="cajas-col-red">{p.to_subtract > 0 ? `−${p.to_subtract}` : '—'}</td>
                  <td style={{ fontWeight: 600 }}>{subtotal(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cajas-summary__total">
            <span>Total cajas del palet</span>
            <span className="cajas-summary__total-val">{total}</span>
          </div>
          <button
            className="cajas-reset-btn"
            onClick={() => { setPhotos([]); setError(null) }}
          >
            Nuevo palet
          </button>
        </div>
      )}
    </div>
  )
}

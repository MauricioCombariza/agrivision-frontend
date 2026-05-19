function badgeClass(confidence) {
  if (confidence >= 4) return 'det-badge det-badge--high'
  if (confidence >= 2) return 'det-badge det-badge--mid'
  return 'det-badge det-badge--low'
}

function downloadCSV(detections) {
  const rows = [['ID Tag', 'Confianza'], ...detections.map(d => [d.tag_id, d.label])]
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `apriltags_${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function DetectionResults({ detections, expectedCount, onClear }) {
  if (!detections.length) return null

  const sorted = detections.slice().sort((a, b) => a.tag_id - b.tag_id)
  const ids = sorted.map(d => d.tag_id)
  const lowConf = detections.filter(d => d.confidence < 2)

  const hasExpected = expectedCount != null && expectedCount > 0
  const isComplete = hasExpected && detections.length >= expectedCount
  const missing = hasExpected ? expectedCount - detections.length : 0

  return (
    <div className="det-results">
      {/* Banner X/N o resumen estándar */}
      {hasExpected ? (
        <div className={`det-status-banner ${isComplete ? 'det-status-banner--complete' : 'det-status-banner--incomplete'}`}>
          {isComplete ? '✅' : '⚠️'} {detections.length}/{expectedCount}
          {' — '}
          {isComplete ? 'Todas las etiquetas leídas' : `Faltan ${missing} etiqueta${missing !== 1 ? 's' : ''}`}
          <div style={{ fontSize: '0.75rem', fontWeight: 400, marginTop: '0.25rem', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>
            [{ids.join(' · ')}]
          </div>
        </div>
      ) : (
        <div className="det-results__summary">
          <div className="det-results__big">{detections.length}</div>
          <div className="det-results__meta">
            <div className="det-results__meta-title">
              Tag{detections.length !== 1 ? 's' : ''} detectado{detections.length !== 1 ? 's' : ''}
            </div>
            <div className="det-results__meta-ids">[{ids.join(' · ')}]</div>
          </div>
        </div>
      )}

      {/* Alerta baja confianza */}
      {lowConf.length > 0 && (
        <div className="det-low-conf-warning">
          🔴 {lowConf.length} tag{lowConf.length !== 1 ? 's' : ''} con baja confianza
          {' '}(IDs: {lowConf.map(d => d.tag_id).sort((a, b) => a - b).join(', ')})
          {' — '}considera tomar más fotos de esas áreas
        </div>
      )}

      {/* Tabla */}
      <div className="det-table-wrap">
        <table className="det-table">
          <thead>
            <tr>
              <th>ID Tag</th>
              <th>Confianza</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(d => (
              <tr key={d.tag_id}>
                <td className="det-table__id">{d.tag_id}</td>
                <td><span className={badgeClass(d.confidence)}>{d.label}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Acciones */}
      <div className="det-actions">
        <button className="det-btn-primary" onClick={() => downloadCSV(detections)}>
          ⬇ Descargar CSV
        </button>
        {onClear && (
          <button className="det-btn-ghost" onClick={onClear}>Limpiar</button>
        )}
      </div>
    </div>
  )
}

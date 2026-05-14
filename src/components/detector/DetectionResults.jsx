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

export default function DetectionResults({ detections, onClear }) {
  if (!detections.length) return null
  const sorted = detections.slice().sort((a, b) => a.tag_id - b.tag_id)
  const ids = sorted.map(d => d.tag_id)

  return (
    <div className="det-results">
      {/* Resumen */}
      <div className="det-results__summary">
        <div className="det-results__big">{detections.length}</div>
        <div className="det-results__meta">
          <div className="det-results__meta-title">
            Tag{detections.length !== 1 ? 's' : ''} detectado{detections.length !== 1 ? 's' : ''}
          </div>
          <div className="det-results__meta-ids">[{ids.join(' · ')}]</div>
        </div>
      </div>

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

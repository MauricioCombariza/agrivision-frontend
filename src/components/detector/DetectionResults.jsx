function confidenceBadge(confidence) {
  if (confidence >= 4) return 'bg-green-100 text-green-800 border-green-200'
  if (confidence >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-red-100 text-red-800 border-red-200'
}

function downloadCSV(detections) {
  const rows = [['ID Tag', 'Confianza'], ...detections.map(d => [d.tag_id, d.label])]
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `apriltags_${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function DetectionResults({ detections, onClear }) {
  if (!detections.length) return null
  const ids = detections.map(d => d.tag_id).sort((a, b) => a - b)

  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3">
        <p className="text-sm font-semibold text-green-800">
          {detections.length} tag{detections.length !== 1 ? 's' : ''} detectado{detections.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-green-700 mt-0.5 font-mono break-all">[{ids.join(', ')}]</p>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2.5 text-left font-semibold text-gray-600">ID Tag</th>
              <th className="px-4 py-2.5 text-left font-semibold text-gray-600">Confianza</th>
            </tr>
          </thead>
          <tbody>
            {detections.slice().sort((a, b) => a.tag_id - b.tag_id).map(d => (
              <tr key={d.tag_id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2.5 font-mono font-semibold text-gray-800">{d.tag_id}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${confidenceBadge(d.confidence)}`}>
                    {d.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => downloadCSV(detections)}
          className="flex-1 h-12 rounded-xl bg-blue-600 text-white font-semibold text-sm active:bg-blue-700 transition-colors"
        >
          Descargar CSV
        </button>
        {onClear && (
          <button
            onClick={onClear}
            className="h-12 px-4 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm active:bg-gray-200 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}

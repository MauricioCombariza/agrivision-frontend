import { useRef, useState } from 'react'
import { detectPhoto } from '../../api/detector'
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
        const res = await detectPhoto(file)
        photoResults.push({ name: file.name, detections: res.detections, annotated_image: res.annotated_image })
        for (const d of res.detections) {
          const ex = accMap.get(d.tag_id)
          if (!ex || d.confidence > ex.confidence) accMap.set(d.tag_id, d)
        }
      } catch (err) {
        photoResults.push({ name: file.name, detections: [], annotated_image: '', error: err.message })
      }
      setResults([...photoResults])
    }

    setAccumulated(Array.from(accMap.values()))
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Sube varias fotos desde distintos ángulos. Cada imagen se procesa con 7 variantes y tiling 2×2.
      </p>

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="w-full h-16 rounded-2xl bg-orange-500 text-white text-lg font-bold flex items-center justify-center gap-3 active:bg-orange-600 disabled:opacity-60 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        {loading ? 'Procesando fotos…' : 'Seleccionar fotos'}
      </button>

      {results.map((r, i) => (
        <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">{r.name}</span>
            <span className="text-xs text-gray-500">{r.detections.length} tags</span>
          </div>
          {r.error ? (
            <div className="px-4 py-3 text-sm text-red-600">{r.error}</div>
          ) : (
            <div className="p-3 space-y-2">
              {r.annotated_image && (
                <img src={`data:image/jpeg;base64,${r.annotated_image}`} alt={`Anotada ${r.name}`} className="w-full rounded-lg" />
              )}
              {r.detections.length > 0 ? (
                <p className="text-xs font-mono text-gray-600">
                  IDs: [{r.detections.map(d => d.tag_id).sort((a, b) => a - b).join(', ')}]
                </p>
              ) : (
                <p className="text-xs text-gray-400">No se detectaron tags</p>
              )}
            </div>
          )}
        </div>
      ))}

      {accumulated.length > 0 && (
        <>
          <hr className="border-gray-200" />
          <h3 className="text-sm font-semibold text-gray-700">Resumen acumulado</h3>
          <DetectionResults
            detections={accumulated}
            onClear={() => { setResults([]); setAccumulated([]) }}
          />
        </>
      )}
    </div>
  )
}

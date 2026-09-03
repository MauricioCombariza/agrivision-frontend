import { useState } from 'react'
import CameraCapture from '../components/detector/CameraCapture'
import VideoUpload from '../components/detector/VideoUpload'
import PhotoUpload from '../components/detector/PhotoUpload'
import CajasCapture from '../components/detector/CajasCapture'

const TABS = [
  { id: 'camera', label: 'Cámara', icon: '📷' },
  { id: 'cajas',  label: 'Cajas',  icon: '📦' },
  { id: 'video',  label: 'Video',  icon: '🎬' },
  { id: 'photos', label: 'Fotos',  icon: '🖼️' },
]

function Logo() {
  return <img className="det-header__logo" src="/brand/isotipo-negativo.svg" alt="" />
}

const FAMILIES = [
  { value: 'tagStandard52h13', label: 'Standard52h13 — 48,714 IDs' },
  { value: 'tag36h11',         label: 'tag36h11 — 587 IDs (clásica)' },
]

export default function DetectorPage() {
  const [tab, setTab] = useState('camera')
  const [accumulated, setAccumulated] = useState([])
  const [selectedFamily, setSelectedFamily] = useState('tagStandard52h13')

  function handleAccumulate(newResults) {
    setAccumulated(prev => {
      const map = new Map(prev.map(d => [d.tag_id, d]))
      for (const d of newResults) {
        const ex = map.get(d.tag_id)
        if (!ex || d.confidence > ex.confidence) map.set(d.tag_id, d)
      }
      return Array.from(map.values())
    })
  }

  return (
    <div className="det-page">
      <header className="det-header">
        <Logo />
        <div className="det-header__text">
          <h1>Lector AprilTags</h1>
          <p>AgriVision</p>
        </div>
      </header>

      <main className="det-main">
        {tab !== 'cajas' && (
          <div className="det-family-selector">
            <label className="det-family-selector__label">Familia de etiqueta</label>
            <select
              className="det-family-selector__select"
              value={selectedFamily}
              onChange={e => { setSelectedFamily(e.target.value); setAccumulated([]) }}
            >
              {FAMILIES.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        )}

        {tab === 'camera' && (
          <CameraCapture
            accumulated={accumulated}
            onAccumulate={handleAccumulate}
            onClear={() => setAccumulated([])}
            family={selectedFamily}
          />
        )}
        {tab === 'video'  && <VideoUpload family={selectedFamily} />}
        {tab === 'photos' && <PhotoUpload family={selectedFamily} />}
        {tab === 'cajas'  && <CajasCapture />}
      </main>

      <nav className="det-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`det-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="det-tab__icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

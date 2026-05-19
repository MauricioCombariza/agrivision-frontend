import { useState } from 'react'
import CameraCapture from '../components/detector/CameraCapture'
import VideoUpload from '../components/detector/VideoUpload'
import PhotoUpload from '../components/detector/PhotoUpload'

const TABS = [
  { id: 'camera', label: 'Cámara', icon: '📷' },
  { id: 'video',  label: 'Video',  icon: '🎬' },
  { id: 'photos', label: 'Fotos',  icon: '🖼️' },
]

function Logo() {
  return (
    <svg className="det-header__logo" viewBox="0 0 28 28" fill="none">
      <path d="M14 3C14 3 6 9.5 6 17c0 4.4 3.6 8 8 8s8-3.6 8-8c0-7.5-8-14-8-14Z" fill="#d4900a" opacity="0.9"/>
      <path d="M14 8v17" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 14c0 0-3.5-2.5-5.5-.5" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 18.5c0 0 3.5-2.5 5.5.5" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export default function DetectorPage() {
  const [tab, setTab] = useState('camera')
  const [accumulated, setAccumulated] = useState([])

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
          <p>tag36h11 · AgriVision</p>
        </div>
      </header>

      <main className="det-main">
        {tab === 'camera' && (
          <CameraCapture
            accumulated={accumulated}
            onAccumulate={handleAccumulate}
            onClear={() => setAccumulated([])}
          />
        )}
        {tab === 'video'  && <VideoUpload />}
        {tab === 'photos' && <PhotoUpload />}
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

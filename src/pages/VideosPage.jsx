import { useEffect, useState } from 'react'
import CapturaVideo from '../components/captura/CapturaVideo'
import AdminCapturas from '../components/captura/AdminCapturas'
import GaleriaLotes from '../components/captura/GaleriaLotes'
import { estadoBuzon } from '../api/captura'

const TABS = [
  { id: 'subir', label: 'Subir video', icon: '🎬' },
  { id: 'fotos', label: 'Ver fotos', icon: '🖼️' },
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

export default function VideosPage() {
  const [buzon, setBuzon] = useState(null)
  const [tab, setTab] = useState('subir')

  // Se consulta al entrar para avisar antes de que el operario grabe y suba en vano:
  // si el buzón está lleno o caído, mejor saberlo ahora que al final de la subida.
  useEffect(() => {
    estadoBuzon()
      .then((e) => setBuzon({ ok: true, ...e }))
      .catch((e) => setBuzon({ ok: false, mensaje: e.message }))
  }, [])

  return (
    <div className="det-page">
      <header className="det-header">
        <Logo />
        <div className="det-header__text">
          <h1>Captura de video</h1>
          <p>Alstroemeria · AgriVision</p>
        </div>
      </header>

      <main className="det-main">
        {tab === 'subir' && (
          <>
            {buzon && !buzon.ok && (
              <div className="det-error">
                No se puede recibir videos en este momento: {buzon.mensaje}
              </div>
            )}
            {buzon?.ok && buzon.libre_bytes < 1024 ** 3 && (
              <div className="cap-aviso">
                Queda poco espacio en el servidor ({(buzon.libre_bytes / 1024 ** 3).toFixed(1)} GB).
                Avisa a AgriVision antes de subir más videos.
              </div>
            )}
            <CapturaVideo />

            <AdminCapturas ultimaDescargaGlobal={buzon?.ultima_descarga_en} />
          </>
        )}

        {tab === 'fotos' && <GaleriaLotes />}
      </main>

      <nav className="det-tabs">
        {TABS.map((t) => (
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

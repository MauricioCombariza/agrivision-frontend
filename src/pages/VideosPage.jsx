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
  return <img className="det-header__logo" src="/brand/isotipo-negativo.svg" alt="" />
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

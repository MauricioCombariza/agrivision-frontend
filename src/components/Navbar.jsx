import { useEffect, useState } from 'react'
import { useLang } from '../App'

// Logotipo completo del manual; la variante se elige por CSS según <html data-tone>
// (fondo claro de la flor/tallo vs. fondo oscuro de las raíces). En móvil solo el isotipo.
function AgriVisionLogo() {
  return (
    <>
      <img className="navbar__logo-full navbar__logo-full--pos" src="/brand/logo-h-positivo.svg" alt="" />
      <img className="navbar__logo-full navbar__logo-full--neg" src="/brand/logo-h-negativo.svg" alt="" />
      <img className="navbar__logo-icon navbar__logo-icon--pos" src="/brand/isotipo-positivo.svg" alt="" />
      <img className="navbar__logo-icon navbar__logo-icon--neg" src="/brand/isotipo-negativo.svg" alt="" />
    </>
  )
}

export default function Navbar({ onLoginClick }) {
  const { t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__inner">
          <a href="/" className="navbar__logo" aria-label="AgriVision">
            <AgriVisionLogo />
          </a>
          <div className="navbar__actions">
            <a href="https://combariza.com/detector" className="navbar__lang navbar__extra" style={{ textDecoration: 'none' }} target="_blank" rel="noopener">
              Detector
            </a>
            {/* Ruta relativa a proposito: con la absoluta, quien abra esto desde
                local o desde un preview terminaria en produccion. */}
            <a href="/videos" className="navbar__lang navbar__extra" style={{ textDecoration: 'none' }}>
              Videos
            </a>
            <a href="/combariza/pitch.html" className="navbar__lang navbar__extra" style={{ textDecoration: 'none' }} target="_blank" rel="noopener">
              Pitch
            </a>
            <button className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
              {t.nav.langSwitch}
            </button>
            <button className="navbar__login" onClick={onLoginClick}>
              {t.nav.login}
            </button>
            <button className="navbar__cta" onClick={scrollToDemo}>
              {t.nav.demo}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

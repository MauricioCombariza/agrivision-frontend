import { useEffect, useState } from 'react'
import { useLang } from '../App'

function AgriVisionLogo() {
  return (
    <svg className="navbar__logo-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3 C14 3 6 9.5 6 17 C6 21.4 9.6 25 14 25 C18.4 25 22 21.4 22 17 C22 9.5 14 3 14 3Z" fill="#d4900a" opacity="0.9"/>
      <path d="M14 8 L14 25" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 14 C14 14 10.5 11.5 8.5 13.5" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 18.5 C14 18.5 17.5 16 19.5 18" stroke="#0f2519" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
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
            <span className="navbar__wordmark">AgriVision</span>
          </a>
          <div className="navbar__actions">
            <a href="/pitch.html" className="navbar__lang" style={{ textDecoration: 'none' }}>
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

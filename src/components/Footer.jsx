import { useLang } from '../App'

function AgriVisionLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 3 C14 3 6 9.5 6 17 C6 21.4 9.6 25 14 25 C18.4 25 22 21.4 22 17 C22 9.5 14 3 14 3Z" fill="#d4900a" opacity="0.8"/>
      <path d="M14 8 L14 25" stroke="#060d08" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 14 C14 14 10.5 11.5 8.5 13.5" stroke="#060d08" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 18.5 C14 18.5 17.5 16 19.5 18" stroke="#060d08" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export default function Footer({ onLoginClick }) {
  const { t, lang } = useLang()
  const f = t.footer

  const navLinks = lang === 'es'
    ? [
        { label: 'Inicio', href: '#' },
        { label: 'Solución', href: '#solution' },
        { label: 'Cómo funciona', href: '#howitworks' },
        { label: 'Para quién es', href: '#segments' },
      ]
    : [
        { label: 'Home', href: '#' },
        { label: 'Solution', href: '#solution' },
        { label: 'How it works', href: '#howitworks' },
        { label: 'Who it\'s for', href: '#segments' },
      ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <AgriVisionLogo />
              <span className="footer__wordmark">AgriVision</span>
            </div>
            <p className="footer__tagline">{f.tagline}</p>
            <p className="footer__description">{f.description}</p>
          </div>

          <div>
            <p className="footer__col-title">
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </p>
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="footer__link"
                onClick={(e) => {
                  if (link.href.startsWith('#') && link.href.length > 1) {
                    e.preventDefault()
                    document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="footer__link"
              onClick={onLoginClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
            >
              {lang === 'es' ? 'Ingresar' : 'Log in'}
            </button>
          </div>

          <div>
            <p className="footer__col-title">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </p>
            <a href={`mailto:${f.contact}`} className="footer__contact footer__link">
              {f.contact}
            </a>
            <p className="footer__link" style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.06em', color: 'var(--mist)', lineHeight: '1.5' }}>
              Sabana Norte<br />
              Bogotá, Colombia
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{f.copyright}</p>
          <nav className="footer__legal" aria-label="Legal links">
            {f.links.map((link, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()}>
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

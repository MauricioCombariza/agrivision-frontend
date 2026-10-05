import { useLang } from '../App'

function AgriVisionLogo() {
  return <img className="footer__logo-img" src="/brand/logo-h-negativo.svg" alt="AgriVision" />
}

export default function Footer({ onLoginClick }) {
  const { t, lang } = useLang()
  const f = t.footer

  const navLinks = lang === 'es'
    ? [
        { label: 'Inicio', href: '#' },
        { label: 'Quiénes somos', href: '#about' },
        { label: 'Solución', href: '#solution' },
        { label: 'Cómo funciona', href: '#howitworks' },
        { label: 'Misión y visión', href: '#mision' },
        { label: 'Para quién es', href: '#segments' },
      ]
    : [
        { label: 'Home', href: '#' },
        { label: 'Who we are', href: '#about' },
        { label: 'Solution', href: '#solution' },
        { label: 'How it works', href: '#howitworks' },
        { label: 'Mission & vision', href: '#mision' },
        { label: 'Who it\'s for', href: '#segments' },
      ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <AgriVisionLogo />
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

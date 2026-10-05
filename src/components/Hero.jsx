import { useLang } from '../App'

export default function Hero({ onDemoClick }) {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="hero" aria-label="AgriVision hero">
      <div className="hero__content">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__left">
              <p className="hero__eyebrow">{h.eyebrow}</p>

              <h1 className="hero__headline">
                {h.headline1}<br />
                <em>{h.headline2}</em><br />
                {h.headline3}
              </h1>

              <p className="hero__tagline">{h.tagline}</p>

              <div className="hero__divider" aria-hidden="true" />

              <p className="hero__subtext">{h.subtext}</p>

              <div className="hero__cta-group">
                <button className="hero__btn-primary" onClick={onDemoClick}>
                  {h.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a href="https://combariza.com/detector" className="hero__btn-pitch" target="_blank" rel="noopener">
                  Detector
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="/videos" className="hero__btn-pitch">
                  Subir videos
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="/combariza/pitch.html" className="hero__btn-pitch" target="_blank" rel="noopener">
                  Ver Pitch
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <span className="hero__cta-sub">{h.ctaSub}</span>
              </div>
            </div>

            <div className="hero__metrics" aria-label="Key metrics">
              {h.metrics.map((m, i) => (
                <div className="hero__metric" key={i}>
                  <div className="hero__metric-value">{m.value}</div>
                  <div className="hero__metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useMemo } from 'react'
import { useLang } from '../App'

// Generate the field dot grid — visual metaphor for CV scanning a crop
function FieldGrid() {
  const dots = useMemo(() => {
    return Array.from({ length: 320 }, (_, i) => {
      const rand = Math.sin(i * 9301 + 49297) * 0.5 + 0.5 // deterministic pseudo-random
      const rand2 = Math.sin(i * 7919 + 1013) * 0.5 + 0.5
      const isAmber = rand < 0.06       // 6%  → "detected" plants
      const isDim   = rand > 0.7        // 30% → dimmer background
      const delay   = (rand2 * 4).toFixed(2)
      const dur     = (3 + rand * 2).toFixed(2)
      return { isAmber, isDim, delay, dur }
    })
  }, [])

  return (
    <div className="hero__field" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className={`hero__dot ${d.isAmber ? 'hero__dot--amber' : d.isDim ? 'hero__dot--dim' : 'hero__dot--green'}`}
          style={{ animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }}
        />
      ))}
    </div>
  )
}

export default function Hero({ onDemoClick }) {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="hero" aria-label="AgriVision hero">
      <FieldGrid />
      <div className="hero__overlay" aria-hidden="true" />

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

      <div className="hero__bottom-fade" aria-hidden="true" />
    </section>
  )
}

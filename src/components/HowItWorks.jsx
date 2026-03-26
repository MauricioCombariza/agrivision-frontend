import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Step({ step, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`howitworks__step reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
    >
      <div className="howitworks__step-number" aria-hidden="true">{step.number}</div>
      <h3 className="howitworks__step-title">{step.title}</h3>
      <p className="howitworks__step-text">{step.text}</p>
    </div>
  )
}

export default function HowItWorks() {
  const { t } = useLang()
  const h = t.howItWorks
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section className="howitworks">
      <div className="container">
        <div
          ref={headerRef}
          className={`howitworks__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label howitworks__label">{h.label}</p>
          <h2 className="section-title howitworks__title">{h.title}</h2>
        </div>

        <div className="howitworks__steps" role="list">
          {h.steps.map((step, i) => (
            <Step key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function SolutionCard({ item, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`solution__card reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
    >
      <span className="solution__card-tag">{item.tag}</span>
      <h3 className="solution__card-title">{item.title}</h3>
      <p className="solution__card-text">{item.text}</p>
      <p className="solution__card-detail">{item.detail}</p>
    </div>
  )
}

export default function SolutionSection() {
  const { t } = useLang()
  const s = t.solution
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section className="solution">
      <div className="container">
        <div
          ref={headerRef}
          className={`solution__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label solution__label">{s.label}</p>
          <h2 className="section-title solution__title">{s.title}</h2>
          <p className="solution__intro">{s.intro}</p>
        </div>

        <div className="solution__grid">
          {s.items.map((item, i) => (
            <SolutionCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

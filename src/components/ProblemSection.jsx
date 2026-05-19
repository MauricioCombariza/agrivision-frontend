import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function ProblemItem({ item, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`problem__item reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
    >
      <p className="problem__number">{item.number}</p>
      <h3 className="problem__item-title">{item.title}</h3>
      <p className="problem__item-text">{item.text}</p>
    </div>
  )
}

export default function ProblemSection() {
  const { t } = useLang()
  const p = t.problem
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section className="problem">
      <div className="container">
        <div
          ref={headerRef}
          className={`problem__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label problem__label">{p.label}</p>
          <h2 className="section-title problem__title">{p.title}</h2>
        </div>

        <div className="problem__grid">
          {p.items.map((item, i) => (
            <ProblemItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

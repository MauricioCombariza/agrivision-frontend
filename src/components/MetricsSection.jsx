import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function MetricItem({ item, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`metrics__item reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
    >
      <div className="metrics__value">{item.value}</div>
      <p className="metrics__label-text">{item.label}</p>
    </div>
  )
}

export default function MetricsSection() {
  const { t } = useLang()
  const m = t.metrics
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section className="metrics">
      <div className="container">
        <div
          ref={headerRef}
          className={`metrics__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label metrics__label">{m.label}</p>
          <h2 className="section-title metrics__title">{m.title}</h2>
        </div>

        <div className="metrics__grid">
          {m.items.map((item, i) => (
            <MetricItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

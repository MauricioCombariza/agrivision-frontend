import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function SegmentCard({ item, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`segments__card reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
    >
      <span className="segments__card-icon" aria-hidden="true">{item.icon}</span>
      <h3 className="segments__card-title">{item.title}</h3>
      <p className="segments__card-sub">{item.sub}</p>
      <p className="segments__card-text">{item.text}</p>
      <blockquote className="segments__card-signal">{item.signal}</blockquote>
    </div>
  )
}

export default function SegmentsSection() {
  const { t } = useLang()
  const s = t.segments
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section className="segments">
      <div className="container">
        <div
          ref={headerRef}
          className={`segments__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label segments__label">{s.label}</p>
          <h2 className="section-title segments__title">{s.title}</h2>
        </div>

        <div className="segments__grid">
          {s.items.map((item, i) => (
            <SegmentCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

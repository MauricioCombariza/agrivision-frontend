import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Anchor } from './journey/PlantJourney'
import { ANCHORS } from './journey/plantMap'

function Value({ item, index }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <Anchor at={ANCHORS.values[index]} node={`valor${index}`}>
      <div ref={ref} className={`values__item reveal ${visible ? 'visible' : ''}`}>
        <p className="values__number">0{index + 1}</p>
        <h3 className="values__item-title">{item.title}</h3>
        <p className="values__item-text">{item.text}</p>
      </div>
    </Anchor>
  )
}

export default function ValuesSection() {
  const { t } = useLang()
  const v = t.values
  const [ref, visible] = useScrollAnimation()

  return (
    <section className="values" id="valores">
      <div ref={ref} className={`values__header reveal ${visible ? 'visible' : ''}`}>
        <p className="section-label values__label">{v.label}</p>
        <h2 className="section-title values__title">{v.title}</h2>
      </div>
      <div className="values__list">
        {v.items.map((item, i) => <Value key={i} item={item} index={i} />)}
      </div>
    </section>
  )
}

import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AboutSection() {
  const { t } = useLang()
  const a = t.about
  const [ref, visible] = useScrollAnimation()

  return (
    <section className="about" id="about">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <p className="section-label about__label">{a.label}</p>
        <h2 className="section-title about__title">{a.title}</h2>
        <p className="about__lead">{a.text}</p>
        <div className="about__cols">
          <p className="about__text">{a.origin}</p>
          <p className="about__text">{a.presentation}</p>
        </div>
      </div>
    </section>
  )
}

import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Anchor } from './journey/PlantJourney'
import { ANCHORS } from './journey/plantMap'

function Statement({ label, text, at, delay }) {
  const [ref, visible] = useScrollAnimation()
  return (
    <Anchor at={at} node="suelo">
      <div ref={ref} className={`roots__statement reveal ${delay} ${visible ? 'visible' : ''}`}>
        <h2 className="section-title roots__statement-title">{label}</h2>
        <p className="roots__statement-text">{text}</p>
      </div>
    </Anchor>
  )
}

export default function MissionVision() {
  const { t } = useLang()
  return (
    <section className="roots" id="mision">
      <Statement label={t.mission.label} text={t.mission.text} at={ANCHORS.mission} delay="" />
      <Statement label={t.vision.label} text={t.vision.text} at={ANCHORS.vision} delay="reveal-delay-1" />
    </section>
  )
}

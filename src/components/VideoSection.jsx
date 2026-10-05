import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const CLOUDINARY = 'https://res.cloudinary.com/combariza/video/upload'
const VIDEO_SRC = `${CLOUDINARY}/f_auto,q_auto/v1791209899/Agrivision.mp4`
const POSTER = `${CLOUDINARY}/so_2/v1791209899/Agrivision.jpg`

export default function VideoSection() {
  const { t } = useLang()
  const v = t.video
  const [ref, visible] = useScrollAnimation()

  return (
    <section className="video" id="video">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <p className="section-label video__label">{v.label}</p>
        <h2 className="section-title video__title">{v.title}</h2>
        <div className="video__frame">
          <video controls playsInline preload="metadata" poster={POSTER}>
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

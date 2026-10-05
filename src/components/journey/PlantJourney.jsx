import { useRef } from 'react'
import { useLang } from '../../App'
import { usePlantCamera } from '../../hooks/usePlantCamera'
import { PLANT, NODES } from './plantMap'

// Trazos cortos tipo circuito que salen de cada nodo, como en el isotipo de la hoja.
function PlantNodes({ active }) {
  return (
    <svg className="journey__nodes" viewBox={`0 0 ${PLANT.width} ${PLANT.height}`} aria-hidden="true">
      {Object.entries(NODES).map(([key, { x, y }]) => {
        const dir = x >= 358 ? 1 : -1
        return (
          <g key={key} className={`plant-node ${active === key ? 'is-active' : ''}`}>
            <polyline points={`${x},${y} ${x + dir * 26},${y - 26} ${x + dir * 70},${y - 26}`} className="plant-node__trace" />
            <circle cx={x + dir * 70} cy={y - 26} r="5" className="plant-node__tip" />
            <circle cx={x} cy={y} r="22" className="plant-node__halo" />
            <circle cx={x} cy={y} r="9" className="plant-node__dot" />
          </g>
        )
      })}
    </svg>
  )
}

export default function PlantJourney({ children }) {
  const { t } = useLang()
  const rootRef = useRef(null)
  const plantRef = useRef(null)
  const { node, stage } = usePlantCamera(rootRef, plantRef)

  return (
    <div className="journey" ref={rootRef}>
      {children}
      <div className="journey__rail" aria-hidden="true">
        <div className="journey__sticky">
          <p className="journey__stage-label" key={stage}>{t.journey[stage]}</p>
          <div className="journey__plant" ref={plantRef}>
            <img src="/brand/planta.webp" alt="" width={PLANT.width} height={PLANT.height} />
            <PlantNodes active={node} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PlantStage({ stage, tone, children }) {
  return (
    <div className={`stage stage--${stage}`} data-stage={stage} data-tone={tone}>
      <div className="stage__inner">{children}</div>
    </div>
  )
}

// Bloque de contenido que mueve la cámara de la planta a `at` y enciende `node`.
export function Anchor({ at, node, children, ...rest }) {
  return (
    <div data-anchor={at} data-node={node} {...rest}>
      {children}
    </div>
  )
}

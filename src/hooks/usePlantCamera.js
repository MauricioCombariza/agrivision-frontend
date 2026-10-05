import { useEffect, useState } from 'react'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const NAVBAR_CLEARANCE = 64

/**
 * Cámara del recorrido de la planta: mueve `plantRef` verticalmente para que la parte de la
 * planta indicada por el `data-anchor` de cada bloque quede centrada cuando el bloque pasa por
 * el centro de la pantalla (interpolando entre bloques). Además expone el nodo y la etapa activos
 * y publica el tono de fondo bajo la navbar en <html data-tone>.
 */
export function usePlantCamera(rootRef, plantRef) {
  const [node, setNode] = useState(null)
  const [stage, setStage] = useState('flor')

  useEffect(() => {
    const root = rootRef.current
    const plant = plantRef.current
    if (!root || !plant) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const vc = vh / 2
      const blocks = [...root.querySelectorAll('[data-anchor]')]
      if (!blocks.length) return
      const pts = blocks.map(el => {
        const r = el.getBoundingClientRect()
        return { c: r.top + r.height / 2, a: parseFloat(el.dataset.anchor), node: el.dataset.node || null }
      })

      let nearest = 0
      pts.forEach((p, i) => { if (Math.abs(p.c - vc) < Math.abs(pts[nearest].c - vc)) nearest = i })

      let anchor
      if (reduced.matches) anchor = pts[nearest].a
      else if (vc <= pts[0].c) anchor = pts[0].a
      else if (vc >= pts[pts.length - 1].c) anchor = pts[pts.length - 1].a
      else {
        const i = pts.findIndex((p, k) => p.c <= vc && vc < pts[k + 1].c)
        const t = (vc - pts[i].c) / (pts[i + 1].c - pts[i].c)
        anchor = pts[i].a + t * (pts[i + 1].a - pts[i].a)
      }

      const h = plant.offsetHeight
      const y = clamp(vc - anchor * h, vh - h, NAVBAR_CLEARANCE)
      plant.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
      setNode(pts[nearest].node)

      let current = null
      let tone = 'dark'
      for (const el of root.querySelectorAll('[data-stage]')) {
        const r = el.getBoundingClientRect()
        if (r.top <= vc && r.bottom > vc) current = el.dataset.stage
        if (r.top <= 40 && r.bottom > 40) tone = el.dataset.tone
      }
      if (current) setStage(current)
      document.documentElement.dataset.tone = tone
    }

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    const ro = new ResizeObserver(schedule)
    ro.observe(root)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
      ro.disconnect()
      delete document.documentElement.dataset.tone
    }
  }, [rootRef, plantRef])

  return { node, stage }
}

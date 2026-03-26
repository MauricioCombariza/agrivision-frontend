import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a CSS reveal animation when an element enters the viewport.
 * Usage: const [ref, visible] = useScrollAnimation()
 * Then: <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} />
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

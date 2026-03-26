import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function WhyUs() {
  const { t } = useLang()
  const w = t.whyUs
  const [headerRef, headerVisible] = useScrollAnimation()
  const [itemsRef, itemsVisible] = useScrollAnimation()
  const [tableRef, tableVisible] = useScrollAnimation()

  return (
    <section className="whyus">
      <div className="container">
        <div
          ref={headerRef}
          className={`whyus__header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label whyus__label">{w.label}</p>
          <h2 className="section-title whyus__title">{w.title}</h2>
        </div>

        <div className="whyus__layout">
          <div
            ref={itemsRef}
            className={`whyus__items reveal ${itemsVisible ? 'visible' : ''}`}
          >
            {w.items.map((item, i) => (
              <div key={i} className="whyus__item">
                <h3 className="whyus__item-title">{item.title}</h3>
                <p className="whyus__item-text">{item.text}</p>
              </div>
            ))}
          </div>

          <div
            ref={tableRef}
            className={`whyus__comparison reveal reveal-delay-2 ${tableVisible ? 'visible' : ''}`}
          >
            <p className="whyus__comparison-title">{w.comparison.title}</p>
            <table className="whyus__table" aria-label={w.comparison.title}>
              <thead>
                <tr>
                  {w.comparison.headers.map((h, i) => (
                    <th key={i} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {w.comparison.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>
                        {cell === '✓' ? <span className="check" aria-label="yes">✓</span>
                         : cell === '✗' ? <span className="cross" aria-label="no">✗</span>
                         : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

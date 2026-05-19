import { useState } from 'react'
import { useLang } from '../App'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { api } from '../api'

const TRUST_ITEMS_ES = [
  'Demo gratuita en tu propia finca — sin compromiso',
  'Ves los resultados de tu cultivo en tiempo real',
  'Coordinamos la visita en menos de 24 horas',
]
const TRUST_ITEMS_EN = [
  'Free demo at your own farm — no commitment',
  'You see your crop results in real time',
  'We coordinate the visit within 24 hours',
]

export default function MeetingSection() {
  const { t, lang } = useLang()
  const m = t.meeting
  const f = m.form

  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', hectares: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const [leftRef, leftVisible] = useScrollAnimation()
  const [formRef, formVisible] = useScrollAnimation()

  const trustItems = lang === 'es' ? TRUST_ITEMS_ES : TRUST_ITEMS_EN

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await api.meetings.request(form)
      setStatus('success')
      setForm({ name: '', company: '', phone: '', email: '', hectares: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || f.error)
    }
  }

  return (
    <section className="meeting" id="demo">
      <div className="container">
        <div className="meeting__inner">
          <div
            ref={leftRef}
            className={`meeting__left reveal ${leftVisible ? 'visible' : ''}`}
          >
            <p className="section-label meeting__label">{m.label}</p>
            <h2 className="section-title meeting__title">{m.title}</h2>
            <p className="meeting__subtitle">{m.subtitle}</p>

            <div className="meeting__trust" aria-label="Trust signals">
              {trustItems.map((item, i) => (
                <div key={i} className="meeting__trust-item">
                  <span className="meeting__trust-dot" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className={`meeting__form reveal reveal-delay-2 ${formVisible ? 'visible' : ''}`}
            onSubmit={handleSubmit}
            noValidate
            aria-label={m.label}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="meet-name">{f.name}</label>
              <input
                id="meet-name"
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="meet-company">{f.company}</label>
              <input
                id="meet-company"
                className="form-input"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                autoComplete="organization"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="meet-phone">{f.phone}</label>
              <input
                id="meet-phone"
                className="form-input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="meet-email">{f.email}</label>
              <input
                id="meet-email"
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="meet-hectares">{f.hectares}</label>
              <input
                id="meet-hectares"
                className="form-input"
                type="text"
                name="hectares"
                value={form.hectares}
                onChange={handleChange}
                placeholder={f.hectaresPlaceholder}
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="meet-message">{f.message}</label>
              <textarea
                id="meet-message"
                className="form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={f.messagePlaceholder}
              />
            </div>

            {status === 'success' && (
              <div className="form-success" role="status">{f.success}</div>
            )}
            {status === 'error' && (
              <div className="form-error" role="alert">{errorMsg || f.error}</div>
            )}

            {status !== 'success' && (
              <button
                type="submit"
                className="form-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? f.submitting : f.submit}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

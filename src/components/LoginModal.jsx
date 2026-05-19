import { useState, useEffect } from 'react'
import { useLang } from '../App'
import { api } from '../api'

export default function LoginModal({ onClose }) {
  const { t } = useLang()
  const l = t.login

  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const data = await api.auth.login(form.email, form.password)
      // Store token and redirect to dashboard
      if (data?.access_token) {
        localStorage.setItem('agrivision_token', data.access_token)
      }
      // TODO: redirect to /dashboard when dashboard route is ready
      window.location.href = '/dashboard'
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Error de autenticación')
    }
  }

  const scrollToDemo = () => {
    onClose()
    setTimeout(() => {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div
      className="login-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="login-card">
        <button className="login-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <p className="login-wordmark">AgriVision</p>
        <h2 className="login-title" id="login-title">{l.title}</h2>
        <p className="login-subtitle">{l.subtitle}</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">{l.email}</label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">{l.password}</label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          {status === 'error' && (
            <div className="login-error" role="alert">{errorMsg}</div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? l.submitting : l.submit}
          </button>

          <button type="button" className="login-forgot" onClick={() => {}}>
            {l.forgot}
          </button>
        </form>

        <div className="login-divider" />

        <p className="login-footer">
          {l.notClient}{' '}
          <a href="#demo" onClick={(e) => { e.preventDefault(); scrollToDemo() }}>
            {l.requestDemo}
          </a>
        </p>
      </div>
    </div>
  )
}

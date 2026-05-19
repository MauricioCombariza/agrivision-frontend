/**
 * AgriVision API layer
 * Ready to connect to FastAPI backend at /api/*
 * Set VITE_API_URL in .env for production (e.g. https://api.agrivision.co)
 */

const API_BASE = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const { headers = {}, ...rest } = options
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.detail || data?.message || `HTTP ${res.status}`
    throw new Error(message)
  }
  return data
}

function getAuthHeader() {
  const token = localStorage.getItem('agrivision_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const api = {
  /**
   * Auth endpoints — FastAPI: POST /api/auth/login, POST /api/auth/logout
   */
  auth: {
    login: (email, password) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    logout: () =>
      request('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeader(),
      }),

    me: () =>
      request('/api/auth/me', {
        headers: getAuthHeader(),
      }),
  },

  /**
   * Demo / meetings — FastAPI: POST /api/meetings/request
   */
  meetings: {
    request: (data) =>
      request('/api/meetings/request', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  /**
   * Dashboard (future) — FastAPI: GET /api/dashboard/*
   */
  dashboard: {
    summary: () =>
      request('/api/dashboard/summary', {
        headers: getAuthHeader(),
      }),

    cropStatus: (farmId) =>
      request(`/api/dashboard/farms/${farmId}/crop-status`, {
        headers: getAuthHeader(),
      }),

    projection: (farmId) =>
      request(`/api/dashboard/farms/${farmId}/projection`, {
        headers: getAuthHeader(),
      }),
  },
}

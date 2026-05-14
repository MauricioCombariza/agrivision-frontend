const BASE = import.meta.env.VITE_API_URL ?? ''

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, { method: 'POST', body })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(text)
  }
  return res.json()
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export function detectPhoto(file, expectedTags = null) {
  const fd = new FormData()
  fd.append('file', file)
  const qs = expectedTags != null ? `?expected_tags=${expectedTags}` : ''
  return post(`/api/v1/detect/photo${qs}`, fd)
}

export function startVideoDetection(file) {
  const fd = new FormData()
  fd.append('file', file)
  return post('/api/v1/detect/video', fd)
}

export function getVideoStatus(jobId) {
  return get(`/api/v1/detect/video/${jobId}`)
}

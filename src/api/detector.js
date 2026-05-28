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

export function detectPhoto(file, expectedTags = null, foundCount = null, family = 'tagStandard52h13') {
  const fd = new FormData()
  fd.append('file', file)
  const params = new URLSearchParams()
  if (expectedTags != null) params.set('expected_tags', expectedTags)
  if (foundCount != null) params.set('found_count', foundCount)
  params.set('tag_family', family)
  return post(`/api/v1/detect/photo?${params}`, fd)
}

export function detectPhotoQuick(file, expectedTags = null, foundCount = null, family = 'tagStandard52h13') {
  const fd = new FormData()
  fd.append('file', file)
  const params = new URLSearchParams()
  if (expectedTags != null) params.set('expected_tags', expectedTags)
  if (foundCount != null) params.set('found_count', foundCount)
  params.set('tag_family', family)
  return post(`/api/v1/detect/photo/quick?${params}`, fd)
}

export function getPhotoJobStatus(jobId) {
  return get(`/api/v1/detect/photo/job/${jobId}`)
}

export function startVideoDetection(file, family = 'tagStandard52h13') {
  const fd = new FormData()
  fd.append('file', file)
  const params = new URLSearchParams({ tag_family: family })
  return post(`/api/v1/detect/video?${params}`, fd)
}

export function getVideoStatus(jobId) {
  return get(`/api/v1/detect/video/${jobId}`)
}

export function detectCajasPhoto(file) {
  const fd = new FormData()
  fd.append('file', file)
  return post('/api/v1/cajas/photo', fd)
}

/**
 * Redimensiona una imagen a maxSide px en el lado mayor antes de subir.
 * Las fotos de celular son 3-8 MB; el servidor igual las reduce a 1600px,
 * así que hacerlo aquí elimina el exceso de upload.
 */
export function compressImage(file, maxSide = 1600) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const longest = Math.max(img.width, img.height)
      if (longest <= maxSide) { resolve(file); return }
      const scale = maxSide / longest
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.88)
    }
    img.src = url
  })
}

/**
 * Dibuja los rectángulos de detección sobre el blob de la foto original.
 * Las esquinas (corners) vienen del servidor en coordenadas de la imagen
 * comprimida a 1600px — que es exactamente el blob que se pasó al servidor.
 * Devuelve un dataURL listo para <img src>.
 */
export async function annotateImage(blob, detections) {
  if (!detections.length) return null
  const bitmap = await createImageBitmap(blob)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0)

  const lw = Math.max(2, Math.round(bitmap.width / 500))
  const fs = Math.max(12, Math.round(bitmap.width / 110))
  ctx.font = `bold ${fs}px monospace`

  for (const d of detections) {
    const color = d.confidence >= 4 ? '#20c832' : d.confidence >= 2 ? '#00d0d0' : '#ff6400'
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = d.corners

    ctx.strokeStyle = color
    ctx.lineWidth = lw
    ctx.beginPath()
    ctx.moveTo(x0, y0); ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2); ctx.lineTo(x3, y3)
    ctx.closePath()
    ctx.stroke()

    const cx = Math.round((x0 + x1 + x2 + x3) / 4)
    const cy = Math.round((y0 + y1 + y2 + y3) / 4)
    const label = `ID ${d.tag_id}`
    const tw = ctx.measureText(label).width

    ctx.fillStyle = 'rgba(0,0,0,0.72)'
    ctx.fillRect(cx - 4, cy - fs - 2, tw + 8, fs + 6)
    ctx.fillStyle = color
    ctx.fillText(label, cx, cy)
  }

  return canvas.toDataURL('image/jpeg', 0.85)
}

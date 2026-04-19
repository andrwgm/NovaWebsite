export function estimateReadingMinutes(markdown, persistedMinutes) {
  const persisted = Number(persistedMinutes)
  if (Number.isFinite(persisted) && persisted > 0) {
    return Math.round(persisted)
  }

  const text = String(markdown || '')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return Math.max(1, minutes)
}

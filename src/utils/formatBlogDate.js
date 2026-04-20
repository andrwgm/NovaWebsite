export function formatBlogDate(value) {
  try {
    const date = new Date(value)
    if (!Number.isFinite(date.getTime())) return ''
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

export function formatNumber(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-GB').format(n)
}

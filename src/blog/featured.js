function parseDate(value) {
  const time = new Date(value || 0).getTime()
  return Number.isFinite(time) ? time : 0
}

/** @param {import('./types').BlogPost[]} posts */
export function getFeaturedPost(posts) {
  const featured = posts.filter((post) => post.featured)
  const pool = featured.length ? featured : posts
  return pool.slice().sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))[0] || null
}

/** @param {import('./types').BlogPost[]} posts @param {import('./types').BlogPost|null} featured */
export function getSidebarFeaturedPost(posts, featured) {
  const candidates = posts
    .filter((post) => post.sidebarFeatured)
    .filter((post) => !featured || post.slug !== featured.slug)

  if (candidates.length) {
    return candidates.slice().sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))[0]
  }

  const fallback = posts
    .filter((post) => !featured || post.slug !== featured.slug)
    .slice()
    .sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))[1]

  return fallback || null
}

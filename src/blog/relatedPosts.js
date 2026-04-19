/**
 * @param {import('./types').BlogPost} post
 * @param {import('./types').BlogPost[]} allPosts
 * @param {number} limit
 */
export function getRelatedPosts(post, allPosts, limit = 2) {
  const manual = Array.isArray(post.relatedPosts) ? post.relatedPosts.map(String) : []
  const manualMatches = manual
    .map((slug) => allPosts.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .filter((candidate) => candidate.slug !== post.slug)

  if (manualMatches.length >= limit) {
    return manualMatches.slice(0, limit)
  }

  const pool = allPosts.filter((candidate) => candidate.slug !== post.slug)
  const postTags = new Set((post.tags || []).map((t) => String(t).toLowerCase()))
  const postCategory = String(post.category || '').toLowerCase()

  const scored = pool.map((candidate) => {
    let score = 0
    const candidateCategory = String(candidate.category || '').toLowerCase()
    if (postCategory && candidateCategory === postCategory) {
      score += 5
    }

    for (const tag of candidate.tags || []) {
      if (postTags.has(String(tag).toLowerCase())) {
        score += 2
      }
    }

    if (candidate.featured) score += 0.25
    return { candidate, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return dateValue(b.candidate.publishedAt) - dateValue(a.candidate.publishedAt)
  })

  const picked = new Map()
  for (const item of manualMatches) {
    picked.set(item.slug, item)
  }

  for (const { candidate } of scored) {
    if (picked.size >= limit) break
    picked.set(candidate.slug, candidate)
  }

  return Array.from(picked.values()).slice(0, limit)
}

function dateValue(value) {
  const time = new Date(value || 0).getTime()
  return Number.isFinite(time) ? time : 0
}

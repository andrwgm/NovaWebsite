/**
 * @param {import('./types').BlogPost[]} posts
 * @returns {{ label: string, count: number }[]}
 */
export function computeTopicCounts(posts) {
  const map = new Map()

  for (const post of posts) {
    const category = String(post.category || '').trim()
    if (category) {
      map.set(category, (map.get(category) || 0) + 1)
    }

    for (const tag of post.tags || []) {
      const label = String(tag).trim()
      if (!label) continue
      map.set(label, (map.get(label) || 0) + 1)
    }
  }

  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 10)
}

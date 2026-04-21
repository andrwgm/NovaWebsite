/**
 * @param {import('./types').BlogPost[]} posts
 * @returns {{ label: string, count: number }[]}
 */
export function computeTopicCounts(posts) {
  const topicCounts = new Map()
  const topicLabels = new Map()

  for (const post of posts) {
    // Count only MDX topics/tags (not category) and only once per post.
    const seenInPost = new Set()
    for (const rawTag of post.tags || []) {
      const label = String(rawTag).trim()
      if (!label) continue
      const key = label.toLowerCase()
      if (seenInPost.has(key)) continue
      seenInPost.add(key)

      topicLabels.set(key, topicLabels.get(key) || label)
      topicCounts.set(key, (topicCounts.get(key) || 0) + 1)
    }
  }

  return Array.from(topicCounts.entries())
    .map(([key, count]) => ({ label: topicLabels.get(key) || key, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 10)
}

/**
 * @param {import('./types').BlogPost[]} posts
 * @param {import('./types').BlogPost|null} featured
 * @param {import('./types').BlogPost|null} sidebarMini
 */
export function getFeedPosts(posts, featured, sidebarMini) {
  const skip = new Set()
  if (featured) skip.add(featured.slug)
  if (sidebarMini) skip.add(sidebarMini.slug)
  return posts.filter((post) => !skip.has(post.slug))
}

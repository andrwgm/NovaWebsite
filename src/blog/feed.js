/**
 * Exclude the large featured card from the list. Sidebar featured stays in.
 *
 * @param {import('./types').BlogPost[]} posts
 * @param {import('./types').BlogPost|null} featured
 */
export function getFeedPosts(posts, featured) {
  if (!featured) return posts
  return posts.filter((post) => post.slug !== featured.slug)
}

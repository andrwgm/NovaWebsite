import { FILTER_MATCHERS } from './blogConfig'
import { parseFrontmatter, stringifyYamlScalar } from './parseFrontmatter'
import { estimateReadingMinutes } from './readingTime'
import { normalizeSlugInput, slugFromTitle } from './slug'

/** @type {Record<string, string>} */
const rawModules = import.meta.glob('../../content/blog/*.mdx', {
  eager: true,
  as: 'raw'
})

function parseDate(value) {
  const time = new Date(value || 0).getTime()
  return Number.isFinite(time) ? time : 0
}

function coerceTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags.map((tag) => String(tag))
  return String(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function buildPost(filePath, source) {
  const { data: rawData, content } = parseFrontmatter(source)
  const data = /** @type {Record<string, unknown>} */ (rawData)
  const body = String(content || '').trim()

  const title = String(data.title || '').trim()
  const excerpt = String(data.excerpt || data.shortDescription || '').trim()
  const category = String(data.category || 'General guidance').trim()
  const author = String(data.author || 'Nova Clinics').trim()
  const coverImage = String(data.coverImage || '/images/beach-kid.avif').trim()

  const slugInput = data.slug ? normalizeSlugInput(data.slug) : slugFromTitle(title)
  const slug = slugInput || slugFromTitle(title || 'post')

  const tags = coerceTags(data.tags ?? data.topics)
  const relatedPosts = Array.isArray(data.relatedPosts)
    ? data.relatedPosts.map((value) => normalizeSlugInput(String(value)))
    : []

  const readingTime = estimateReadingMinutes(body, data.readingTime)

  return {
    title,
    excerpt,
    slug,
    category,
    tags,
    publishedAt:
      stringifyYamlScalar(data.publishedAt || data.date) || new Date().toISOString().slice(0, 10),
    updatedAt: stringifyYamlScalar(data.updatedAt),
    author,
    coverImage,
    featured: Boolean(data.featured),
    sidebarFeatured: Boolean(data.sidebarFeatured),
    draft: Boolean(data.draft),
    seoTitle: data.seoTitle ? String(data.seoTitle) : '',
    seoDescription: data.seoDescription ? String(data.seoDescription) : '',
    ogImage: data.ogImage ? String(data.ogImage) : '',
    canonicalUrl: data.canonicalUrl ? String(data.canonicalUrl) : '',
    readingTime,
    order: typeof data.order === 'number' ? data.order : Number(data.order) || 0,
    relatedPosts,
    viewCount: typeof data.viewCount === 'number' ? data.viewCount : Number(data.viewCount) || 0,
    body,
    _sourcePath: filePath
  }
}

function assertUniqueSlugs(posts) {
  const seen = new Map()
  for (const post of posts) {
    if (seen.has(post.slug)) {
      const first = seen.get(post.slug)
      throw new Error(
        `Duplicate blog slug "${post.slug}" between "${first}" and "${post._sourcePath}".`
      )
    }
    seen.set(post.slug, post._sourcePath)
  }
}

/** @returns {import('./types').BlogPost[]} */
export function getAllPostsFromDisk() {
  const posts = []
  for (const filePath of Object.keys(rawModules)) {
    const source = rawModules[filePath]
    const post = buildPost(filePath, source)
    if (post.draft) continue
    if (!post.title) continue
    posts.push(post)
  }

  assertUniqueSlugs(posts)

  posts.sort((a, b) => {
    if (b.order !== a.order) return b.order - a.order
    return parseDate(b.publishedAt) - parseDate(a.publishedAt)
  })

  return posts
}

/** @type {import('./types').BlogPost[]|null} */
let cachedPosts = null

/** @returns {import('./types').BlogPost[]} */
export function getAllPosts() {
  if (!cachedPosts) {
    cachedPosts = getAllPostsFromDisk()
  }
  return cachedPosts
}

/** @param {string} slug */
export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null
}

/** @param {string} filterId */
export function filterPostsByCategory(posts, filterId) {
  const matcher = FILTER_MATCHERS[filterId] || FILTER_MATCHERS.all
  return posts.filter((post) => matcher(post))
}

/** @param {import('./types').BlogPost[]} posts @param {string} query */
export function filterPostsBySearch(posts, query) {
  const terms = String(query || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  if (!terms.length) return posts

  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      ...(post.tags || [])
    ]
      .join(' ')
      .toLowerCase()

    return terms.every((term) => haystack.includes(term))
  })
}

/** @returns {import('./types').BlogPost[]} */
export function getPostsExcludingFeatured(posts, featured) {
  if (!featured) return posts
  return posts.filter((post) => post.slug !== featured.slug)
}

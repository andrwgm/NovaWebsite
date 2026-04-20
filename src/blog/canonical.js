import { SITE_ORIGIN } from './blogConfig'

/** @param {import('./types').BlogPost} post */
export function resolvePostCanonicalUrl(post) {
  const configured = String(post.canonicalUrl || '').trim()
  if (!configured) {
    return `${SITE_ORIGIN}/blog/${post.slug}`
  }
  if (configured.startsWith('http://') || configured.startsWith('https://')) {
    return configured
  }
  const path = configured.startsWith('/') ? configured : `/${configured}`
  return `${SITE_ORIGIN}${path}`
}

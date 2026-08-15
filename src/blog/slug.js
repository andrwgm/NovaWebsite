import GithubSlugger from 'github-slugger'

export function normalizeSlugInput(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function slugFromTitle(title) {
  const slugger = new GithubSlugger()
  return slugger.slug(String(title || 'post').trim())
}

/** @typedef {{ id: string, label: string }} BlogFilterCategory */

/** @type {BlogFilterCategory[]} */
export const BLOG_FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'autism', label: 'Autism' },
  { id: 'adhd', label: 'ADHD' },
  { id: 'combined', label: 'Combined' },
  { id: 'children', label: 'Children' },
  { id: 'adults', label: 'Adults' },
  { id: 'nhs-updates', label: 'NHS / News / Updates' }
]

/** Maps a filter pill id to accepted category/tag identifiers (lowercase). */
export const FILTER_MATCHERS = {
  all: () => true,
  autism: (post) => matchesTopic(post, ['autism']),
  adhd: (post) => matchesTopic(post, ['adhd']),
  combined: (post) => matchesTopic(post, ['combined']),
  children: (post) => matchesTopic(post, ['children', 'child', 'kids', 'families']),
  adults: (post) => matchesTopic(post, ['adults', 'adult']),
  'nhs-updates': (post) => matchesTopic(post, ['nhs', 'news', 'updates', 'guidance', 'policy'])
}

function matchesTopic(post, needles) {
  const haystack = [
    post.category,
    ...(Array.isArray(post.tags) ? post.tags : [])
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())

  return haystack.some((value) =>
    needles.some((needle) => value.includes(needle))
  )
}

export const BLOG_LIST_PAGE_SIZE = 6

export const SITE_ORIGIN =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_ORIGIN
    ? String(import.meta.env.VITE_SITE_ORIGIN).replace(/\/$/, '')
    : 'https://www.novaclinics.co.uk'

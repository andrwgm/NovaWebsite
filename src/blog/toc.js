import GithubSlugger from 'github-slugger'

/**
 * @param {string} markdown
 * @returns {{ depth: number, text: string, id: string }[]}
 */
export function extractTocFromMarkdown(markdown) {
  const lines = String(markdown || '').split('\n')
  const slugger = new GithubSlugger()
  const items = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    const match = /^(#{2,3})\s+(.+)$/.exec(line)
    if (!match) continue

    const depth = match[1].length
    const text = match[2].replace(/\s+#+\s*$/, '').trim()
    if (!text) continue

    const id = slugger.slug(text)
    items.push({ depth, text, id })
  }

  return items
}

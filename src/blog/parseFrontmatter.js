import yaml from 'js-yaml'

/** Opening --- + YAML block + closing --- + body (rest of file). */
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/

/**
 * Parse YAML frontmatter from MD/Markdown/MDX (Tina-compatible).
 * Browser-safe (no Node Buffer).
 *
 * @param {string} source
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export function parseFrontmatter(source) {
  const text = String(source).replace(/^\uFEFF/, '')
  const match = text.match(FRONTMATTER)
  if (!match) {
    return { data: {}, content: text.trim() }
  }

  const rawYaml = match[1]
  const body = match[2]

  let data = {}
  try {
    const parsed = yaml.load(rawYaml)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      data = parsed
    }
  } catch {
    data = {}
  }

  return { data, content: body.trim() }
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function stringifyYamlScalar(value) {
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (value === null || value === undefined) {
    return ''
  }
  return String(value)
}

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'build')
const prerenderDir = path.join(outDir, '__prerender')
const blogDir = path.join(root, 'content', 'blog')

const STATIC_ROUTES = [
  '/',
  '/about',
  '/support',
  '/careers',
  '/blog',
  '/resources',
  '/best-practices',
  '/cookies-policy',
  '/privacy-policy',
  '/terms-and-conditions'
]

async function collectBlogRoutes() {
  let entries = []
  try {
    entries = await fs.readdir(blogDir)
  } catch {
    return []
  }

  const routes = []
  for (const fileName of entries) {
    if (!fileName.endsWith('.mdx')) continue
    const source = await fs.readFile(path.join(blogDir, fileName), 'utf8')
    if (/^draft:\s*true\s*$/m.test(source)) continue
    const slugMatch = source.match(/^slug:\s*['"]?([^'"\n]+)['"]?\s*$/m)
    if (!slugMatch) continue
    routes.push(`/blog/${slugMatch[1].trim()}`)
  }
  return routes.sort()
}

function routeToFile(route) {
  if (route === '/') return path.join(prerenderDir, 'index.html')
  return path.join(prerenderDir, route.replace(/^\//, ''), 'index.html')
}

function stripClientScripts(html) {
  return html
    .replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script type="module"[^>]*\/>/gi, '')
    .replace(/<link rel="modulepreload"[^>]*>/gi, '')
}

function stripTagByStart(html, startToken) {
  const start = html.indexOf(startToken)
  if (start === -1) return html
  const end = html.indexOf('>', start)
  if (end === -1) return html
  return `${html.slice(0, start)}${html.slice(end + 1)}`
}

function helmetText(tagHtml = '') {
  return tagHtml.replace(/<[^>]+>/g, '').trim()
}

function applyHelmet(template, appHtml, helmet) {
  let html = template
  const helmetPriority = helmet?.priority?.toString?.() || ''
  const helmetMeta = helmet?.meta?.toString?.() || ''
  const helmetLink = helmet?.link?.toString?.() || ''
  const helmetTitle = helmet?.title?.toString?.() || ''
  const helmetHead = `${helmetPriority}${helmetTitle}${helmetMeta}${helmetLink}`

  if (helmetText(helmetTitle)) {
    html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/, helmetTitle)
  }

  if (helmetHead.includes('name="description"') || helmetHead.includes("name='description'")) {
    html = stripTagByStart(html, '<meta name="description"')
  }

  if (helmetHead.includes('rel="canonical"') || helmetHead.includes("rel='canonical'")) {
    html = stripTagByStart(html, '<link rel="canonical"')
  }

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  const extraHead = [
    helmetPriority,
    helmetMeta,
    helmetLink,
    helmet?.script?.toString?.() || ''
  ]
    .join('\n')
    .trim()

  if (extraHead) {
    html = html.replace('</head>', `${extraHead}\n  </head>`)
  }

  return stripClientScripts(html)
}

async function collectStylesheetLinks() {
  const assetsDir = path.join(outDir, 'assets')
  let files = []
  try {
    files = await fs.readdir(assetsDir)
  } catch {
    return ''
  }

  return files
    .filter((fileName) => fileName.endsWith('.css'))
    .sort()
    .map((fileName) => `<link rel="stylesheet" href="/assets/${fileName}">`)
    .join('\n    ')
}

async function main() {
  const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8')
  const extraCss = await collectStylesheetLinks()
  const routes = [...STATIC_ROUTES, ...(await collectBlogRoutes())]

  const vite = await createServer({
    root,
    mode: 'production',
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  })

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
    await fs.rm(prerenderDir, { recursive: true, force: true })

    for (const route of routes) {
      const { html: appHtml, helmet } = await render(route)
      let pageHtml = applyHelmet(template, appHtml, helmet)
      if (extraCss) {
        const missingCss = extraCss
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && !pageHtml.includes(line))
        if (missingCss.length) {
          pageHtml = pageHtml.replace(
            '</head>',
            `    ${missingCss.join('\n    ')}\n  </head>`
          )
        }
      }
      pageHtml = pageHtml.replace(
        '<html lang="en">',
        '<html lang="en" data-prerender="true">'
      )

      const filePath = routeToFile(route)
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, pageHtml)
      console.log(`prerendered ${route} -> ${path.relative(root, filePath)}`)
    }
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

const BOT_UA =
  /Googlebot|Google-InspectionTool|Storebot-Google|GoogleOther|AdsBot-Google|APIs-Google|Mediapartners-Google|Google-Read-Aloud|Bingbot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Applebot|Bytespider|SemrushBot|AhrefsBot|DotBot|MJ12bot|PetalBot|ia_archiver/i

const STAGING_ROBOTS = 'User-agent: *\nDisallow: /\n'

function prerenderAssetPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/') return '/__prerender/index.html'
  return `/__prerender${clean}/index.html`
}

function isNonProductionHost(hostname) {
  const host = (hostname || '').toLowerCase()
  return host === 'test.novaclinics.co.uk' || host.endsWith('.pages.dev')
}

function stagingRobotsResponse() {
  return new Response(STAGING_ROBOTS, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'private, no-store'
    }
  })
}

function withStagingRobotsTag(response) {
  const headers = new Headers(response.headers)
  headers.set('x-robots-tag', 'noindex, nofollow')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

async function prerenderIfBot(context) {
  try {
    const userAgent = context.request.headers.get('user-agent') || ''
    if (!BOT_UA.test(userAgent) || !context.env?.ASSETS) {
      return context.next()
    }

    const url = new URL(context.request.url)
    if (url.pathname.startsWith('/__prerender/')) {
      return context.next()
    }

    if (/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('.html')) {
      return context.next()
    }

    const assetUrl = new URL(prerenderAssetPath(url.pathname), url.origin)
    const assetResponse = await context.env.ASSETS.fetch(assetUrl)

    if (!assetResponse.ok) {
      return context.next()
    }

    const headers = new Headers(assetResponse.headers)
    headers.set('content-type', 'text/html; charset=utf-8')
    headers.set('x-nova-prerender', '1')
    headers.set('cache-control', 'public, max-age=300')

    return new Response(assetResponse.body, {
      status: 200,
      headers
    })
  } catch {
    return context.next()
  }
}

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const nonProd = isNonProductionHost(url.hostname)

  if (nonProd && url.pathname === '/robots.txt') {
    return stagingRobotsResponse()
  }

  const response = await prerenderIfBot(context)
  return nonProd ? withStagingRobotsTag(response) : response
}

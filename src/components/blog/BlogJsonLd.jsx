import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_ORIGIN } from '../../blog/blogConfig'

// react-helmet-async only reads a script's body from its text children. With
// dangerouslySetInnerHTML the tag came out empty and was dropped, in the
// prerender and in the browser. "<" is escaped so content can never close the tag.
function serializeJsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}

export default function BlogJsonLd({ schema }) {
  if (!schema) return null
  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  )
}

export function buildArticleJsonLd(post, canonicalUrl) {
  const url = canonicalUrl
  const image = post.ogImage || post.coverImage
  const imageUrl = image?.startsWith('http') ? image : `${SITE_ORIGIN}${image}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nova Clinics',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/images/topbar_logo.avif`
      }
    },
    mainEntityOfPage: url,
    image: [imageUrl],
    url
  }
}

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_ORIGIN } from '../../blog/blogConfig'

export default function BlogSeo({
  title,
  description,
  canonicalUrl,
  ogImage,
  noindex,
  ogType = 'article'
}) {
  const url = canonicalUrl || SITE_ORIGIN
  const image = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_ORIGIN}${ogImage}`
    : `${SITE_ORIGIN}/images/topbar_logo.avif`

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
    </Helmet>
  )
}

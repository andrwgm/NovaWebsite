import React from 'react'
import { Link } from 'react-router-dom'
import { formatBlogDate, formatNumber } from '../../utils/formatBlogDate'

export default function BlogFeaturedCard({ post }) {
  if (!post) return null

  return (
    <section className="blog-featured" aria-label="Featured article">
      <div className="blog-featured__media">
        <img src={post.coverImage} alt="" loading="lazy" decoding="async" />
        <div className="blog-featured__overlay" />
        <div className="blog-featured__content">
          <span className="blog-pill blog-pill--on-dark">{post.category}</span>
          <h2 className="blog-featured__title">{post.title}</h2>
          <p className="blog-featured__excerpt">{post.excerpt}</p>
          <Link className="blog-button blog-button--on-dark" to={`/blog/${post.slug}`}>
            Read article
          </Link>
        </div>
      </div>
      <div className="blog-featured__meta">
        <span>{post.category}</span>
        <span className="blog-featured__sep" aria-hidden="true">
          |
        </span>
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span className="blog-featured__sep" aria-hidden="true">
          |
        </span>
        <span>{post.readingTime} min read</span>
        <span className="blog-featured__sep" aria-hidden="true">
          |
        </span>
        <span>{formatNumber(post.viewCount || 0)} views</span>
      </div>
    </section>
  )
}

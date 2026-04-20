import React from 'react'
import { Link } from 'react-router-dom'
import { formatBlogDate } from '../../utils/formatBlogDate'

export default function BlogPostRowCard({ post }) {
  return (
    <article className="blog-row">
      <Link className="blog-row__link" to={`/blog/${post.slug}`} aria-labelledby={`blog-row-title-${post.slug}`}>
        <div className="blog-row__body">
          <span className="blog-pill blog-pill--inline">{post.category}</span>
          <h2 id={`blog-row-title-${post.slug}`} className="blog-row__title">
            {post.title}
          </h2>
          <p className="blog-row__excerpt">{post.excerpt}</p>
          {post.tags?.length ? (
            <ul className="blog-row__tags" aria-label="Tags">
              {post.tags.slice(0, 4).map((tag) => (
                <li key={tag} className="blog-row__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="blog-row__meta">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <span className="blog-row__cta">Read article</span>
        </div>
        <div className="blog-row__media">
          <img src={post.coverImage} alt="" loading="lazy" decoding="async" />
        </div>
      </Link>
    </article>
  )
}

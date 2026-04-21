import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatBlogDate } from '../../utils/formatBlogDate'

export default function BlogSidebar({ popularTopics, miniPost }) {
  const [email, setEmail] = useState('')

  return (
    <aside className="blog-sidebar" aria-label="Blog sidebar">
      <section className="blog-card blog-card--newsletter">
        <h2 className="blog-card__title">Stay updated</h2>
        <p className="blog-card__text">Subscribe to receive new articles and clinical guidance updates from Nova Clinics.</p>
        <form
          className="blog-newsletter"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label className="sr-only" htmlFor="blog-newsletter-email">
            Email address
          </label>
          <input
            id="blog-newsletter-email"
            className="blog-input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="blog-button blog-button--block">
            Subscribe
          </button>
          <p className="blog-card__fineprint">This is a UI placeholder—wire your email provider when ready.</p>
        </form>
      </section>

      <section className="blog-card">
        <h2 className="blog-card__title">Popular topics</h2>
        <ul className="blog-topics">
          {popularTopics.map((topic) => (
            <li key={topic.label} className="blog-topics__row">
              <span className="blog-topics__label">{topic.label}</span>
              <span className="blog-topics__count">{topic.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="blog-card blog-card--cta">
        <h2 className="blog-card__title">Need an assessment?</h2>
        <p className="blog-card__text">
          Private online autism and ADHD assessments for children and adults across the UK—clear process and qualified clinicians.
        </p>
        <Link className="blog-button blog-button--block" to="/">
          Learn about assessments
        </Link>
      </section>

      {miniPost ? (
        <section className="blog-card blog-card--mini" aria-label="Highlighted article">
          <Link className="blog-mini" to={`/blog/${miniPost.slug}`}>
            <div className="blog-mini__media">
              <img src={miniPost.coverImage} alt="" loading="lazy" decoding="async" />
            </div>
            <span className="blog-pill blog-pill--inline">{miniPost.category}</span>
            <h3 className="blog-mini__title">{miniPost.title}</h3>
            <p className="blog-mini__excerpt">{miniPost.excerpt}</p>
            <div className="blog-mini__meta">
              <span>{formatBlogDate(miniPost.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{miniPost.readingTime} min read</span>
            </div>
          </Link>
        </section>
      ) : null}
    </aside>
  )
}

export function BlogPostSidebar({ miniPost, relatedPosts }) {
  const [email, setEmail] = useState('')

  return (
    <aside className="blog-sidebar" aria-label="Article sidebar">
      <section className="blog-card blog-card--newsletter blog-card--newsletter-strong">
        <h2 className="blog-card__title">Stay updated</h2>
        <p className="blog-card__text">Get our latest blog posts straight to your inbox.</p>
        <form
          className="blog-newsletter"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label className="sr-only" htmlFor="blog-post-newsletter-email">
            Email address
          </label>
          <input
            id="blog-post-newsletter-email"
            className="blog-input blog-input--on-teal"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="blog-button blog-button--block">
            Subscribe
          </button>
        </form>
      </section>

      <section className="blog-card">
        <h2 className="blog-card__title">Related articles</h2>
        {relatedPosts.length ? (
          <ul className="blog-related">
            {relatedPosts.map((related) => (
              <li key={related.slug} className="blog-related__item">
                <Link className="blog-related__link" to={`/blog/${related.slug}`}>
                  <div className="blog-related__thumb">
                    <img src={related.coverImage} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="blog-related__body">
                    <p className="blog-related__title">{related.title}</p>
                    <p className="blog-related__meta">
                      {formatBlogDate(related.publishedAt)} · {related.readingTime} min read
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="blog-card__text">More related articles will appear here as the library grows.</p>
        )}
      </section>

      <section className="blog-card blog-card--cta">
        <h2 className="blog-card__title">Assessments at Nova</h2>
        <p className="blog-card__text">If reading turns into questions, our team can help you choose a suitable pathway.</p>
        <Link className="blog-button blog-button--block" to="/">
          Explore assessments
        </Link>
      </section>

      {miniPost ? (
        <section className="blog-card blog-card--mini" aria-label="Highlighted article">
          <Link className="blog-mini" to={`/blog/${miniPost.slug}`}>
            <div className="blog-mini__media">
              <img src={miniPost.coverImage} alt="" loading="lazy" decoding="async" />
            </div>
            <span className="blog-pill blog-pill--inline">{miniPost.category}</span>
            <h3 className="blog-mini__title">{miniPost.title}</h3>
            <p className="blog-mini__excerpt">{miniPost.excerpt}</p>
            <div className="blog-mini__meta">
              <span>{formatBlogDate(miniPost.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{miniPost.readingTime} min read</span>
            </div>
          </Link>
        </section>
      ) : null}
    </aside>
  )
}

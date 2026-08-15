import React from 'react'

export default function BlogHero({ query, onQueryChange }) {
  return (
    <header className="blog-hero">
      <div className="blog-hero__grid">
        <div className="blog-hero__copy">
          <p className="blog-hero__eyebrow">Nova Clinics blog</p>
          <h1 className="blog-hero__title">Insights and guidance for neurodiverse journeys</h1>
          <p className="blog-hero__subtitle">
            Practical, respectful articles on autism, ADHD, assessments, and family life—written to support confident next steps.
          </p>

          <form
            className="blog-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <label className="sr-only" htmlFor="blog-search-input">
              Search articles
            </label>
            <input
              id="blog-search-input"
              className="blog-search__input"
              type="search"
              placeholder="Search by title, topic, or keyword"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="blog-search__button" aria-label="Search">
              <i className="pi pi-search" aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="blog-hero__media" aria-hidden="true">
          <img src="/images/beach-kid.avif" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </header>
  )
}

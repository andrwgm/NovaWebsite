import React from 'react'

export default function BlogTableOfContents({ items }) {
  if (!items.length) return null

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <p className="blog-toc__title">Table of contents</p>
      <ol className="blog-toc__list">
        {items.map((item) => (
          <li key={`${item.id}-${item.text}`} className={`blog-toc__item blog-toc__item--depth-${item.depth}`}>
            <a className="blog-toc__link" href={`#${item.id}`}>
              <span>{item.text}</span>
              <span className="blog-toc__chevron" aria-hidden="true">
                ›
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

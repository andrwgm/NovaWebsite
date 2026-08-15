import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogBreadcrumbs({ items }) {
  return (
    <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol className="blog-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="blog-breadcrumbs__item">
              {!isLast && item.to ? (
                <Link className="blog-breadcrumbs__link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className="blog-breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="blog-breadcrumbs__sep" aria-hidden="true">{'>'}</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

import React from 'react'
import { BLOG_FILTER_CATEGORIES } from '../../blog/blogConfig'

export default function BlogCategoryFilters({ activeId, onChange }) {
  return (
    <div className="blog-filters" role="tablist" aria-label="Filter articles by topic">
      <div className="blog-filters__scroll">
        {BLOG_FILTER_CATEGORIES.map((category) => {
          const isActive = category.id === activeId
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`blog-pill blog-pill--filter${isActive ? ' is-active' : ''}`}
              onClick={() => onChange(category.id)}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

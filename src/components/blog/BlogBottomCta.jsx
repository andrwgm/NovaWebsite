import React from 'react'
import { Link } from 'react-router-dom'
export default function BlogBottomCta() {
  return (
    <section className="blog-bottom-cta" aria-label="Assessment call to action">
      <div className="blog-bottom-cta__grid">
        <div className="blog-bottom-cta__media" aria-hidden="true">
          <img src="/images/beach-kid.avif" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="blog-bottom-cta__copy">
          <h2 className="blog-bottom-cta__title">Concerned about your child&apos;s development?</h2>
          <p className="blog-bottom-cta__text">
            A thoughtful assessment can bring clarity—not labels for their own sake, but practical understanding and next steps.
          </p>
          <Link className="blog-button" to="/">
            Get an assessment
          </Link>
        </div>
      </div>
    </section>
  )
}

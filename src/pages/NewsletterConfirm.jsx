import React, { useState } from 'react'
import { BLOG_NEWSLETTER_ENDPOINT } from '../utils/api'
import BlogSeo from '../components/blog/BlogSeo'
import '../components/blog/blog.css'

function tokenFromHash() {
  if (typeof window === 'undefined') return ''
  return decodeURIComponent(window.location.hash.replace(/^#/, '')).trim()
}

export default function NewsletterConfirm() {
  const [phase, setPhase] = useState('ready')

  const confirm = async () => {
    const token = tokenFromHash()
    if (!token) {
      setPhase('invalid')
      return
    }
    setPhase('working')
    try {
      const response = await fetch(`${BLOG_NEWSLETTER_ENDPOINT}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ token }),
      })
      setPhase(response.ok ? 'confirmed' : 'invalid')
    } catch {
      setPhase('error')
    }
  }

  let title = 'Confirm your subscription'
  let body = 'Confirm this address and we will email you when Nova Clinics publishes a new blog article.'
  if (phase === 'confirmed') {
    title = 'You are confirmed'
    body = 'We will email this address when a new article is published, and nowhere else.'
  } else if (phase === 'invalid') {
    title = 'This link has expired'
    body = 'Request a new confirmation from the blog. If you already confirmed, you are on the list.'
  } else if (phase === 'error') {
    body = 'We could not confirm that just now. Please try again.'
  }

  return (
    <div className="blog-page">
      <BlogSeo
        title="Confirm your subscription | Nova Clinics"
        description="Confirm your Nova Clinics blog newsletter email."
        canonicalUrl="https://www.novaclinics.co.uk/newsletter/confirm"
        noindex
        ogType="website"
      />
      <div className="blog-container blog-container--post">
        <article className="newsletter-confirm">
          <h1>{title}</h1>
          <p>{body}</p>
          {phase === 'ready' || phase === 'working' || phase === 'error' ? (
            <button
              type="button"
              className="blog-button"
              onClick={confirm}
              disabled={phase === 'working'}
            >
              {phase === 'working' ? 'Confirming…' : 'Confirm subscription'}
            </button>
          ) : null}
        </article>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { BLOG_NEWSLETTER_ENDPOINT } from '../utils/api'
import BlogSeo from '../components/blog/BlogSeo'
import '../components/blog/blog.css'

function tokenFromHash() {
  if (typeof window === 'undefined') return ''
  return decodeURIComponent(window.location.hash.replace(/^#/, '')).trim()
}

export default function NewsletterUnsubscribe() {
  const [phase, setPhase] = useState('ready')

  const unsubscribe = async () => {
    const token = tokenFromHash()
    if (!token) {
      setPhase('invalid')
      return
    }
    setPhase('working')
    try {
      const response = await fetch(`${BLOG_NEWSLETTER_ENDPOINT}/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ token }),
      })
      setPhase(response.ok ? 'done' : 'invalid')
    } catch {
      setPhase('error')
    }
  }

  let title = 'Unsubscribe'
  let body = 'Stop emails about new Nova Clinics blog articles. This does not affect any other messages from the clinic.'
  if (phase === 'done') {
    title = 'You are unsubscribed'
    body = 'We will not email this address when a new article is published.'
  } else if (phase === 'invalid') {
    title = 'This link has expired'
    body = 'Email team@novaclinics.co.uk and we will remove the address.'
  } else if (phase === 'error') {
    body = 'We could not unsubscribe that just now. Please try again.'
  }

  return (
    <div className="blog-page">
      <BlogSeo
        title="Unsubscribe | Nova Clinics"
        description="Unsubscribe from Nova Clinics blog emails."
        canonicalUrl="https://www.novaclinics.co.uk/newsletter/unsubscribe"
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
              onClick={unsubscribe}
              disabled={phase === 'working'}
            >
              {phase === 'working' ? 'Unsubscribing…' : 'Unsubscribe'}
            </button>
          ) : null}
        </article>
      </div>
    </div>
  )
}

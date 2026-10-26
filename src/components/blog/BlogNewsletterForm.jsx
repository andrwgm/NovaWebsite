import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BLOG_NEWSLETTER_ENDPOINT } from '../../utils/api'
import { TURNSTILE_NEWSLETTER_ACTION, TURNSTILE_SITE_KEY, whenTurnstileReady } from '../../utils/turnstile'

const ACCEPTED_MESSAGE = 'Check your inbox to confirm. If you do not see it, look in spam.'

function messageForStatus(status) {
  if (status === 422) return 'Enter a valid email address.'
  if (status === 429) return 'Please wait a moment and try again.'
  if (status === 403) return 'Please try that again.'
  if (status === 503) return 'We could not send the confirmation just now. Please try again.'
  return 'Something went wrong. Please try again.'
}

export default function BlogNewsletterForm({ inputClassName = '' }) {
  const { slug } = useParams()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageTone, setMessageTone] = useState('')
  const [armChallenge, setArmChallenge] = useState(false)
  const turnstileContainerRef = useRef(null)
  const turnstileWidgetIdRef = useRef(null)

  useEffect(() => {
    if (!armChallenge) {
      return undefined
    }
    setTurnstileToken('')
    let cancelled = false
    const cancelReadyWait = whenTurnstileReady(() => {
      if (cancelled || !turnstileContainerRef.current || !window.turnstile?.render) {
        return
      }
      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: TURNSTILE_NEWSLETTER_ACTION,
        theme: 'light',
        size: 'flexible',
        appearance: 'interaction-only',
        language: 'en',
        'refresh-expired': 'auto',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
        'timeout-callback': () => setTurnstileToken(''),
      })
      if (cancelled) {
        window.turnstile.remove(widgetId)
        return
      }
      turnstileWidgetIdRef.current = widgetId
    })
    return () => {
      cancelled = true
      cancelReadyWait()
      if (turnstileWidgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
      }
      turnstileWidgetIdRef.current = null
      setTurnstileToken('')
    }
  }, [armChallenge])

  const resetTurnstile = () => {
    setTurnstileToken('')
    if (turnstileWidgetIdRef.current && window.turnstile?.reset) {
      window.turnstile.reset(turnstileWidgetIdRef.current)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const address = email.trim()
    if (!address || !address.includes('@')) {
      setMessageTone('error')
      setMessage('Enter a valid email address.')
      return
    }
    if (!turnstileToken) {
      setArmChallenge(true)
      setMessageTone('error')
      setMessage('Please wait a moment and try again.')
      return
    }
    setSubmitting(true)
    setMessage('')
    try {
      const response = await fetch(`${BLOG_NEWSLETTER_ENDPOINT}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: address,
          source: slug ? 'blog_post' : 'blog_index',
          source_slug: slug || null,
          turnstile_token: turnstileToken,
          website,
        }),
      })
      if (!response.ok) {
        setMessageTone('error')
        setMessage(messageForStatus(response.status))
        resetTurnstile()
        return
      }
      setEmail('')
      setArmChallenge(false)
      setMessageTone('ok')
      setMessage(ACCEPTED_MESSAGE)
      resetTurnstile()
    } catch {
      setMessageTone('error')
      setMessage('Something went wrong. Please try again.')
      resetTurnstile()
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = ['blog-input', inputClassName].filter(Boolean).join(' ')

  return (
    <form className="blog-newsletter" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={slug ? 'blog-post-newsletter-email' : 'blog-newsletter-email'}>
        Email address
      </label>
      <input
        id={slug ? 'blog-post-newsletter-email' : 'blog-newsletter-email'}
        className={inputClass}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email address"
        value={email}
        required
        disabled={submitting}
        onChange={(event) => setEmail(event.target.value)}
        onFocus={() => setArmChallenge(true)}
      />
      <div className="blog-newsletter__hp" aria-hidden="true">
        <label htmlFor={slug ? 'blog-post-newsletter-website' : 'blog-newsletter-website'}>Website</label>
        <input
          id={slug ? 'blog-post-newsletter-website' : 'blog-newsletter-website'}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      {armChallenge ? <div ref={turnstileContainerRef} className="blog-newsletter__turnstile" /> : null}
      <button type="submit" className="blog-button blog-button--block" disabled={submitting}>
        {submitting ? 'Sending…' : 'Subscribe'}
      </button>
      <p className="blog-card__fineprint">
        We email a confirmation first. After that, one message each time we publish an article.
      </p>
      {message ? (
        <p className={`blog-newsletter__status blog-newsletter__status--${messageTone}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  )
}

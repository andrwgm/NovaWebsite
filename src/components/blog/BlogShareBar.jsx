import React, { useState } from 'react'

function encode(value) {
  return encodeURIComponent(String(value || ''))
}

async function copyToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.position = 'absolute'
  input.style.left = '-9999px'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  input.remove()
}

export default function BlogShareBar({ title, url }) {
  const [copied, setCopied] = useState(false)

  const whatsappUrl = `https://wa.me/?text=${encode(`${title} ${url}`)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(url)}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encode(title)}&url=${encode(url)}`

  const handleCopy = async () => {
    try {
      await copyToClipboard(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleNativeShare = async () => {
    if (!navigator?.share) return
    try {
      await navigator.share({ title, url })
    } catch {
      // User cancelled share dialog.
    }
  }

  return (
    <section className="blog-share" aria-label="Share this article">
      <div className="blog-share__head">
        <h2 className="blog-share__title">Enjoyed this article?</h2>
        <p className="blog-share__subtitle">Share it with someone who might find it useful.</p>
      </div>

      <div className="blog-share__actions">
        <button type="button" className="blog-share__button" onClick={handleCopy}>
          <i className="pi pi-copy" aria-hidden="true" />
          <span>{copied ? 'Link copied' : 'Copy link'}</span>
        </button>

        <a className="blog-share__button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <i className="pi pi-whatsapp" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <a className="blog-share__button" href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <i className="pi pi-facebook" aria-hidden="true" />
          <span>Facebook</span>
        </a>

        <a className="blog-share__button" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <i className="pi pi-linkedin" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>

        <a className="blog-share__button" href={xUrl} target="_blank" rel="noopener noreferrer">
          <span className="blog-share__x" aria-hidden="true">
            X
          </span>
          <span>X / Twitter</span>
        </a>

        {navigator?.share ? (
          <button type="button" className="blog-share__button" onClick={handleNativeShare}>
            <i className="pi pi-share-alt" aria-hidden="true" />
            <span>More options</span>
          </button>
        ) : null}
      </div>
    </section>
  )
}

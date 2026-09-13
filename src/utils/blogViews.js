"""Record one public blog post hit. No cookie, no identity, fail closed."""

import { API_BASE_URL } from './api';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function shouldSkipHit() {
  if (typeof window === 'undefined') {
    return true;
  }
  if (document.documentElement?.dataset?.prerender === 'true') {
    return true;
  }
  return false;
}

export function recordBlogPostHit(slug) {
  const value = String(slug || '').trim();
  if (shouldSkipHit() || !SLUG_RE.test(value)) {
    return;
  }

  const url = `${API_BASE_URL}/api/v1/blog/posts/${encodeURIComponent(value)}/views`;
  try {
    fetch(url, {
      method: 'POST',
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    }).catch(() => {});
  } catch {
    // Hits are best-effort. Never block reading the article.
  }
}

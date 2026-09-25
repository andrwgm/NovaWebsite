export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFCG9r8jPfyiMJ7c';

export const TURNSTILE_CONTACT_ACTION = 'contact';

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-api';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const TURNSTILE_READY_TIMEOUT_MS = 10_000;

export function ensureTurnstileScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (window.turnstile?.render) {
    return;
  }

  if (
    document.getElementById(TURNSTILE_SCRIPT_ID) ||
    document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
  ) {
    return;
  }

  const script = document.createElement('script');
  script.id = TURNSTILE_SCRIPT_ID;
  script.src = TURNSTILE_SCRIPT_SRC;
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  document.head.appendChild(script);
}

export function whenTurnstileReady(onReady) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  ensureTurnstileScript();

  if (window.turnstile?.render) {
    onReady();
    return () => {};
  }

  if (typeof window.turnstile?.ready === 'function') {
    window.turnstile.ready(onReady);
    return () => {};
  }

  const startedAt = Date.now();
  const timer = window.setInterval(() => {
    if (window.turnstile?.render) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - startedAt > TURNSTILE_READY_TIMEOUT_MS) {
      window.clearInterval(timer);
    }
  }, 50);

  return () => window.clearInterval(timer);
}

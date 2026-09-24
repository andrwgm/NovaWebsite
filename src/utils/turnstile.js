export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFCG9r8jPfyiMJ7c';

export const TURNSTILE_CONTACT_ACTION = 'contact';

export function whenTurnstileReady(onReady) {
  if (typeof window === 'undefined') {
    return () => {};
  }

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
    if (Date.now() - startedAt > 10_000) {
      window.clearInterval(timer);
    }
  }, 50);

  return () => window.clearInterval(timer);
}

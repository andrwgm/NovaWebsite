import { useEffect, useState } from 'react';

export const useDeferredRender = ({
  delayMs = 1200,
  idleTimeoutMs = 2500,
  immediate = false,
} = {}) => {
  const [isReady, setIsReady] = useState(immediate);

  useEffect(() => {
    if (immediate || isReady) {
      setIsReady(true);
      return undefined;
    }

    let idleId;
    const timerId = setTimeout(() => setIsReady(true), delayMs);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setIsReady(true), { timeout: idleTimeoutMs });
    }

    return () => {
      clearTimeout(timerId);
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delayMs, idleTimeoutMs, immediate, isReady]);

  return isReady;
};

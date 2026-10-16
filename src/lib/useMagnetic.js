import { useEffect } from 'react';

export default function useMagnetic(ref, active = true) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !active) {
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const engageRadius = 100;
    const releaseRadius = 176;
    const strength = 0.78;
    const maxPull = 54;
    const stiffness = 210;
    const damping = 24;

    let frame = 0;
    let running = false;
    let engaged = false;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastTime = 0;

    const tick = (time) => {
      const dt = Math.min(0.032, lastTime ? (time - lastTime) / 1000 : 0.016);
      lastTime = time;
      const forceX = (targetX - currentX) * stiffness - velocityX * damping;
      const forceY = (targetY - currentY) * stiffness - velocityY * damping;
      velocityX += forceX * dt;
      velocityY += forceY * dt;
      currentX += velocityX * dt;
      currentY += velocityY * dt;
      node.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.2 && Math.hypot(velocityX, velocityY) < 0.2;
      if (settled && targetX === 0 && targetY === 0) {
        currentX = 0;
        currentY = 0;
        velocityX = 0;
        velocityY = 0;
        node.style.transform = '';
        running = false;
        lastTime = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - currentX;
      const centerY = rect.top + rect.height / 2 - currentY;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (!engaged && distance < engageRadius) {
        engaged = true;
      } else if (engaged && distance > releaseRadius) {
        engaged = false;
      }

      if (engaged && distance > 0) {
        const pull = Math.min(maxPull, distance * strength);
        const scale = pull / distance;
        targetX = dx * scale;
        targetY = dy * scale;
      } else {
        targetX = 0;
        targetY = 0;
      }
      start();
    };

    const release = () => {
      engaged = false;
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('blur', release);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', release);
      cancelAnimationFrame(frame);
      node.style.transform = '';
    };
  }, [ref, active]);
}

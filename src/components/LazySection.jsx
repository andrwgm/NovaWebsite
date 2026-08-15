import React, { useEffect, useRef, useState } from 'react';

const LazySection = React.forwardRef(function LazySection(
  {
    children,
    className,
    forceVisible = false,
    id,
    minHeight,
    rootMargin = '200px 0px',
  },
  forwardedRef
) {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const localRef = useRef(null);

  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
    }
  }, [forceVisible]);

  useEffect(() => {
    if (isVisible) return undefined;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );

    const node = localRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  return (
    <div
      id={id}
      className={className}
      ref={setRefs}
      style={minHeight ? { minHeight } : undefined}
    >
      {isVisible ? children : null}
    </div>
  );
});

export default LazySection;

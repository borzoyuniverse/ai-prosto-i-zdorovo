import { Ref, useRef, useSyncExternalStore } from 'react';

export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit,
): [Ref<T>, boolean] {
  const targetRef = useRef<T>(null);

  const getSnapshot = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    }
    return false;
  };

  const subscribe = (callback: () => void) => {
    const observer = new IntersectionObserver(callback, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  };

  const isVisible = useSyncExternalStore(subscribe, getSnapshot);

  return [targetRef, isVisible];
}

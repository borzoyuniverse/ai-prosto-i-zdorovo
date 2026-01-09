import { useCallback, useEffect, useRef, useState } from 'react';

type UseDividerNavigationProps = {
  dividerDates: string[];
  scrollContainer: React.RefObject<HTMLElement>;
};

export function useDividerNavigation({
  dividerDates,
  scrollContainer,
}: UseDividerNavigationProps) {
  const [activeDivider, setActiveDivider] = useState<string | null>(null);
  const [notActiveDivider, setNotActiveDivider] = useState<string | null>(null);
  const [floatingDate, setFloatingDate] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  // Трекинг направления скролла
  const prevScrollTop = useRef(0);
  const scrollDirection = useRef('down');

  // --- Определяем направление скролла ---
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const handleScroll = () => {
      const currentTop = container.scrollTop;

      if (currentTop > prevScrollTop.current) {
        scrollDirection.current = 'down';
      } else if (currentTop < prevScrollTop.current) {
        scrollDirection.current = 'up';
      }

      prevScrollTop.current = currentTop;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollContainer.current]);

  // --- IntersectionObserver для определения активного разделителя ---

  const observeDate = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;

      if (!observer.current) {
        observer.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const el = entry.target as HTMLElement;
              const date = el.dataset.date ?? null;

              if (entry.isIntersecting) {
                setActiveDivider(date);
              } else {
                setNotActiveDivider(date);
              }
            }
          },
          {
            root: scrollContainer.current,
          },
        );
      }

      observer.current.observe(el);

      return () => observer.current?.unobserve(el);
    },
    [scrollContainer],
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  // --- Вычисляем nextDivider ---
  useEffect(() => {
    if (!activeDivider || !notActiveDivider) return;

    if (scrollDirection.current === 'down') {
      setFloatingDate(notActiveDivider);
    } else {
      const index = dividerDates.indexOf(activeDivider);
      if (index === -1) return;

      setFloatingDate(dividerDates[index + 1] ?? null);
    }
  }, [activeDivider, notActiveDivider, dividerDates]);

  return {
    observeDate,
    floatingDate,
  };
}

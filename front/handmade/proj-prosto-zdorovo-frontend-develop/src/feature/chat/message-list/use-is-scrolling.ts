import { useEffect, useState } from 'react';

export const useIsScrolling = (boxRef: React.RefObject<HTMLElement>) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const box = boxRef.current;

    if (!box) return;

    const onScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    box.addEventListener('scroll', onScroll);

    return () => {
      box.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxRef.current]);

  return { isScrolling };
};

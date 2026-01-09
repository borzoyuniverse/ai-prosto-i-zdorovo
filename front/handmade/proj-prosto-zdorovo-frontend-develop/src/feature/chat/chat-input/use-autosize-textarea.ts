import { useLayoutEffect, useState } from 'react';

export const useAutosizeTextarea = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  value: string,
  maxRows = 8,
) => {
  const [curHeight, setCurHeight] = useState(16);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Сбрасываем высоту, чтобы правильно измерить scrollHeight
    el.style.height = 'auto';

    const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight, 10);
    const maxHeight = lineHeight * maxRows;

    // Высота, которую хочет textarea
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    setCurHeight(newHeight);

    el.style.height = `${newHeight}px`;

    // Включение/выключение внутреннего скролла
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, maxRows, textareaRef]);

  return { curHeight };
};

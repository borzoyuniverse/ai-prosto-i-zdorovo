import { useCallback, useRef } from 'react';

type Options<T extends HTMLElement> = {
  callback: (node: T) => void;
  cleanup?: () => void;
};

export function useRefCallback<T extends HTMLElement>({ callback, cleanup }: Options<T>) {
  const ref = useRef<T>();

  const setRef = useCallback(
    (node: T) => {
      if (ref.current) {
        cleanup?.();
      }

      if (node) callback(node);

      ref.current = node;
    },
    [callback, cleanup],
  );

  return [ref, setRef] as const;
}

import { useLayoutEffect, useRef, useState } from 'react';

export const useNow = (
  updateInterval: number,
  enabled: boolean,
  cb?: (now: number) => void,
) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!enabled) return;

    setNow(Date.now());
    cbRef.current?.(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
      cbRef.current?.(Date.now());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, enabled]);

  return now;
};

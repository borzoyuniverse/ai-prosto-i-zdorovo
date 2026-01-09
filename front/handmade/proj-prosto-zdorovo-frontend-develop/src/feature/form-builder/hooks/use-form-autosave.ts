import { useEffect, useRef } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

import debounce from 'lodash.debounce';

export const useFormAutosave = <T extends FieldValues>(
  onSave: (data: T) => void,
  delay = 800,
) => {
  const { watch } = useFormContext<T>();
  const isFirstRender = useRef(true);

  const debouncedSave = useRef(
    debounce((data: T) => {
      onSave(data);
    }, delay),
  ).current;

  useEffect(() => {
    const subscription = watch((values) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      debouncedSave(values as T);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, debouncedSave]);
};

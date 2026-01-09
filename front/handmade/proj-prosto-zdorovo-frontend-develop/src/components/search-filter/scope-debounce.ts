import { createContext, useContext } from 'react';

interface ScopeSearchFilterDebounceValue {
  debounceUpdateFilter: (paramName: string, value: unknown, flush?: boolean) => void;
  flush: () => void;
  isPending: () => boolean;
}

export const ScopeSearchFilterDebounceContext =
  createContext<ScopeSearchFilterDebounceValue>({
    debounceUpdateFilter() {
      throw new Error(
        'debounceUpdateFilter in ScopeSearchFilterDebounceContext must me provided',
      );
    },
    flush() {
      throw new Error('flush in ScopeSearchFilterDebounceContext must me provided');
    },
    isPending() {
      throw new Error('isPending in ScopeSearchFilterDebounceContext must me provided');
    },
  });

export function useScopeFilterDebounce() {
  const context = useContext(ScopeSearchFilterDebounceContext);

  if (!context) {
    throw new Error('ScopeSearchFilterDebounceContext must me provided');
  }

  return context;
}

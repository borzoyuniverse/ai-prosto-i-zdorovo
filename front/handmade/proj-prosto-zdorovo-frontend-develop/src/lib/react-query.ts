import { DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // throwOnError: true
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    retry(attempt) {
      // 4 попытки
      return attempt < 3;
    },
    retryDelay(attempt) {
      // 1s, 2s, 4s, 8s
      const baseDelay = 1000;
      return baseDelay * Math.pow(2, attempt);
    },
  },
} satisfies DefaultOptions;

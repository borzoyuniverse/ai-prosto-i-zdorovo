import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { queryConfig } from '@/lib/react-query';

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function AppProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

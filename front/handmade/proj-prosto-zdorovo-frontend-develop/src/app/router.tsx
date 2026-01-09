import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { RouterProvider as RouterContextProvider } from '@tanstack/react-router';

import { router } from '@/lib/router-config';

export function RouterProvider() {
  const queryClient = useQueryClient();

  const context = useMemo(() => ({ queryClient }), [queryClient]);

  return <RouterContextProvider router={router} context={context} />;
}

import { type PropsWithChildren, useCallback, useMemo, useRef } from 'react';

import { FileRoutesByFullPath } from '@/app/routeTree.gen';
import { type AnyRoute, useNavigate } from '@tanstack/react-router';
import { useDebounceCallback } from 'usehooks-ts';

import { ScopeSearchFilterDebounceContext } from './scope-debounce';

type Props = {
  delay?: number;
  from: keyof FileRoutesByFullPath;
};

type FilterChanges<Route extends Routes> = Partial<
  Extract<FileRoutesByFullPath[Route], AnyRoute>['types']['fullSearchSchema']
>;

type Routes = keyof FileRoutesByFullPath;

export function ScopeDebounceProvider<Route extends Routes>({
  children,
  delay = 1000,
  from,
}: PropsWithChildren<Props>) {
  const navigate = useNavigate({
    from,
  });
  const pendingChangesRef = useRef<FilterChanges<Route>>({});

  const applyChangesToRouter = useCallback(() => {
    navigate({
      from,
      replace: true,
      search: (prev) => ({ ...prev, ...pendingChangesRef.current }),
    });

    pendingChangesRef.current = {};
  }, [from, navigate]);

  const debouncedUpdate = useDebounceCallback(applyChangesToRouter, delay);

  const debounceUpdateFilter = useCallback(
    (paramName: string, value: unknown, flush = false) => {
      pendingChangesRef.current = {
        ...pendingChangesRef.current,
        [paramName]: value,
      };
      debouncedUpdate();

      if (flush) {
        debouncedUpdate.flush();
      }
    },
    [debouncedUpdate],
  );

  const value = useMemo(
    () => ({
      debounceUpdateFilter,
      flush: debouncedUpdate.flush,
      isPending: debouncedUpdate.isPending,
    }),
    [debounceUpdateFilter, debouncedUpdate.flush, debouncedUpdate.isPending],
  );

  return (
    <ScopeSearchFilterDebounceContext.Provider value={value}>
      {children}
    </ScopeSearchFilterDebounceContext.Provider>
  );
}

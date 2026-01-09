import { useCallback, useEffect, useState } from 'react';

import type { FileRoutesById } from '@/app/routeTree.gen';
import { type AnyRoute, type FileRoutesByPath, useSearch } from '@tanstack/react-router';

import { useScopeFilterDebounce } from '@/components/search-filter/scope-debounce';

type Params<Route extends Routes> = {
  from: Route;
  select?: (
    search: Extract<FileRoutesById[Route], AnyRoute>['types']['fullSearchSchema'],
  ) => Record<string, unknown>;
};

type Routes = keyof FileRoutesByPath;

export function useSearchFilter<
  Route extends Routes,
  FilterType extends Record<string, unknown>,
>({ from, select }: Params<Route>) {
  const searchState = useSearch({ from, select });
  const { debounceUpdateFilter } = useScopeFilterDebounce();

  const [filter, setFilter] = useState<Record<string, unknown>>(searchState);

  useEffect(() => {
    setFilter(searchState);
  }, [searchState]);

  const syncSearch = useCallback(
    (filter: Partial<Record<string, unknown>>, flush = true) => {
      for (const [key, value] of Object.entries(filter)) {
        debounceUpdateFilter(key, value, flush);
      }
    },
    [debounceUpdateFilter],
  );

  const debouncedUpdate = useCallback(
    (value: Partial<FilterType>, flush = false) => {
      const newFilter: Record<string, unknown> = { ...filter, ...value };
      setFilter(newFilter);
      syncSearch(newFilter, flush);
    },
    [filter, syncSearch],
  );

  const internalUpdate = useCallback(
    (value: Partial<Record<string, unknown>>) => {
      const newFilter: Record<string, unknown> = { ...filter, ...value };
      setFilter(newFilter);
    },
    [filter],
  );

  return { filter, debouncedUpdate, syncSearch, internalUpdate };
}

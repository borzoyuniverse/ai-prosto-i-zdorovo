import { useCallback, useState } from 'react';

import { PAGE_SIZE } from '@/config/consts';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ObjectParamsUnion } from '../models';

import { basicPaginatedJsonRPCRequest } from './basic-jsonrpc-request';

type UseLazyInfiniteRPCQueryType<TData> = {
  method: string;
  params: ObjectParamsUnion;
  queryKeys?: string[];
  getNextPageParam: (
    lastPage: TData,
    allPages: TData[],
    lastPageParam: number,
  ) => number | undefined;
  select?: (data: InfiniteData<TData, number>) => TData;
};

export function useLazyInfiniteRPCQuery<TData>({
  method,
  params,
  queryKeys = [],
  getNextPageParam,
  select,
}: UseLazyInfiniteRPCQueryType<TData>) {
  const [enabled, setEnabled] = useState(false);

  const enable = useCallback(() => setEnabled(true), []);
  const disable = useCallback(() => setEnabled(false), []);
  const toggle = useCallback(() => setEnabled((prev) => !prev), []);

  const query = useInfiniteQuery({
    queryKey: [method, params, ...queryKeys] as const,
    queryFn: ({ pageParam, signal }) =>
      basicPaginatedJsonRPCRequest<TData>({
        method,
        params,
        pagination: { page: pageParam, pageSize: PAGE_SIZE },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam,
    select,
    enabled,
  });

  return { ...query, enable, disable, toggle };
}

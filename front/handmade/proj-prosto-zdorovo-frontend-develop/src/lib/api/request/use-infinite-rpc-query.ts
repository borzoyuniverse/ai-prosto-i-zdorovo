import { PAGE_SIZE } from '@/config/consts';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ObjectParamsUnion } from '../models';

import { basicPaginatedJsonRPCRequest } from './basic-jsonrpc-request';

type UseInfiniteRPCQueryType<TData> = {
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

export function useInfiniteRPCQuery<TData>({
  method,
  params,
  queryKeys = [],
  getNextPageParam,
  select,
}: UseInfiniteRPCQueryType<TData>) {
  return useInfiniteQuery({
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
  });
}

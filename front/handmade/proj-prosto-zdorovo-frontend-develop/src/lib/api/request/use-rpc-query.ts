import { useQuery } from '@tanstack/react-query';

import { BaseRPCQueryOptions, ObjectParamsUnion } from '../models';

import { basicJsonRPCRequest } from './basic-jsonrpc-request';

type UseRPCQueryOptions<
  TData,
  TParams extends ObjectParamsUnion,
> = BaseRPCQueryOptions<TData> & {
  method: string;
  params?: TParams;
  skipCache?: boolean;
};

export type UseExternalRPCQueryOptions<TData, TParams extends ObjectParamsUnion> = Omit<
  UseRPCQueryOptions<TData, TParams>,
  'method' | 'queryKey'
>;

export function useRPCQuery<TData, TParams extends ObjectParamsUnion>({
  method,
  params,
  skipCache = true,
  ...options
}: UseRPCQueryOptions<TData, TParams>) {
  return useQuery({
    ...options,
    queryKey: [method, { ...params }, skipCache, ...options.queryKey] as const,
    queryFn: ({ signal }) => {
      return basicJsonRPCRequest<TData>({ method, params, signal, skipCache });
    },
  });
}

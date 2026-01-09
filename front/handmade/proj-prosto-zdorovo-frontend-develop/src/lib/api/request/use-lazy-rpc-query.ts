import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { BaseRPCQueryOptions, ObjectParamsUnion } from '../models';

import { basicJsonRPCRequest } from './basic-jsonrpc-request';

export type UseLazyRPCQueryOptions<
  TData,
  TParams extends ObjectParamsUnion,
> = BaseRPCQueryOptions<TData> & {
  method: string;
  params: TParams;
  skipCache?: boolean;
  initialEnabled?: boolean;
};

export function useLazyRPCQuery<TData, TParams extends ObjectParamsUnion>({
  method,
  params,
  skipCache = true,
  initialEnabled = false,
  ...opts
}: UseLazyRPCQueryOptions<TData, TParams>) {
  const [enabled, setEnabled] = useState(initialEnabled);

  const enable = useCallback(() => setEnabled(true), []);
  const disable = useCallback(() => setEnabled(false), []);
  const toggle = useCallback(() => setEnabled((prev) => !prev), []);

  const query = useQuery({
    ...opts,
    queryKey: [method, { ...params }, skipCache, ...opts.queryKey] as const,
    queryFn: ({ signal }) =>
      basicJsonRPCRequest<TData>({ method, params, skipCache, signal }),
    enabled,
  });

  return { ...query, enable, disable, toggle };
}

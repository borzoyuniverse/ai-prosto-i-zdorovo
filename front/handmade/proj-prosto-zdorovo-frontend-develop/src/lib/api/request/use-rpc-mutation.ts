import { useMutation } from '@tanstack/react-query';

import { ObjectParamsUnion, UseRPCMutationHandlers } from '../models';

import { basicJsonRPCRequest } from './basic-jsonrpc-request';

type UseRPCMutationOptions = {
  method: string;
  queryKeys?: string[];
  skipCache?: boolean;
};

export type UseRPCMutationArgs<
  TData,
  TParams extends ObjectParamsUnion,
  TContext = unknown,
> = UseRPCMutationOptions & UseRPCMutationHandlers<TData, TParams, TContext>;

export function useRPCMutation<
  TData,
  TParams extends ObjectParamsUnion,
  TContext = unknown,
>({
  method,
  queryKeys = [],
  skipCache = true,
  onMutate,
  onError,
  onSettled,
  onSuccess,
}: UseRPCMutationArgs<TData, TParams, TContext>) {
  return useMutation({
    mutationKey: [method, ...queryKeys] as const,
    mutationFn: (params: TParams) =>
      basicJsonRPCRequest<TData>({ method, params, skipCache }),
    onMutate,
    onError,
    onSuccess,
    onSettled,
  });
}

import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type GetRulesResponse = {
  text: string;
};

type GetRulesRequest = Record<string, never>;

export function useGetRules({
  ...opts
}: UseExternalRPCQueryOptions<GetRulesResponse, GetRulesRequest> = {}) {
  return useRPCQuery({
    ...opts,
    queryKey: ['rules'] as const,
    method: useGetRules.method,
    params: {},
  });
}

useGetRules.method = 'get-rules';

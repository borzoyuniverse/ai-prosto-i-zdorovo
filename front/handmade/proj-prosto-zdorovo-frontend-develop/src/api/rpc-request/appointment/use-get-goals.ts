import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type GoalDto = {
  id: string;
  name: string;
  description: string;
  formId?: string;
};

type GetGoalsRequest = {
  consultationTypeId: string;
};

type GetGoalsResponse = {
  goals: GoalDto[];
};

export function useGetGoals({
  params,
  ...opts
}: UseExternalRPCQueryOptions<GetGoalsResponse, GetGoalsRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['goals'] as const,
    method: useGetGoals.method,
    params,
  });
}

useGetGoals.method = 'get-goals';

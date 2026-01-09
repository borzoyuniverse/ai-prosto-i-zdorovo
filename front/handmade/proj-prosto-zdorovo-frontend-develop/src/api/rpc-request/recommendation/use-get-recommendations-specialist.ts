import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

import { SpecialistTypeDto } from '../types';

type GetRecommendationsSpecialistRequest = { userId: string };
type GetRecommendationsSpecialistResponse = SpecialistTypeDto[];

export function useGetRecommendationsSpecialist({
  params,
  ...opts
}: UseExternalRPCQueryOptions<
  GetRecommendationsSpecialistResponse,
  GetRecommendationsSpecialistRequest
>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['recommendations-specialist'] as const,
    method: useGetRecommendationsSpecialist.method,
    params,
  });
}

useGetRecommendationsSpecialist.method = 'recommendations-specialist';

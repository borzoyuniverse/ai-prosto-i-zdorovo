import { PAGE_SIZE } from '@/config/consts';

import { useInfiniteRPCQuery } from '@/lib/api/request/use-infinite-rpc-query';

import { AttachmentDto, SpecialistTypeDto } from '../types';

export type RecommendationDto = {
  id: string;
  specialistType: SpecialistTypeDto;
  text: string;
  createdAt: Date;
  attachments?: AttachmentDto[];
};

export type GetRecommendationsResponse = {
  recommendations: RecommendationDto[];
};

export type GetRecommendationsRequest = { specialistTypes?: SpecialistTypeDto[] };

export function useGetRecommendations(params: GetRecommendationsRequest) {
  return useInfiniteRPCQuery<GetRecommendationsResponse>({
    method: useGetRecommendations.method,
    params,
    queryKeys: ['get-recommendations'],
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.recommendations.length === PAGE_SIZE ? lastPageParam + 1 : undefined,
    select: (result) =>
      result.pages.reduce(
        (acc, page) => ({
          recommendations: [...acc.recommendations, ...page.recommendations],
        }),
        {
          recommendations: [],
        },
      ),
  });
}

useGetRecommendations.method = 'get-recommendations';

import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

type SpecialistAvailableRequest = {
  consultationTypeId: string;
};

type SpecialistAvailableResponse = {
  canBook: boolean;
};

export function useSpecialistAvailable({
  params,
  ...opts
}: UseExternalRPCQueryOptions<SpecialistAvailableResponse, SpecialistAvailableRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['specialist-available'] as const,
    method: useSpecialistAvailable.method,
    params,
  });
}

useSpecialistAvailable.method = 'specialist-available';

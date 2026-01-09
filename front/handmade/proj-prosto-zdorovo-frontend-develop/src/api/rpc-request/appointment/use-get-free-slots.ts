import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type SlotDto = {
  slotIds: string[];
  time: string;
};

type GetFreeSlotsRequest = {
  consultationTypeId: string;
  date: string;
  sameSpecialist?: boolean;
};

type GetFreeSlotsResponse = {
  slots: SlotDto[];
};

export function useGetFreeSlots({
  params,
  ...opts
}: UseExternalRPCQueryOptions<GetFreeSlotsResponse, GetFreeSlotsRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['free-slots'] as const,
    method: useGetFreeSlots.method,
    params,
  });
}

useGetFreeSlots.method = 'free-slots';

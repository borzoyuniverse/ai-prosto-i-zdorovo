import { useRPCQuery } from '@/lib/api/request/use-rpc-query';

import { NewAppointmentStatus, SpecialistTypeDto } from '../types';

export type ConsultationType = {
  consultationTypeId: string;
  name: string;
  description: string;
  specialistType: SpecialistTypeDto;
  newAppointmentStatus: NewAppointmentStatus;
};

type GetAppointmentTypesResponse = {
  consultationTypes: ConsultationType[];
};

export function useGetAppointmentTypes() {
  return useRPCQuery<GetAppointmentTypesResponse, undefined>({
    queryKey: ['get-appointment-types'] as const,
    method: useGetAppointmentTypes.method,
  });
}

useGetAppointmentTypes.method = 'get-appointment-types';

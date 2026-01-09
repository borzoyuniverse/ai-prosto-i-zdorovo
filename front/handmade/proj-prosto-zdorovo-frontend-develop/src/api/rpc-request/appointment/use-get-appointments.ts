import { ValueOf } from '@/types/typings';

import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

import { SpecialistTypeDto } from '../types';

export type GetAppointments200ResponseInnerUnfilledQuestionnairesInner = {
  formId?: string;
  formType?: GetAppointments200ResponseInnerUnfilledQuestionnairesInnerFormTypeEnum;
};

export const GetAppointments200ResponseInnerUnfilledQuestionnairesInnerFormTypeEnum = {
  General: 'GENERAL',
  ConsultationType: 'CONSULTATION_TYPE',
  Goal: 'GOAL',
} as const;

export type GetAppointments200ResponseInnerUnfilledQuestionnairesInnerFormTypeEnum =
  ValueOf<typeof GetAppointments200ResponseInnerUnfilledQuestionnairesInnerFormTypeEnum>;

export type GetAppointments200ResponseInner = {
  id: string;
  startDate: Date;
  isRepeated?: boolean;
  consultationTypeName: string;
  consultationTypeId: string;
  specialistType: SpecialistTypeDto;
  unfilledQuestionnaires: GetAppointments200ResponseInnerUnfilledQuestionnairesInner[];
  consultationUrl: string;
};

type GetAppointmentsRequest = {
  userId: string;
};

type GetAppointmentsResponse = GetAppointments200ResponseInner[];

export function useGetAppointments({
  params,
  ...opts
}: UseExternalRPCQueryOptions<GetAppointmentsResponse, GetAppointmentsRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['appointments'] as const,
    method: useGetAppointments.method,
    params,
  });
}

useGetAppointments.method = 'get-appointments';

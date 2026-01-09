import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type ProfilePackageData = {
  totalConsultations: number;
  usedConsultations: number;
  validUntil: string;
};

export type ProfilePersonalInfoData = {
  phone: string;
  email: string;
  birthDate: string;
  insurerName: string;
  policyNumber: string;
  policyValidUntil: string;
  firstName: string;
  lastName: string;
  middleName: string;
};

export type GetProfileResponse = {
  package: ProfilePackageData;
  personalInfo: ProfilePersonalInfoData;
};

type GetProfileRequest = {
  userId: string;
};

export function useGetProfile({
  params,
  ...opts
}: UseExternalRPCQueryOptions<GetProfileResponse, GetProfileRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['profile'] as const,
    method: useGetProfile.method,
    params,
  });
}

useGetProfile.method = 'get-profile';

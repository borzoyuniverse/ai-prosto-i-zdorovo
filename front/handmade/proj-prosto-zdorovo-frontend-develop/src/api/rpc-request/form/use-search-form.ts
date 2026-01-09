import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type SearchFormRequest = {
  includeFilled?: boolean;
  includeGoal?: boolean;
  includeGeneral?: boolean;
  consultationTypeIds?: string[];
  clientId?: string;
};

export type SearchFormResponse = {
  forms: {
    formId: string;
    formType: string;
    isFilled: true;
    filledAt: string;
    title: string;
  }[];
};

export function useSearchForm({
  params,
  ...opts
}: UseExternalRPCQueryOptions<SearchFormResponse, SearchFormRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['search-form'] as const,
    method: useSearchForm.method,
    params,
  });
}

useSearchForm.method = 'search-form';

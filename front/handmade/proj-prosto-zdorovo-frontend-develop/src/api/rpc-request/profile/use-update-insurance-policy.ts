import { UseRPCMutationHandlers } from '@/lib/api/models';
import { useRPCMutation } from '@/lib/api/request/use-rpc-mutation';

type UpdateInsurancePolicyRequest = {
  policyNumber: string;
};

type UpdateInsurancePolicyResponse = { policyNumber: string };

export function useUpdateInsurancePolicy(
  args: UseRPCMutationHandlers<
    UpdateInsurancePolicyResponse,
    UpdateInsurancePolicyRequest
  > = {},
) {
  return useRPCMutation({
    method: useUpdateInsurancePolicy.method,
    ...args,
  });
}

useUpdateInsurancePolicy.method = 'update-insurance-policy';

import { Answer } from '@/feature/form-builder/types';

import { UseRPCMutationHandlers } from '@/lib/api/models';
import { useRPCMutation } from '@/lib/api/request/use-rpc-mutation';

type FormSubmissionRequest = {
  formId: string;
  answers: Record<string, Answer>;
};

type FormSubmissionResponse = {
  answers: Record<string, Answer>;
};

export function useFormSubmission(
  args: UseRPCMutationHandlers<FormSubmissionResponse, FormSubmissionRequest> = {},
) {
  return useRPCMutation({
    method: useFormSubmission.method,
    ...args,
  });
}

useFormSubmission.method = 'form-submission';

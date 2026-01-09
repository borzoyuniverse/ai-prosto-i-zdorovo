import { UseRPCMutationHandlers } from '@/lib/api/models';
import { useRPCMutation } from '@/lib/api/request/use-rpc-mutation';

type CreateAppointmentRequest = {
  consultationTypeId: string;
  goalId: string;
  slotId: string;
};

type CreateAppointmentResponse = {
  id: string;
  consultationTypeId: string;
  goalId: string;
  slotId: string;
  specialistId: string;
};

export function useCreateAppointment(
  args: UseRPCMutationHandlers<CreateAppointmentResponse, CreateAppointmentRequest> = {},
) {
  return useRPCMutation({
    method: useCreateAppointment.method,
    ...args,
  });
}

useCreateAppointment.method = 'create-appointment';

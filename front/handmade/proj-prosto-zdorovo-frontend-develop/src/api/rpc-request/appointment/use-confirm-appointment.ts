import { UseRPCMutationHandlers } from '@/lib/api/models';
import { useRPCMutation } from '@/lib/api/request/use-rpc-mutation';

type ConfirmAppointmentRequest = {
  appointmentId: string;
};

type ConfirmAppointmentResponse = {
  id: string;
  slotId: string;
  specialistId: string;
};

export function useConfirmAppointment(
  args: UseRPCMutationHandlers<
    ConfirmAppointmentResponse,
    ConfirmAppointmentRequest
  > = {},
) {
  return useRPCMutation({
    method: useConfirmAppointment.method,
    ...args,
  });
}

useConfirmAppointment.method = 'confirm-appointment';

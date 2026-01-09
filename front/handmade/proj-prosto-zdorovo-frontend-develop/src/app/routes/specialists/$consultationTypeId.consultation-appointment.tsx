import { ConsultationAppointment } from '@/app/pages/consultation-appointment/consultation-appointment';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const consultationAppointmentSearchSchema = z.object({
  specialistType: z.enum([
    'MASTER_TRAINER',
    'NUTRITIONIST',
    'MASTER_COACH',
    'RELAXOLOGIST',
    'SLEEP_EXPERT',
  ]),
  consultationName: z.string().min(1),
  consultationType: z.enum(['REPEATED', 'BLOCKED', 'DEFAULT']),
});

export const Route = createFileRoute(
  '/specialists/$consultationTypeId/consultation-appointment',
)({
  validateSearch: consultationAppointmentSearchSchema,
  component: ConsultationAppointment,
});

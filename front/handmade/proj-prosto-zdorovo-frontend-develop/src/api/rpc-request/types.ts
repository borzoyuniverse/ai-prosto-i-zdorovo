import { ValueOf } from '@/types/typings';

export const SpecialistTypeDto = {
  MasterTrainer: 'MASTER_TRAINER',
  Nutritionist: 'NUTRITIONIST',
  MasterCoach: 'MASTER_COACH',
  Relaxologist: 'RELAXOLOGIST',
  SleepExpert: 'SLEEP_EXPERT',
} as const;

export type SpecialistTypeDto = ValueOf<typeof SpecialistTypeDto>;

export type NewAppointmentStatus = 'REPEATED' | 'BLOCKED' | 'DEFAULT';

export type AttachmentDto = {
  key: string;
  url: string;
  title: string;
  type: string;
};

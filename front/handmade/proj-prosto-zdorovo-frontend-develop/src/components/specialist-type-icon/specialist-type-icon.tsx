import { ReactNode } from 'react';

import { SpecialistTypeDto } from '@/api/rpc-request/types';

import { MasterCoach } from '@/components/icons/master-coach';
import { MasterTrainer } from '@/components/icons/master-trainer';
import { Nutritionist } from '@/components/icons/nutritionist';
import { Relaxologist } from '@/components/icons/relaxologist';
import { SleepExpert } from '@/components/icons/sleep-expert';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

const icons: Record<SpecialistTypeDto, ReactNode> = {
  MASTER_COACH: <MasterCoach />,
  MASTER_TRAINER: <MasterTrainer />,
  NUTRITIONIST: <Nutritionist />,
  RELAXOLOGIST: <Relaxologist />,
  SLEEP_EXPERT: <SleepExpert />,
};

type SpecialistTypeIconProps = {
  type: SpecialistTypeDto;
};

export const SpecialistTypeIcon = ({ type }: SpecialistTypeIconProps) => {
  return (
    <Stack align="center" justify="center" className="rounded-8 bg-primary-100 p-unit-6">
      {icons[type]}
    </Stack>
  );
};

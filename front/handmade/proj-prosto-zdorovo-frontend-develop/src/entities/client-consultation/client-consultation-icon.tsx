import { ElementType } from 'react';

import { SpecialistTypeDto } from '@/api/rpc-request/types';

import { MasterCoach } from '@/components/icons/master-coach';
import { MasterTrainer } from '@/components/icons/master-trainer';
import { Nutritionist } from '@/components/icons/nutritionist';
import { Relaxologist } from '@/components/icons/relaxologist';
import { SleepExpert } from '@/components/icons/sleep-expert';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

const icons: Record<SpecialistTypeDto, ElementType> = {
  MASTER_COACH: MasterCoach,
  MASTER_TRAINER: MasterTrainer,
  NUTRITIONIST: Nutritionist,
  RELAXOLOGIST: Relaxologist,
  SLEEP_EXPERT: SleepExpert,
};

type ClientConsultationIconProps = {
  type: SpecialistTypeDto;
  className?: string;
  classNameIcon?: string;
};

export const ClientConsultationIcon = ({
  type,
  className,
  classNameIcon,
}: ClientConsultationIconProps) => {
  const Icon = icons[type];
  return (
    <Stack
      align="center"
      justify="center"
      className={cn('rounded-8 bg-primary-100 p-unit-6', className)}
    >
      <Icon className={cn(classNameIcon)} />
    </Stack>
  );
};

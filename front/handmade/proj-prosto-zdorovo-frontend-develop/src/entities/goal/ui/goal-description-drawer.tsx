import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { GoalDto } from '@/api/rpc-request/appointment/use-get-goals';
import { useStepContext } from '@/feature/multi-step-form/context/step-context';

import { useConsultationBookingContext } from '@/widgets/consultation-appointments-steps/context/сonsultation-booking-context';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

type GoalDescriptionDrawerProps = {
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} & GoalDto;

export const GoalDescriptionDrawer = ({
  id,
  trigger,
  name,
  description,
  isOpen,
  onOpenChange,
}: GoalDescriptionDrawerProps) => {
  const { t } = useTranslation();
  const { goToNextStep } = useStepContext();
  const {
    goal: { setGoalId, setGoalName },
  } = useConsultationBookingContext();

  const onClick = () => {
    setGoalId(id);
    setGoalName(name);
    goToNextStep();
  };

  return (
    <BaseDrawer
      title={t(
        'consultation-appointment-page.choose-target-step.goal-description-drawer.title',
      )}
      trigger={trigger ?? <></>}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      primaryAction={
        <Button onClick={onClick} className="w-full">
          {t('buttons.continue')}
        </Button>
      }
    >
      <Stack gap={8}>
        <Typography.h5 className="text-neutral-600">{name}</Typography.h5>
        <Typography.body6 className="text-neutral-900">{description}</Typography.body6>
      </Stack>
    </BaseDrawer>
  );
};

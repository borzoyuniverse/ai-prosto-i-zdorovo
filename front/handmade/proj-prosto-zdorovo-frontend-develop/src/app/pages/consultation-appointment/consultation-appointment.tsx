import { useTranslation } from 'react-i18next';

import { MultiStepFormLayout } from '@/feature/multi-step-form/ui/multi-step-form-layout';
import { StepsComposer } from '@/feature/multi-step-form/ui/steps-composer';
import { useSearch } from '@tanstack/react-router';

import { ChooseSlotStep } from '@/widgets/consultation-appointments-steps/ui/choose-slot-step';
import { ChooseTargetStep } from '@/widgets/consultation-appointments-steps/ui/choose-target-step';
import { ConfirmAppointmentStep } from '@/widgets/consultation-appointments-steps/ui/confirm-appointment-step';
import { ConsultationBookingContextProvider } from '@/widgets/consultation-appointments-steps/ui/slot-context-provider';

export function ConsultationAppointment() {
  const { t } = useTranslation();

  const { consultationType } = useSearch({
    from: '/specialists/$consultationTypeId/consultation-appointment',
  });

  const isRepeated = consultationType === 'REPEATED';

  return (
    <MultiStepFormLayout
      title={t('consultation-appointment-page.title')}
      totalSteps={isRepeated ? 2 : 3}
      gap={12}
      className="h-dvh overflow-auto px-unit-8 pb-unit-6 pt-unit-8"
    >
      <ConsultationBookingContextProvider>
        <StepsComposer>
          {isRepeated ? null : <ChooseTargetStep />}
          <ChooseSlotStep />
          <ConfirmAppointmentStep />
        </StepsComposer>
      </ConsultationBookingContextProvider>
    </MultiStepFormLayout>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useConfirmAppointment } from '@/api/rpc-request/appointment/use-confirm-appointment';
import { useNavigate } from '@tanstack/react-router';

import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { AppointmentErrorDrawer } from './appointment-error-drawer';
import { ConsultationTypeCard } from './сonsultation-type-card';
import { useConsultationBookingContext } from '../context/сonsultation-booking-context';

export const ConfirmAppointmentStep = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isErrorDrawerOpen, setIsErrorDrawerOpen] = useState(false);

  const {
    date,
    time,
    appointmentId,
    goal: { goalName },
  } = useConsultationBookingContext();

  const { mutate } = useConfirmAppointment({
    onSuccess: () => {
      navigate({ to: '/filling-questionnaire' });
    },
    onError: () => {
      setIsErrorDrawerOpen(true);
    },
  });

  return (
    <>
      <Stack className="flex-1">
        <Stack justify="center" className="flex-1">
          <Stack gap={15} className="translate-y-[-4%]">
            <Stack gap={5}>
              <Typography.h2 className="text-neutral-900">
                {t('consultation-appointment-page.confirm-appointment-step.title')}
              </Typography.h2>
              <Typography.body5 className="text-neutral-700">
                {t('consultation-appointment-page.confirm-appointment-step.description')}
              </Typography.body5>
            </Stack>
            <Stack gap={11}>
              <ConsultationTypeCard />
              <Stack gap={10}>
                <Stack gap={10} direction="row">
                  <Stack gap={2}>
                    <Typography.body6 className="text-neutral-700">
                      {t('consultation-appointment-page.confirm-appointment-step.date')}
                    </Typography.body6>
                    <Typography.h6 className="text-neutral-900">
                      {t('dates.weekdayDateYear', { date })}
                    </Typography.h6>
                  </Stack>
                  <Stack gap={2}>
                    <Typography.body6 className="text-neutral-700">
                      {t('consultation-appointment-page.confirm-appointment-step.time')}
                    </Typography.body6>
                    <Typography.h6 className="text-neutral-900">{time}</Typography.h6>
                  </Stack>
                </Stack>
              </Stack>
              {goalName ? (
                <Stack gap={2}>
                  <Typography.body6 className="text-neutral-700">
                    {t('consultation-appointment-page.confirm-appointment-step.goal')}
                  </Typography.body6>
                  <Typography.h6 className="text-neutral-900">{goalName}</Typography.h6>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => mutate({ appointmentId })}>
          {t('buttons.confirm-appointment')}
        </Button>
      </Stack>
      <AppointmentErrorDrawer
        isOpen={isErrorDrawerOpen}
        onOpenChange={setIsErrorDrawerOpen}
      />
    </>
  );
};

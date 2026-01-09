import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { useCreateAppointment } from '@/api/rpc-request/appointment/use-create-appointment';
import { useStepContext } from '@/feature/multi-step-form/context/step-context';
import { useParams, useSearch } from '@tanstack/react-router';

import { ConsultationSlotList } from '@/entities/consultation-slot/ui/consultation-slot-list';

import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Calendar } from '@/lib/shadcn/components/ui/calendar/calendar';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { AppointmentErrorDrawer } from './appointment-error-drawer';
import { ConsultationSpecialistChoice } from './consultation-specialist-choice';
import { ConsultationTypeCard } from './сonsultation-type-card';
import { useConsultationBookingContext } from '../context/сonsultation-booking-context';

export function ChooseSlotStep() {
  const { t } = useTranslation();
  const { consultationTypeId } = useParams({
    from: '/specialists/$consultationTypeId/consultation-appointment',
  });
  const { consultationType } = useSearch({
    from: '/specialists/$consultationTypeId/consultation-appointment',
  });
  const { goToNextStep } = useStepContext();

  const isRepeated = consultationType === 'REPEATED';
  const [isSameSpecialist, setIsSameSpecialist] = useState(isRepeated ? true : false);
  const [isErrorDrawerOpen, setIsErrorDrawerOpen] = useState(false);

  const {
    date,
    setDate,
    time,
    setAppointmentId,
    goal: { goalId },
    slots: { getNextSlotId, moveToNextSlot, currentSlotId },
  } = useConsultationBookingContext();
  const { mutate } = useCreateAppointment({
    onSuccess: (data) => {
      goToNextStep();
      setAppointmentId(data.id);
    },
    onError: () => {
      const nextSlotId = getNextSlotId(currentSlotId);
      if (nextSlotId) {
        moveToNextSlot();
        mutate({ goalId, consultationTypeId, slotId: nextSlotId });
      } else {
        setIsErrorDrawerOpen(true);
      }
    },
  });

  const onSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <>
      <Stack gap={12} className="flex-1">
        <ConsultationTypeCard />
        {isRepeated ? (
          <ConsultationSpecialistChoice
            consultationTypeId={consultationTypeId}
            isSameSpecialist={isSameSpecialist}
            setIsSameSpecialist={(v) => {
              setIsSameSpecialist(v);
            }}
          />
        ) : null}
        <Stack gap={12}>
          <Stack gap={8}>
            <Typography.h6 className="text-neutral-900">
              <Trans
                i18nKey="consultation-appointment-page.choose-slot-step.select-date"
                values={{ date }}
                components={{ date: <span className="text-h6 text-primary-700" /> }}
              />
            </Typography.h6>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelect}
              disabled={{ before: new Date() }}
            />
          </Stack>

          {date ? (
            <ConsultationSlotList
              date={date.toISOString()}
              consultationTypeId={consultationTypeId}
              sameSpecialist={isSameSpecialist}
            />
          ) : null}
        </Stack>
        <Button
          onClick={() =>
            mutate({
              goalId,
              consultationTypeId,
              slotId: currentSlotId,
            })
          }
          disabled={!date || !time}
        >
          {t('buttons.make-an-appointment')}
        </Button>
      </Stack>
      <AppointmentErrorDrawer
        isOpen={isErrorDrawerOpen}
        onOpenChange={setIsErrorDrawerOpen}
      />
    </>
  );
}

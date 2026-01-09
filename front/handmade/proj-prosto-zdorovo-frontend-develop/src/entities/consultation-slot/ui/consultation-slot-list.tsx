import { Trans, useTranslation } from 'react-i18next';

import { useGetFreeSlots } from '@/api/rpc-request/appointment/use-get-free-slots';

import { useConsultationBookingContext } from '@/widgets/consultation-appointments-steps/context/сonsultation-booking-context';

import { Loader } from '@/components/icons/loader';
import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/lib/shadcn/components/ui/toggle-group/toggle-group';

type ConsultationSlotListProps = {
  consultationTypeId: string;
  date: string;
  sameSpecialist?: boolean;
};

export function ConsultationSlotList({
  date,
  consultationTypeId,
  sameSpecialist,
}: ConsultationSlotListProps) {
  const { t } = useTranslation();
  const { data, isError, error, isPending } = useGetFreeSlots({
    params: { date, consultationTypeId, sameSpecialist },
  });
  const {
    time,
    setTime,
    slots: { setSlotsForTime },
  } = useConsultationBookingContext();

  if (isError) {
    throw error;
  }

  if (isPending) {
    return <Loader className="size-14 animate-spin text-neutral-400" />;
  }

  if (data.slots.length === 0) {
    return (
      <Stack gap={3}>
        <Typography.h5 className="text-neutral-900">
          {t(
            'consultation-appointment-page.choose-slot-step.consultation-slot-list.empty.title',
          )}
        </Typography.h5>
        <Typography.body5 className="text-neutral-700">
          {t(
            'consultation-appointment-page.choose-slot-step.consultation-slot-list.empty.description',
          )}
        </Typography.body5>
      </Stack>
    );
  }

  return (
    <Stack gap={7}>
      <Typography.h6 className="text-neutral-900">
        <Trans
          i18nKey={`consultation-appointment-page.choose-slot-step.consultation-slot-list.${time ? 'select-time' : 'select-time-no-value'}`}
          values={{ time }}
          components={{ time: <span className="text-h6 text-primary-700" /> }}
        />
      </Typography.h6>
      <ToggleGroup
        type="single"
        className="gap-unit-4"
        value={time}
        onValueChange={(value) => {
          if (value) {
            setSlotsForTime(
              data.slots.find((slot) => slot.time === value)?.slotIds ?? [],
            );
            setTime(value);
          }
        }}
      >
        {data.slots.map((slot) => (
          <ToggleGroupItem key={slot.time} value={slot.time}>
            {slot.time}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Stack>
  );
}

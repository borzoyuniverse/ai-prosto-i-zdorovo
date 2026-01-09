import { useTranslation } from 'react-i18next';

import {
  ConsultationType,
  useGetAppointmentTypes,
} from '@/api/rpc-request/appointment/use-get-appointment-types';
import { Link, useNavigate } from '@tanstack/react-router';

import { ClientConsultationIcon } from '@/entities/client-consultation/client-consultation-icon';

import { BackButton } from '@/components/back-button/back-button';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

export const SelectConsultationType = () => {
  const { t } = useTranslation();

  const { data, isPending, isError, error } = useGetAppointmentTypes();

  if (isError) {
    throw error;
  }

  if (isPending) {
    return <Spinner />;
  }

  const grouped = data.consultationTypes.reduce<Record<string, ConsultationType[]>>(
    (acc, item) => {
      const key = item.newAppointmentStatus;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {},
  );

  if (data.consultationTypes.length === 0) {
    return <SelectConsultationTypeEmpty />;
  }

  return (
    <Stack className="h-dvh overflow-auto px-unit-8 pb-unit-13 pt-unit-4">
      <Stack gap={12}>
        <Stack gap={6} align="start">
          <BackButton />
          <Typography.h5 className="text-neutral-900">
            {t('select-consultation-type-page.title')}
          </Typography.h5>
        </Stack>
        <Stack gap={11}>
          {Object.keys(grouped).map((groupKey) => (
            <Stack gap={6} key={groupKey}>
              <Typography.body6 className="text-neutral-700">
                {t(`select-consultation-type-page.groups.${groupKey}`)}
              </Typography.body6>
              <Stack gap={4}>
                {grouped[groupKey].map((item) => (
                  <ConsultationTypeComponent {...item} key={item.consultationTypeId} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const ConsultationTypeComponent = ({
  consultationTypeId,
  name,
  description,
  specialistType,
  newAppointmentStatus,
}: ConsultationType) => {
  const content = (
    <Stack
      gap={5}
      direction="row"
      align="start"
      className={cn('rounded-9 bg-primary-100 p-unit-6', {
        'bg-primary-50 cursor-not-allowed': newAppointmentStatus === 'BLOCKED',
        'cursor-pointer': newAppointmentStatus !== 'BLOCKED',
      })}
    >
      <ClientConsultationIcon
        type={specialistType}
        className={cn('bg-primary-200', {
          'bg-primary-100': newAppointmentStatus === 'BLOCKED',
        })}
      />
      <Stack gap={2}>
        <Typography.body5 className="text-neutral-900">{name}</Typography.body5>
        <Typography.body6 className="text-neutral-700" weight="regular">
          {description}
        </Typography.body6>
      </Stack>
    </Stack>
  );

  if (newAppointmentStatus === 'BLOCKED') {
    return content;
  }

  return (
    <Link
      to="/specialists/$consultationTypeId/consultation-appointment"
      params={{ consultationTypeId }}
      search={{
        consultationName: name,
        consultationType: newAppointmentStatus,
        specialistType,
      }}
    >
      {content}
    </Link>
  );
};

const SelectConsultationTypeEmpty = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack className="h-dvh px-unit-8 pb-unit-6 pt-unit-4">
      <BackButton className="w-fit" />
      <Stack justify="center" className="flex-1">
        <Stack gap={6} className="text-center">
          <Typography.title5 className="text-neutral-900">
            {t('select-consultation-type-page.empty.title')}
          </Typography.title5>
          <Typography.body6 className="text-neutral-700" weight="regular">
            {t('select-consultation-type-page.empty.description')}
          </Typography.body6>
        </Stack>
      </Stack>
      <Button onClick={() => navigate({ to: '/' })}>
        {t('select-consultation-type-page.empty.button')}
      </Button>
    </Stack>
  );
};

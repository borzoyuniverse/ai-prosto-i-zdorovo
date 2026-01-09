import { useTranslation } from 'react-i18next';

import { useSearch } from '@tanstack/react-router';

import { ClientConsultationIcon } from '@/entities/client-consultation/client-consultation-icon';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

export const ConsultationTypeCard = () => {
  const { t } = useTranslation();
  const { specialistType, consultationName, consultationType } = useSearch({
    from: '/specialists/$consultationTypeId/consultation-appointment',
  });

  return (
    <Stack gap={5} direction="row" align="start">
      <ClientConsultationIcon
        type={specialistType}
        className="!rounded-7 !p-unit-4"
        classNameIcon="!size-unit-11"
      />
      <Stack gap={1}>
        <Typography.body5 className="text-neutral-900">
          {consultationName}
        </Typography.body5>
        <Typography.body6 className="text-neutral-700">
          {t(
            `consultation-appointment-page.consultation-type-card.type.${consultationType}`,
          )}
        </Typography.body6>
      </Stack>
    </Stack>
  );
};

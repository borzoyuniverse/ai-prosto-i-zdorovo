import { useTranslation } from 'react-i18next';

import { useGetGoals } from '@/api/rpc-request/appointment/use-get-goals';
import { useParams } from '@tanstack/react-router';

import { Goal } from '@/entities/goal/goal';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { ConsultationTypeCard } from './сonsultation-type-card';

export function ChooseTargetStep() {
  const { t } = useTranslation();

  const { consultationTypeId } = useParams({
    from: '/specialists/$consultationTypeId/consultation-appointment',
  });

  const { data } = useGetGoals({ params: { consultationTypeId } });

  return (
    <Stack gap={12}>
      <ConsultationTypeCard />
      <Stack gap={8}>
        <Typography.h6 className="text-neutral-900">
          {t('consultation-appointment-page.choose-target-step.title')}
        </Typography.h6>
        <Stack gap={4}>
          {data?.goals.map((goal) => <Goal key={goal.id} {...goal} />)}
        </Stack>
      </Stack>
    </Stack>
  );
}

import { useTranslation } from 'react-i18next';

import { useGetAppointments } from '@/api/rpc-request/appointment/use-get-appointments';
import {
  RecommendationDto,
  useGetRecommendations,
} from '@/api/rpc-request/recommendation/use-get-recommendations';
import { useNavigate } from '@tanstack/react-router';

import { ClientConsultation } from '@/entities/client-consultation/client-consultation';
import { ClientRecommendation } from '@/entities/client-recommendation/client-recommendation';

import { AppImage } from '@/components/app-image/app-image';
import { BaseLayout } from '@/components/base-layout/base-layout';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

export const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isError, error, isPending } = useGetAppointments({
    params: { userId: 'userId' },
  });
  const {
    data: recommendationsData,
    isError: isRecommendationsError,
    error: recommendationsError,
  } = useGetRecommendations({
    specialistTypes: [],
  });

  if (isError) {
    throw error;
  }

  if (isRecommendationsError) {
    throw recommendationsError;
  }

  if (isPending) {
    return <Spinner />;
  }

  const lastRecommendation = recommendationsData?.recommendations?.reduce<
    RecommendationDto | undefined
  >((latest, item) => {
    if (!latest) {
      return item;
    }
    return new Date(item.createdAt).getTime() > new Date(latest.createdAt).getTime()
      ? item
      : latest;
  }, undefined);

  return (
    <BaseLayout
      className="gap-unit-6 px-unit-8"
      title={t('client-consultation-page.title')}
    >
      {data.length > 0 ? (
        <Stack className="py-unit-6" gap={4}>
          {data.map((d) => (
            <ClientConsultation {...d} key={d.id} />
          ))}
        </Stack>
      ) : (
        <EmptyClientConsultations />
      )}
      {lastRecommendation ? (
        <Stack gap={4}>
          <ClientRecommendation {...lastRecommendation} />
        </Stack>
      ) : null}
      <Button
        className="sticky bottom-unit-6"
        onClick={() => navigate({ to: '/specialists/consultation-select' })}
      >
        {t('client-consultation-page.button-consultation')}
      </Button>
    </BaseLayout>
  );
};

const EmptyClientConsultations = () => {
  const { t } = useTranslation();

  return (
    <Stack gap={4} className="px-unit-8 pb-[78px] pt-unit-6 text-center">
      <AppImage alt="blonde" src="/assets/images/blonde.png" />
      <Stack gap={6} className="rounded-9 bg-neutral-0 px-unit-6 py-unit-10">
        <Typography.title5 className="text-neutral-900">
          {t('client-consultation-page.empty.title')}
        </Typography.title5>
        <Typography.body6 className="text-neutral-700">
          {t('client-consultation-page.empty.description')}
        </Typography.body6>
      </Stack>
    </Stack>
  );
};

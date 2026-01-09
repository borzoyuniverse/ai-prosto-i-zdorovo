import { useTranslation } from 'react-i18next';

import { useGetRecommendations } from '@/api/rpc-request/recommendation/use-get-recommendations';
import { SpecialistTypeDto } from '@/api/rpc-request/types';
import { useIntersectionObserver } from 'usehooks-ts';

import { ClientRecommendation } from '@/entities/client-recommendation/client-recommendation';

import { AppImage } from '@/components/app-image/app-image';
import { Typography } from '@/components/typography/typography';

import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

type ClientRecommendationsListProps = {
  filters: SpecialistTypeDto[];
};

export const ClientRecommendationsList = ({
  filters,
}: ClientRecommendationsListProps) => {
  const { data, isError, error, isPending, fetchNextPage } = useGetRecommendations({
    specialistTypes: filters,
  });

  const [cursorRef] = useIntersectionObserver({
    threshold: 0.1,
    onChange: (isIntersecting) => isIntersecting && fetchNextPage(),
  });

  if (isError) {
    throw error;
  }

  if (isPending) {
    return <Spinner />;
  }

  return data.recommendations.length > 0 ? (
    <Stack gap={4} className="px-unit-8 pb-unit-8">
      {data.recommendations.map((rec, idx, arr) => (
        <ClientRecommendation
          key={rec.id}
          {...rec}
          ref={idx === arr.length - 3 ? cursorRef : null}
        />
      ))}
    </Stack>
  ) : (
    <EmptyClientRecommendations />
  );
};

const EmptyClientRecommendations = () => {
  const { t } = useTranslation();
  return (
    <Stack gap={4} className="mb-unit-6 px-unit-8">
      <Stack gap={6} className="rounded-9 bg-neutral-0 px-unit-6 py-unit-10 text-center">
        <Typography.title5 className="text-neutral-900">
          {t('client-recommendations-page.client-recommendations-list.empty.title')}
        </Typography.title5>
        <Typography.body6 className="font-normal text-neutral-700">
          {t('client-recommendations-page.client-recommendations-list.empty.description')}
        </Typography.body6>
      </Stack>
      <AppImage
        alt="empty-client-recommendation"
        src="/public/assets/images/empty-client-recommendation.png"
      />
    </Stack>
  );
};

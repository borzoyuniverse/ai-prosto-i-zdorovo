import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetRecommendationsSpecialist } from '@/api/rpc-request/recommendation/use-get-recommendations-specialist';
import { SpecialistTypeDto } from '@/api/rpc-request/types';

import { BaseLayout } from '@/components/base-layout/base-layout';

import { ClientRecommendationsList } from './components/client-recommendations-list';
import { FiltersCarousel } from './components/filters-carousel';

export const ClientRecommendations = () => {
  const { t } = useTranslation();

  const [curType, setCurType] = useState<SpecialistTypeDto | 'ALL'>('ALL');

  const { data: types } = useGetRecommendationsSpecialist({
    params: { userId: 'userId' },
  });

  const filters: (SpecialistTypeDto | 'ALL')[] | undefined = types
    ? ['ALL', ...types]
    : undefined;

  return (
    <BaseLayout title={t('client-recommendations-page.title')}>
      {filters && filters.length > 1 ? (
        <FiltersCarousel
          filters={filters ?? []}
          curType={curType}
          setCurType={(v) => {
            if (!v) {
              return;
            }
            setCurType(v);
          }}
        />
      ) : null}
      <ClientRecommendationsList filters={curType === 'ALL' ? [] : [curType]} />
    </BaseLayout>
  );
};

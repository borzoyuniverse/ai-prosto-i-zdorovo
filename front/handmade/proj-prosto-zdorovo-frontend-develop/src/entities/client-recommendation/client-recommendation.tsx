import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { RecommendationDto } from '@/api/rpc-request/recommendation/use-get-recommendations';
import { format } from 'date-fns';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { SpecialistTypeIcon } from '@/components/specialist-type-icon/specialist-type-icon';
import { SpecialistTypeTitle } from '@/components/specialist-type-title/specialist-type-title';
import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { Doc } from '../document/doc';

export const ClientRecommendation = forwardRef<HTMLDivElement, RecommendationDto>(
  ({ text, createdAt, specialistType, attachments }, ref) => {
    const { t } = useTranslation();

    return (
      <BaseDrawer
        title={t('client-recommendations-page.client-recommendation.drawer-title')}
        trigger={
          <Stack ref={ref} gap={8} className="rounded-9 bg-neutral-0 p-unit-6">
            <Stack gap={8} direction="row" align="center">
              <Stack direction="row" gap={6} align="center" className="flex-1">
                <SpecialistTypeIcon type={specialistType} />
                <SpecialistTypeTitle type={specialistType} />
              </Stack>
              <Typography.body7 className="text-neutral-600">
                {format(new Date(createdAt), 'dd.MM.yyyy')}
              </Typography.body7>
            </Stack>
            <Typography.body6 className="line-clamp-[8] text-neutral-900">
              {text}
            </Typography.body6>
          </Stack>
        }
      >
        <Stack gap={11}>
          <Stack gap={8} direction="row" align="center">
            <Stack gap={6} direction="row" align="center">
              <SpecialistTypeIcon type={specialistType} />
              <SpecialistTypeTitle type={specialistType} />
            </Stack>
            <Typography.body7 className="text-neutral-600">
              {format(new Date(createdAt), 'dd.MM.yyyy')}
            </Typography.body7>
          </Stack>
          <Typography.body6 className="text-neutral-900">{text}</Typography.body6>
          {attachments && attachments.length > 0 ? (
            <Stack gap={4}>
              {attachments.map((att) => (
                <Doc {...att} key={att.key} />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </BaseDrawer>
    );
  },
);

ClientRecommendation.displayName = 'ClientRecommendation';

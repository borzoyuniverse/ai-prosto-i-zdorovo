import { useTranslation } from 'react-i18next';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { Typography } from '../typography/typography';

type ProfilePackageInfoProps = {
  totalConsultations: number;
  usedConsultations: number;
  validUntil: string;
};

export function ProfilePackageInfo({
  totalConsultations,
  usedConsultations,
  validUntil,
}: ProfilePackageInfoProps) {
  const { t } = useTranslation();
  const remainingConsultations = totalConsultations - usedConsultations;

  return (
    <Stack gap={8} className="rounded-9 bg-neutral-0 p-unit-8">
      <Stack direction="row" justify="between" align="center">
        <Typography.h6 className="text-neutral-900">
          {t('profile-page.package-info.remaining-consultations')}
        </Typography.h6>
        <Typography.numeric3 className="text-primary-700">
          {remainingConsultations}
        </Typography.numeric3>
      </Stack>

      <Stack className="h-px bg-neutral-100" />

      <Stack gap={8}>
        <Stack gap={2}>
          <Typography.body7 className="text-neutral-700">
            {t('profile-page.package-info.my-package')}
          </Typography.body7>
          <Typography.h7 className="text-neutral-900">
            {t('profile-page.package-info.package-description', {
              total: totalConsultations,
            })}
          </Typography.h7>
        </Stack>
        <Stack gap={8} direction="row" align="center">
          <Stack gap={2}>
            <Typography.body7 className="text-neutral-700">
              {t('profile-page.package-info.valid-period')}
            </Typography.body7>
            <Typography.h7 className="text-neutral-900">
              {t('profile-page.package-info.valid-until', { date: new Date(validUntil) })}
            </Typography.h7>
          </Stack>
          <Stack gap={2}>
            <Typography.body7 className="text-neutral-700">
              {t('profile-page.package-info.used')}
            </Typography.body7>
            <Typography.h7 className="text-neutral-900">
              {t('profile-page.package-info.used-count', {
                used: usedConsultations,
                total: totalConsultations,
              })}
            </Typography.h7>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

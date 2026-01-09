import { useTranslation } from 'react-i18next';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { ProfileMenuItem } from '../profile-menu-item/profile-menu-item';

interface PersonalInfoDrawerProps {
  phone: string;
  email: string;
  birthDate: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Stack gap={2} className="rounded-7 bg-primary-50 p-unit-6 pb-unit-5 pt-unit-4">
      <Typography.body6 className="text-neutral-700" weight="regular">
        {label}
      </Typography.body6>
      <Typography.body5 className="text-neutral-900">{value}</Typography.body5>
    </Stack>
  );
}

export function PersonalInfoDrawer({
  phone,
  email,
  birthDate,
  isOpen,
  onOpenChange,
}: PersonalInfoDrawerProps) {
  const { t } = useTranslation();

  return (
    <BaseDrawer
      title={t('profile-page.personal-info-drawer.title')}
      trigger={
        <ProfileMenuItem title={t('profile-page.personal-info-drawer.menu-title')} />
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Stack gap={3} className="pb-unit-8">
        <InfoItem label={t('profile-page.personal-info-drawer.phone')} value={phone} />
        <InfoItem label={t('profile-page.personal-info-drawer.email')} value={email} />
        <InfoItem
          label={t('profile-page.personal-info-drawer.birth-date')}
          value={birthDate}
        />
      </Stack>
    </BaseDrawer>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { DrawerClose } from '@/lib/shadcn/components/ui/drawer';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { ChangeInsuranceNumberDrawer } from './change-insurance-number-drawer';
import { ProfileMenuItem } from '../profile-menu-item/profile-menu-item';

interface InsurancePolicyDrawerProps {
  insurer: string;
  number: string;
  policyValidUntil: string;
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

export function InsurancePolicyDrawer({
  insurer,
  number,
  policyValidUntil,
  isOpen,
  onOpenChange,
}: InsurancePolicyDrawerProps) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <>
      <BaseDrawer
        title={t('profile-page.insurance-policy-drawer.title')}
        trigger={
          <ProfileMenuItem title={t('profile-page.insurance-policy-drawer.menu-title')} />
        }
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        primaryAction={
          <DrawerClose className="w-full" asChild>
            <Button onClick={() => setOpen(true)} className="w-full">
              {t('profile-page.insurance-policy-drawer.new-policy-button')}
            </Button>
          </DrawerClose>
        }
      >
        <Stack gap={3} className="pb-unit-8">
          <InfoItem
            label={t('profile-page.insurance-policy-drawer.insurer')}
            value={insurer}
          />
          <InfoItem
            label={t('profile-page.insurance-policy-drawer.number')}
            value={number}
          />
          <InfoItem
            label={t('profile-page.insurance-policy-drawer.status')}
            value={t('profile-page.insurance-policy-drawer.status-active', {
              date: policyValidUntil,
            })}
          />
        </Stack>
      </BaseDrawer>
      <ChangeInsuranceNumberDrawer isOpen={open} onOpenChange={(open) => setOpen(open)} />
    </>
  );
}

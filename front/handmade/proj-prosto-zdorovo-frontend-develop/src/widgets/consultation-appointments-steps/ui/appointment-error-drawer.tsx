import { useTranslation } from 'react-i18next';

import { useQueryClient } from '@tanstack/react-query';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

type AppointmentErrorDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AppointmentErrorDrawer({
  isOpen,
  onOpenChange,
}: AppointmentErrorDrawerProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleSelectAnotherTime = () => {
    queryClient.invalidateQueries({ queryKey: ['free-slots'] });
    onOpenChange(false);
  };

  return (
    <BaseDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      trigger={<></>}
      title=""
      primaryAction={
        <Button onClick={handleSelectAnotherTime} className="w-full">
          {t('consultation-appointment-page.appointment-error-drawer.button')}
        </Button>
      }
      showButtonClose={false}
    >
      <Stack gap={5} className="text-center">
        <Typography.h5>
          {t('consultation-appointment-page.appointment-error-drawer.title')}
        </Typography.h5>
        <Typography.body5 className="text-center text-neutral-700">
          {t('consultation-appointment-page.appointment-error-drawer.description')}
        </Typography.body5>
      </Stack>
    </BaseDrawer>
  );
}

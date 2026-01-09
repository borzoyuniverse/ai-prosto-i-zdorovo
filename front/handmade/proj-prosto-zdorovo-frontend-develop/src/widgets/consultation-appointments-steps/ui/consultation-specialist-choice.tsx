import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSpecialistAvailable } from '@/api/rpc-request/appointment/use-specialist-available';

import { Loader } from '@/components/icons/loader';
import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { Switch } from '@/lib/shadcn/components/ui/switch/switch';
import { cn } from '@/lib/shadcn/lib/utils';

type ConsultationSpecialistChoiceProps = {
  consultationTypeId: string;
  isSameSpecialist: boolean;
  setIsSameSpecialist: (value: boolean) => void;
};

export const ConsultationSpecialistChoice = ({
  consultationTypeId,
  isSameSpecialist,
  setIsSameSpecialist,
}: ConsultationSpecialistChoiceProps) => {
  const { t } = useTranslation();

  const { data, isError, error, isPending } = useSpecialistAvailable({
    params: { consultationTypeId },
  });

  useEffect(() => {
    if (data && !data.canBook) {
      setIsSameSpecialist(false);
    }
  }, [data, setIsSameSpecialist]);

  if (isError) {
    throw error;
  }

  if (isPending) {
    return <Loader className="size-14 animate-spin text-neutral-400" />;
  }

  if (!data.canBook) {
    return (
      <Typography.body6 className="rounded-7 bg-primary-100 px-unit-8 py-unit-6 text-primary-900">
        {t('consultation-appointment-page.consultation-specialist-choice.not-can-book')}
      </Typography.body6>
    );
  }

  return (
    <Stack gap={4} direction="row" align="center">
      <Switch checked={isSameSpecialist} onCheckedChange={setIsSameSpecialist} />
      <Typography.h7
        className={cn('text-neutral-700', { 'text-neutral-900': isSameSpecialist })}
      >
        {t('consultation-appointment-page.consultation-specialist-choice.switch-text')}
      </Typography.h7>
    </Stack>
  );
};

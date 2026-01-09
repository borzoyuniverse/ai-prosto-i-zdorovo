import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetAppointments200ResponseInner } from '@/api/rpc-request/appointment/use-get-appointments';
import { OlVideocamera } from 'solar-icon-react/ol';

import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { ClientConsultationIcon } from './client-consultation-icon';

type ClientConsultationProps = GetAppointments200ResponseInner;

export const ClientConsultation = ({
  startDate,
  isRepeated,
  consultationTypeName,
  specialistType,
  unfilledQuestionnaires,
}: ClientConsultationProps) => {
  const { t } = useTranslation();

  const [soon, setSoon] = useState(false);

  useEffect(() => {
    const checkSoon = () => setSoon(isSoon(new Date(startDate).toISOString()));

    checkSoon();

    const interval = setInterval(checkSoon, 60 * 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <Stack
      className={cn('rounded-9 bg-neutral-0 p-unit-6', { 'bg-primary-200': soon })}
      gap={11}
    >
      <Stack gap={8}>
        <Stack align="center" justify="between" direction="row">
          <Typography.h6 className="text-neutral-900">
            {t('dates.dayWithWeekdayAndTime', { date: startDate })}
          </Typography.h6>
          {soon ? (
            <Typography.h7 className="rounded-5 bg-primary-100 px-unit-4 pb-unit-3 pt-unit-2 text-primary-900">
              {t('client-consultation-page.client-consultation.alert')}
            </Typography.h7>
          ) : null}
        </Stack>
        <Stack gap={6} align="center" direction="row">
          <ClientConsultationIcon type={specialistType} />
          <Stack gap={2}>
            <Typography.title7>{consultationTypeName}</Typography.title7>
            <Typography.body7>
              {t(`client-consultation-page.client-consultation.isPrimary.${isRepeated}`)}
            </Typography.body7>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8}>
        {unfilledQuestionnaires.length > 0 ? (
          <Stack gap={4}>
            {unfilledQuestionnaires.map((form, idx) => (
              <Button key={idx} variant="outline" size="s">
                {t(
                  `client-consultation-page.client-consultation.questionnaires.${form.formType}`,
                )}
              </Button>
            ))}
          </Stack>
        ) : null}
        {soon ? (
          <Button>
            <OlVideocamera />
            {t('client-consultation-page.client-consultation.button')}
          </Button>
        ) : (
          <Typography.body7>
            {t('client-consultation-page.client-consultation.text-link')}
          </Typography.body7>
        )}
      </Stack>
    </Stack>
  );
};

const isSoon = (startDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const diff = start.getTime() - now.getTime();
  return diff <= 60 * 60 * 1000 || diff < 0;
};

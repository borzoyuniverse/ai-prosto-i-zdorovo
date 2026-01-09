import { useTranslation } from 'react-i18next';

import { SpecialistTypeDto } from '@/api/rpc-request/types';

import { Typography } from '../typography/typography';

type SpecialistTypeTitlePrpos = {
  type: SpecialistTypeDto;
};

const titles: Record<SpecialistTypeDto, string> = {
  MASTER_COACH: `specialist-type-title.${SpecialistTypeDto.MasterCoach}`,
  MASTER_TRAINER: `specialist-type-title.${SpecialistTypeDto.MasterTrainer}`,
  NUTRITIONIST: `specialist-type-title.${SpecialistTypeDto.Nutritionist}`,
  RELAXOLOGIST: `specialist-type-title.${SpecialistTypeDto.Relaxologist}`,
  SLEEP_EXPERT: `specialist-type-title.${SpecialistTypeDto.SleepExpert}`,
};

export const SpecialistTypeTitle = ({ type }: SpecialistTypeTitlePrpos) => {
  const { t } = useTranslation();
  return (
    <Typography.title7 className="text-neutral-900">{t(titles[type])}</Typography.title7>
  );
};

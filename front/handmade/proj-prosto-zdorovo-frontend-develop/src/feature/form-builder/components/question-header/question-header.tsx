import { OlInfoCircle } from 'solar-icon-react/ol';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

type QuestionHeaderProps = {
  ordinalNumber: number;
  error?: string;
};

export const QuestionHeader = ({ ordinalNumber, error }: QuestionHeaderProps) => {
  return (
    <Stack direction="row" justify="between">
      <Typography.body7 className="w-fit rounded-5 bg-primary-100 px-unit-4 pb-unit-3 pt-unit-2 text-primary-900">{`Вопрос ${ordinalNumber}`}</Typography.body7>
      {error ? (
        <Stack gap={2} direction="row" align="center">
          <OlInfoCircle size={14} className="text-error-700" />
          <Typography.body7 className="text-error-700">{error}</Typography.body7>
        </Stack>
      ) : null}
    </Stack>
  );
};

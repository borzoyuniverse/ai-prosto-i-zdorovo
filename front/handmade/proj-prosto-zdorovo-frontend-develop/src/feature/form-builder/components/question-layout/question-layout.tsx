import { PropsWithChildren } from 'react';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { QuestionHeader } from '../question-header/question-header';

type QuestionLayoutProps = {
  question?: string;
  ordinalNumber?: number;
  description?: string;
  error?: string;
};

export const QuestionLayout = ({
  question,
  description,
  ordinalNumber,
  error,
  children,
}: PropsWithChildren<QuestionLayoutProps>) => {
  const showSeparator = ordinalNumber ? ordinalNumber !== 1 : false;

  return (
    <Stack gap={11}>
      {showSeparator ? <Stack className="mt-unit-11 h-px bg-neutral-100" /> : null}
      <Stack gap={7}>
        {ordinalNumber ? (
          <QuestionHeader ordinalNumber={ordinalNumber} error={error} />
        ) : null}
        {question || description ? (
          <Stack gap={3}>
            {question ? (
              <Typography.h5 className="text-neutral-900">{question}</Typography.h5>
            ) : null}
            {description ? (
              <Typography.body6 className="text-neutral-700">
                {description}
              </Typography.body6>
            ) : null}
          </Stack>
        ) : null}
        <Stack>{children}</Stack>
      </Stack>
    </Stack>
  );
};

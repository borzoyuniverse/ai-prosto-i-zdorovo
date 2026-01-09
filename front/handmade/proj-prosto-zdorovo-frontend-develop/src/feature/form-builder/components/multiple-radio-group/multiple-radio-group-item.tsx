import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { RadioOption } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/lib/shadcn/components/ui/toggle-group/toggle-group';

type MultipleRadioGroupItemProps = {
  name: string;
  question: string;
  options: RadioOption[];
};

export const MultipleRadioGroupItem = ({
  name,
  question,
  options,
}: MultipleRadioGroupItemProps) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(`${name}.question`, question);
  }, [name, question, setValue]);

  return (
    <Stack gap={6}>
      <Typography.h6 className="text-neutral-900">{question}</Typography.h6>
      <Controller
        name={`${name}.answer`}
        rules={{ required: true }}
        control={control}
        render={({ field: { value, onChange } }) => (
          <ToggleGroup
            type="single"
            value={value}
            onValueChange={(v) => {
              if (!v) {
                return;
              }
              onChange(v);
            }}
            className="gap-unit-4"
          >
            {options.map((option, idx) => {
              return (
                <ToggleGroupItem key={idx} value={option.value.title} variant="primary">
                  {option.value.title}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        )}
      />
    </Stack>
  );
};

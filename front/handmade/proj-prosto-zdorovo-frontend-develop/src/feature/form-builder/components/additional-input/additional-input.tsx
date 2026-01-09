import { Controller } from 'react-hook-form';

import { AdditionalField } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { TextareaAutoSize } from '@/components/textarea-autosize/textarea-autosize';
import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

type AdditionalInputProps = {
  name: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
} & AdditionalField;

export const AdditionalInput = ({
  text,
  placeholder,
  name,
  required = false,
  onValueChange,
}: AdditionalInputProps) => {
  return (
    <Stack gap={4}>
      <Typography.body6 className="text-neutral-900">{text}</Typography.body6>
      <Controller
        rules={{ required }}
        name={name}
        render={({ field: { value, onChange } }) => {
          return (
            <TextareaAutoSize
              value={value}
              showInfoTip
              onChange={(event) => {
                onChange(event.target.value);
                onValueChange?.(event.target.value);
              }}
              placeholder={placeholder}
            />
          );
        }}
      />
    </Stack>
  );
};

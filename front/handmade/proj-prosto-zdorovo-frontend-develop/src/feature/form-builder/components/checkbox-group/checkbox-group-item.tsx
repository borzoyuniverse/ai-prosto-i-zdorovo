import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import ActiveCheckboxButton from '@/assets/icons/active-checkbox-button.svg?react';
import CheckboxButton from '@/assets/icons/checkbox-button.svg?react';

type CheckboxGroupItemProps = {
  title: string;
  description: string;
  isActive: boolean;
} & ToggleGroupItemProps;

export const CheckboxGroupItem = ({
  value,
  title,
  description,
  isActive,
  ...rest
}: CheckboxGroupItemProps) => {
  return (
    <ToggleGroupPrimitive.Item value={value} className="w-full" {...rest}>
      <Stack
        gap={4}
        direction="row"
        align={description ? 'start' : 'center'}
        className={cn('rounded-7 bg-primary-50 p-unit-6', {
          'bg-primary-200': isActive,
        })}
      >
        {isActive ? (
          <ActiveCheckboxButton className="shrink-0" />
        ) : (
          <CheckboxButton className="shrink-0" />
        )}
        <Stack className="text-left">
          <Typography.body6 className="text-neutral-900">{title}</Typography.body6>
          <Typography.body6 className="text-neutral-700">{description}</Typography.body6>
        </Stack>
      </Stack>
    </ToggleGroupPrimitive.Item>
  );
};

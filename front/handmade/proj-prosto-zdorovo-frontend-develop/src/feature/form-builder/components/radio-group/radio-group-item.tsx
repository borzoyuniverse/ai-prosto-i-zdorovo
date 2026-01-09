import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { ToggleGroupItem } from '@/lib/shadcn/components/ui/toggle-group/toggle-group';
import { cn } from '@/lib/shadcn/lib/utils';

import ActiveRadioButton from '@/assets/icons/active-radio-button.svg?react';
import RadioButton from '@/assets/icons/radio-button.svg?react';

type RadioGroupItemProps = {
  title: string;
  description: string;
  isActive: boolean;
  variant?: 'default' | 'chip';
} & ToggleGroupItemProps;

export const RadioGroupItem = ({
  value,
  title,
  description,
  isActive,
  variant = 'default',
}: RadioGroupItemProps) => {
  return variant === 'default' ? (
    <ToggleGroupPrimitive.Item value={value} className="w-full">
      <Stack
        gap={4}
        direction="row"
        align={description ? 'start' : 'center'}
        className={cn('rounded-7 bg-primary-50 p-unit-6', {
          'bg-primary-200': isActive,
        })}
      >
        {isActive ? (
          <ActiveRadioButton className="shrink-0" />
        ) : (
          <RadioButton className="shrink-0" />
        )}
        <Stack className="text-left">
          <Typography.body6 className="text-neutral-900">{title}</Typography.body6>
          <Typography.body6 className="text-neutral-700">{description}</Typography.body6>
        </Stack>
      </Stack>
    </ToggleGroupPrimitive.Item>
  ) : (
    <ToggleGroupItem value={value} variant="primary">
      {JSON.parse(value).title}
    </ToggleGroupItem>
  );
};

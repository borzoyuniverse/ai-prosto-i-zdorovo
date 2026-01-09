import { Controller, useFormContext } from 'react-hook-form';

import { RadioOption } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { ToggleGroup } from '@/lib/shadcn/components/ui/toggle-group/toggle-group';

import { RadioGroupItem } from '../radio-group/radio-group-item';

type ResetButtonGroupProps = {
  name: string;
  options: RadioOption[];
};
export const ResetButtonGroup = ({ options, name }: ResetButtonGroupProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
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
              const itemValue = JSON.stringify(option.value);
              const isActive = itemValue === value;

              return (
                <RadioGroupItem
                  key={idx}
                  value={itemValue}
                  title={option.value.title}
                  description={option.value.subTitle ?? ''}
                  isActive={isActive}
                />
              );
            })}
          </ToggleGroup>
        );
      }}
    />
  );
};

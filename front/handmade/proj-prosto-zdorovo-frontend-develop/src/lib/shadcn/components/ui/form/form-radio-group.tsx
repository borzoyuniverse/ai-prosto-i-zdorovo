import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import type { Option } from '@/types/option';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { FormControl, FormItem } from './form';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { cn } from '@/lib/shadcn/lib/utils';
import { Typography } from '@/components/typography/typography';
import { Label } from '../label';

type Props = {
  options: Option[];
};

export const FormRadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroup> & Props
>(({ options, ...props }, ref) => {
  return (
    <FormItem>
      <FormControl>
        <RadioGroup ref={ref} {...props}>
          {options.map((option, index) => (
            <Label htmlFor={option.value} className="cursor-pointer">
              <div
                key={index}
                className={cn(
                  'flex cursor-pointer items-center gap-unit-6 rounded-large border-2 border-transparent bg-white px-unit-8 py-unit-9',
                  option.value === props.value && 'border-teal-400 bg-teal-100',
                )}
              >
                <RadioGroupItem id={option.value} value={option.value} />
                <Typography.body1 className="text-slate-400" data-testid="form-option">
                  {option.label}
                </Typography.body1>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
});

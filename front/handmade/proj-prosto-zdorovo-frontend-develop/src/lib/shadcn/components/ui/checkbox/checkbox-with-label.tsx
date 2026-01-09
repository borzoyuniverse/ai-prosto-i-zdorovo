import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';

import { Checkbox } from '@/lib/shadcn/components/ui/checkbox/checkbox';
import { Label } from '../label/label';
import { cn } from '@/lib/shadcn/lib/utils';

interface CheckboxWithLabelProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  label: ReactNode;
  labelClassName?: string;
}

export function CheckboxWithLabel({
  label,
  labelClassName,
  ...props
}: CheckboxWithLabelProps) {
  const id = useId();

  return (
    <Label className={cn('text-p flex', labelClassName)} htmlFor={id}>
      <Checkbox {...props} id={id} />
      {label}
    </Label>
  );
}

import { CheckboxWithLabel } from '@/lib/shadcn/components/ui/checkbox/checkbox-with-label';
import { cn } from '@/lib/shadcn/lib/utils';
import type { Option } from '@/types/option';

type Props = {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  className?: string;
  labelClassName?: string;
};

export function CheckboxGroup({
  options,
  selected,
  onChange,
  className,
  labelClassName,
}: Props) {
  function onCheckedChange(option: Option, checked: boolean | 'indeterminate') {
    if (checked) {
      onChange([...selected, option.value]);
    } else {
      onChange(selected.filter((value) => value != option.value));
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {options.map((option) => (
        <CheckboxWithLabel
          key={option.value}
          label={option.label}
          labelClassName={labelClassName}
          checked={selected.includes(option.value)}
          onCheckedChange={(checked) => onCheckedChange(option, checked)}
        />
      ))}
    </div>
  );
}

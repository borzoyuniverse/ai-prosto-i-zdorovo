import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/shadcn/components/ui/form/form';
import { Input } from '@/lib/shadcn/components/ui/input/input';

interface TextFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
}

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: TextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-unit-4">
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.onChange?.(e);
              }}
              onBlur={(e) => {
                field.onBlur();
                props.onBlur?.(e);
              }}
              value={field.value}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

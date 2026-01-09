import { Control, FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '@/lib/shadcn/components/ui/checkbox/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/shadcn/components/ui/form/form';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

interface CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends React.ComponentProps<typeof Checkbox> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
}

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: CheckboxFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <Stack gap={4} asChild>
          <FormItem>
            <Stack direction="row" align="center" gap={4}>
              <FormControl>
                <Checkbox
                  {...props}
                  {...field}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    props.onCheckedChange?.(checked);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    props.onBlur?.(e);
                  }}
                  checked={field.value}
                />
              </FormControl>
              {label ? <FormLabel className="text-body7">{label}</FormLabel> : null}
            </Stack>
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormMessage />
          </FormItem>
        </Stack>
      )}
    />
  );
}

import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

export function createTrimOnBlur<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  fieldName: Path<TFieldValues>,
  externalOnBlur?: () => void,
) {
  return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();

    form.setValue(fieldName, trimmedValue as PathValue<TFieldValues, typeof fieldName>, {
      shouldValidate: true,
      shouldDirty: true,
    });

    externalOnBlur?.();
  };
}

import { useId } from 'react';

import { Input } from '@/lib/shadcn/components/ui/input/input';

type Props = {
  label: (id: string) => React.ReactNode;
} & React.ComponentProps<'input'>;

export function InputField({ label, ...inputProps }: Props) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {label(id)}
      <Input {...inputProps} id={id} />
    </div>
  );
}

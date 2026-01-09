import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/shadcn/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary-700 data-[state=unchecked]:bg-primary-300 inline-flex h-unit-13 w-[58px] shrink-0 items-center rounded-7 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-neutral-0 pointer-events-none block size-unit-11 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(58px-24px-4px)] data-[state=unchecked]:translate-x-unit-2',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

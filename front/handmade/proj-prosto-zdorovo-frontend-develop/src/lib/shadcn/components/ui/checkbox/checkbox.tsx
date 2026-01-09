import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    error?: boolean;
  }
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'group flex shrink-0 justify-center text-slate-300 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-teal-500',
      error && 'text-red-500',
      className,
    )}
    {...props}
  >
    {/* <SquareCheck className="size-unit-11 [&_path]:hidden group-aria-checked:[&_path]:block" /> */}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

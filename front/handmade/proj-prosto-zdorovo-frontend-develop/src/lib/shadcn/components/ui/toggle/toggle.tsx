import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-7 font-manrope outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          'bg-primary-50 text-neutral-900 data-[state=on]:bg-primary-700 data-[state=on]:text-neutral-0 py-unit-7 px-unit-10',
        secondary:
          'bg-neutral-0 text-neutral-900 data-[state=on]:bg-secondary-700 py-unit-6 px-unit-10',
      },
      size: {
        m: 'text-body5 font-medium',
        s: 'text-body6 font-medium',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        className: 'text-h6',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'm',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

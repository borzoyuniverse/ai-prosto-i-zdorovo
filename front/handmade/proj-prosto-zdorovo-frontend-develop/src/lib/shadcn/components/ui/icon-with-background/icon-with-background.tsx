import { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

const iconWithBackgroundVariants = cva('inline-flex items-center justify-center gap-2', {
  variants: {
    variant: {
      green: 'bg-primary-300 [&_svg]:text-primary-900',
      white: 'bg-primary-100 [&_svg]:text-primary-700',
    },
    size: {
      m: 'rounded-7 p-unit-4 [&_svg]:size-5.5',
      s: 'rounded-6 p-unit-3 [&_svg]:size-4',
    },
  },
  defaultVariants: {
    variant: 'green',
    size: 'm',
  },
});

interface IconWithBackgroundProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconWithBackgroundVariants> {
  asChild?: boolean;
}

const IconWithBg = forwardRef<HTMLDivElement, IconWithBackgroundProps>(
  ({ size, variant, className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(iconWithBackgroundVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
IconWithBg.displayName = 'IconWithBg';

export { IconWithBg };

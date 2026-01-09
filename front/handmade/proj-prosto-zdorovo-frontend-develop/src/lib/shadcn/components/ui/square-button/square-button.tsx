import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import { squareButtonVariants } from './square-button-variants';

interface SquareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof squareButtonVariants> {
  asChild?: boolean;
}

export const SquareButton = React.forwardRef<HTMLButtonElement, SquareButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(squareButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

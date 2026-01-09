import React from 'react';

import { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/shadcn/lib/utils';

import { iconButtonVariants } from './icon-button-variants';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
        ref={ref}
      />
    );
  },
);

IconButton.displayName = 'IconButton';

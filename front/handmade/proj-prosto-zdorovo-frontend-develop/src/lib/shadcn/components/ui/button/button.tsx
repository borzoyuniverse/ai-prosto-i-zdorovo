import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import { Slot } from '@radix-ui/react-slot';
import { Loader } from '@/components/icons/loader';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? <Loader className="animate-spin" /> : children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button };

import React from 'react';

import * as Slot from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/shadcn/lib/utils';

const textButtonVariants = cva(
  'inline-flex items-center text-teal-500 transition-colors focus-visible:outline-none active:text-teal-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        s: 'text-small1',
        m: 'text-p4',
      },
      contentType: {
        text: 'py-unit-2',
        icon: 'gap-unit-1 py-unit-3 [&_svg]:pointer-events-none [&_svg]:size-unit-8 [&_svg]:shrink-0',
      },
    },
    defaultVariants: {
      size: 'm',
      contentType: 'text',
    },
  },
);

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textButtonVariants> {
  asChild?: boolean;
  leftAddon?: React.ReactNode;
  children: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    { asChild, leftAddon, children, rightAddon, size, contentType, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(textButtonVariants({ size, contentType, className }))}
        {...props}
      >
        {leftAddon}
        <Slot.Slottable>{children}</Slot.Slottable>
        {rightAddon}
      </Comp>
    );
  },
);
TextButton.displayName = 'TextButton';

export { TextButton, textButtonVariants };

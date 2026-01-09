import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const mainButtonVariants = cva(
  'inline-flex items-center justify-center gap-unit-4 whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        filled: 'bg-teal-500 text-white active:bg-teal-400 disabled:bg-teal-200',
        tonal:
          'border border-teal-100 bg-teal-100 text-teal-500 active:bg-teal-200 disabled:bg-teal-100 disabled:text-teal-300',
        outlined:
          'border border-teal-200 bg-white text-teal-500 active:border-teal-500 active:text-teal-400 disabled:border-teal-100 disabled:text-teal-300',
        text: '!text-p2 text-slate-500 active:text-slate-400 disabled:text-slate-250',
      },
      size: {
        s: 'rounded-large px-unit-4 text-p2',
        l: 'rounded-xl px-unit-4 text-p1',
      },
      contentType: {
        text: '',
        icon: '[&_svg]:pointer-events-none [&_svg]:size-[1.625rem] [&_svg]:shrink-0',
      },
    },
    compoundVariants: [
      {
        size: 's',
        contentType: 'icon',
        className: 'py-unit-4',
      },
      {
        size: 'l',
        contentType: 'icon',
        className: 'py-unit-7',
      },
      {
        size: 's',
        contentType: 'text',
        className: 'py-unit-6',
      },
      {
        size: 'l',
        contentType: 'text',
        className: 'py-unit-9',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'l',
      contentType: 'text',
    },
  },
);

export interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mainButtonVariants> {
  asChild?: boolean;
}

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(
  (
    { className, variant, size, contentType, asChild = false, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(mainButtonVariants({ variant, size, contentType, className }))}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
    );
  },
);

MainButton.displayName = 'MainButton';

export { MainButton, mainButtonVariants };

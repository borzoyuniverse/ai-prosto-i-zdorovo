import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'border rounded-8 border-neutral-200 px-unit-8 pt-[15px] bg-transparent  text-p3 text-neutral-900 caret-teal-300 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-700 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      inputSize: {
        s: 'pb-[17px] text-body6 placeholder:text-body6',
        m: 'pb-unit-[79px] text-body5 placeholder:text-body5',
      },
    },
    defaultVariants: {
      inputSize: 's',
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ className, inputSize }))}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };

import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/shadcn/lib/utils';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      rowReverse: 'flex-row-reverse',
      column: 'flex-col',
      columnReverse: 'flex-col-reverse',
    },
    gap: {
      0: 'gap-unit-0',
      1: 'gap-unit-1',
      2: 'gap-unit-2',
      3: 'gap-unit-3',
      4: 'gap-unit-4',
      5: 'gap-unit-5',
      6: 'gap-unit-6',
      7: 'gap-unit-7',
      8: 'gap-unit-8',
      9: 'gap-unit-9',
      10: 'gap-unit-10',
      11: 'gap-unit-11',
      12: 'gap-unit-12',
      13: 'gap-unit-13',
      14: 'gap-unit-14',
      15: 'gap-unit-15',
      16: 'gap-unit-16',
      17: 'gap-unit-17',
      18: 'gap-unit-18',
      19: 'gap-unit-19',
      20: 'gap-unit-20',
      21: 'gap-unit-21',
      22: 'gap-unit-22',
      23: 'gap-unit-23',
      24: 'gap-unit-24',
      25: 'gap-unit-25',
    },
    justify: {
      normal: 'justify-normal',
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 0,
    justify: 'normal',
    align: 'stretch',
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction, gap, justify, align, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ direction, gap, justify, align, className }))}
        {...props}
      />
    );
  },
);

export { Stack, stackVariants };

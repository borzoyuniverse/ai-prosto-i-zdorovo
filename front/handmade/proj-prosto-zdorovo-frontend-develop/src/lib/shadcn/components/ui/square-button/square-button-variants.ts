import { cva } from 'class-variance-authority';

export const squareButtonVariants = cva(
  'rounded-medium p-unit-5 hover:cursor-pointer active:bg-slate-200 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        'with-bg': 'bg-white',
        'without-bg': 'bg-transparent',
        'with-symbol': 'bg-white',
      },
      size: {
        sm: '[&>svg]:size-unit-8',
        md: '[&>svg]:size-unit-10',
        lg: '[&>svg]:size-unit-11',
      },
    },
    defaultVariants: {
      variant: 'with-bg',
      size: 'lg',
    },
  },
);

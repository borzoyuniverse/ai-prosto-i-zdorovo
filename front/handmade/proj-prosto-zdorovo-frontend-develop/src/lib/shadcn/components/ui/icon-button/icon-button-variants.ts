import { cva } from 'class-variance-authority';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-large focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        main: 'bg-teal-100 text-teal-500 hover:bg-teal-300 active:bg-teal-200',
      },
      size: {
        md: 'px-unit-9 py-unit-4 [&>svg]:size-unit-12',
      },
    },
    defaultVariants: {
      variant: 'main',
      size: 'md',
    },
  },
);

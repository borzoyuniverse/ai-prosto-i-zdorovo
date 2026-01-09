import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-unit-4 whitespace-nowrap font-medium font-manrope transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-unit-10 shrink-0 [&_svg]:shrink-0 outline-none',
  {
    variants: {
      variant: {
        filled: 'bg-primary-700 text-neutral-0 active:bg-primary-800',
        outline: 'border border-primary-700 text-neutral-900 active:bg-primary-100',
        text: 'bg-neutral-0 text-neutral-900 active:bg-primary-200',
      },
      size: {
        m: 'text-body5 rounded-8 p-unit-8',
        s: 'text-body6 rounded-7 px-unit-8 py-unit-6',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'm',
    },
  },
);

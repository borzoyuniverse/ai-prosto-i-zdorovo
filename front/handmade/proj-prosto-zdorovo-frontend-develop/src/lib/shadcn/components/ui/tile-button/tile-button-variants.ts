import { cva } from 'class-variance-authority';

export const tileButtonVariants = cva(
  'flex items-center rounded-large hover:bg-slate-200 active:bg-slate-200',
  {
    variants: {
      gap: {
        small: 'gap-unit-1',
        medium: 'gap-unit-5',
      },
      background: {
        default: 'bg-white',
        light: 'bg-slate-100',
      },
      paddingSize: {
        medium: 'px-unit-6 py-unit-4',
        large: 'p-unit-6',
      },
    },
    defaultVariants: {
      gap: 'medium',
      background: 'default',
      paddingSize: 'medium',
    },
  },
);

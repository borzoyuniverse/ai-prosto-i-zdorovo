import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-title1',
        'text-title2',
        'text-title3',
        'text-title4',
        'text-title5',
        'text-title6',
        'text-title7',
        'text-title8',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-h7',
        'text-body1',
        'text-body2',
        'text-body3',
        'text-body4',
        'text-body5',
        'text-body6',
        'text-body7',
        'text-numeric',
        'text-numeric3',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

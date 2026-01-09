import { ReactNode } from 'react';

import { cn } from '@/lib/shadcn/lib/utils';

type Props = {
  elements: ReactNode[];
};

const gridStylesByCount = {
  1: '[&>*:first-child]:col-start-1 [&>*:first-child]:col-end-5 [&>*:first-child]:row-span-2',
  2: '[&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 [&>*:first-child]:row-span-2 [&>*:nth-child(2)]:col-start-3 [&>*:nth-child(2)]:col-end-5 [&>*:nth-child(2)]:row-span-2',
  3: '[&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 [&>*:first-child]:row-span-2 [&>*:nth-child(2)]:col-start-3 [&>*:nth-child(2)]:col-end-5 [&>*:nth-child(3)]:col-start-3 [&>*:nth-child(3)]:col-end-5',
  4: '[&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 [&>*:first-child]:row-span-2 [&>*:nth-child(2)]:col-start-3 [&>*:nth-child(2)]:col-end-5 [&>*:nth-child(3)]:col-start-3 [&>*:nth-child(3)]:col-end-4 [&>*:nth-child(4)]:col-start-4 [&>*:nth-child(4)]:col-end-5',
  5: '[&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 [&>*:first-child]:row-span-2 [&>*:nth-child(2)]:col-start-3 [&>*:nth-child(2)]:col-end-4 [&>*:nth-child(3)]:col-start-4 [&>*:nth-child(3)]:col-end-5 [&>*:nth-child(4)]:col-start-3 [&>*:nth-child(4)]:col-end-4 [&>*:nth-child(5)]:col-start-4 [&>*:nth-child(5)]:col-end-5',
};

export function ImagesGrid({ elements }: Props) {
  const processedElements = elements.slice(0, 5);
  return (
    <div
      className={cn(
        'grid size-full grid-cols-4 gap-5',
        gridStylesByCount[processedElements.length as keyof typeof gridStylesByCount],
      )}
    >
      {processedElements}
    </div>
  );
}

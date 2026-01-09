import { useRef } from 'react';

import { v4 as uuid } from 'uuid';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
  const stepsRef = useRef(Array.from({ length: totalSteps }).map(() => ({ id: uuid() })));

  return (
    <Stack direction="row" align="center" gap={2}>
      {stepsRef.current.map(({ id }, idx) => (
        <div
          key={id}
          className={cn('h-unit-3 flex-1 rounded-10 bg-secondary-300', {
            'bg-secondary-700': currentStep >= idx + 1,
          })}
        />
      ))}
    </Stack>
  );
}

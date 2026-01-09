import type { ComponentPropsWithoutRef } from 'react';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { MultiStepFormHeader } from './multi-step-form-header';
import { StepContextProvider } from './step-context-provider';

interface MultiStepFormLayoutProps extends ComponentPropsWithoutRef<typeof Stack> {
  title: string;
  totalSteps: number;
  currentStep?: number;
}

export function MultiStepFormLayout({
  children,
  title,
  totalSteps,
  currentStep,
  ...props
}: MultiStepFormLayoutProps) {
  return (
    <Stack {...props}>
      <StepContextProvider defaultCurrentStep={currentStep} totalSteps={totalSteps}>
        <MultiStepFormHeader title={title} />
        <Stack className="flex-1">{children}</Stack>
      </StepContextProvider>
    </Stack>
  );
}

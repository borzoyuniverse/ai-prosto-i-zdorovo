import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { clamp } from '@/utils/clamp';

import { StepContext } from '../context/step-context';

interface StepContextProviderProps extends PropsWithChildren {
  totalSteps: number;
  defaultCurrentStep?: number;
}

export function StepContextProvider({
  children,
  totalSteps,
  defaultCurrentStep = 1,
}: StepContextProviderProps) {
  const [currentStep, setCurrentStep] = useState(() =>
    clamp({ min: 1, max: totalSteps, value: defaultCurrentStep }),
  );

  const clampToStepsInterval = useCallback(
    (value: number) => {
      return clamp({ min: 1, max: totalSteps, value });
    },
    [totalSteps],
  );

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => clampToStepsInterval(prev - 1));
  }, [clampToStepsInterval]);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => clampToStepsInterval(prev + 1));
  }, [clampToStepsInterval]);

  const value = useMemo(
    () => ({
      totalSteps,
      currentStep,
      goToPrevStep,
      goToNextStep,
    }),
    [currentStep, goToNextStep, goToPrevStep, totalSteps],
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}

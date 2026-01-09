import { createContext, useContext } from 'react';

type StepContextType = {
  totalSteps: number;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

export const StepContext = createContext<StepContextType | null>(null);

export function useStepContext() {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error('StepContext must be provided');
  }

  return context;
}

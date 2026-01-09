import { Children, PropsWithChildren } from 'react';

import { useStepContext } from '../context/step-context';

export function StepsComposer({ children }: PropsWithChildren) {
  const { currentStep } = useStepContext();

  const childs = Children.toArray(children);

  const CurrentStepNode = childs[currentStep - 1];

  return CurrentStepNode;
}

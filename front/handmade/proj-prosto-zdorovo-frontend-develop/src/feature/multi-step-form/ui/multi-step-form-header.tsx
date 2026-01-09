import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { OlAltArrowLeft } from 'solar-icon-react/ol';

import { XIcon } from '@/components/icons/x-icon';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { ProgressBar } from './progress-bar';
import { useStepContext } from '../context/step-context';

interface MultiStepFormHeaderProps {
  title: string;
}

export function MultiStepFormHeader({ title }: MultiStepFormHeaderProps) {
  const router = useRouter();
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  const { totalSteps, currentStep, goToPrevStep } = useStepContext();

  const onPrevClick = () => {
    if (currentStep === 1) {
      if (canGoBack) {
        router.history.back();
      } else {
        navigate({ to: '/' });
      }
    } else {
      goToPrevStep();
    }
  };

  const onCloseClick = () => {
    navigate({ to: '/' });
  };

  return (
    <Stack gap={10}>
      <header className="flex items-center">
        <Button
          onClick={onPrevClick}
          variant="text"
          className="!rounded-6 bg-neutral-100 !p-unit-3"
        >
          <OlAltArrowLeft />
        </Button>
        <Typography.h5 className="flex-1 text-center text-neutral-900">
          {title}
        </Typography.h5>
        <Button
          onClick={onCloseClick}
          variant="text"
          className="rounded-6 bg-neutral-100 !p-unit-3"
        >
          <XIcon />
        </Button>
      </header>
      <ProgressBar totalSteps={totalSteps} currentStep={currentStep} />
    </Stack>
  );
}

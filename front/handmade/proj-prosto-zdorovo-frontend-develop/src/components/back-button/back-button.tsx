import { ReactNode } from 'react';

import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { OlAltArrowLeft } from 'solar-icon-react/ol';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { cn } from '@/lib/shadcn/lib/utils';

interface BackButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function BackButton({ onClick, icon, className }: BackButtonProps) {
  const router = useRouter();
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  const handleClick = () => {
    if (onClick) {
      onClick(); // кастомная логика сверху
    } else if (canGoBack) {
      router.history.back();
    } else {
      navigate({ to: '/' });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="text"
      className={cn('!rounded-6 bg-neutral-100 !p-unit-3', className)}
    >
      {icon ?? <OlAltArrowLeft />}
    </Button>
  );
}

import { ReactNode } from 'react';

import { OlBellBing } from 'solar-icon-react/ol';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { TabBar } from '../tab-bar/tab-bar';
import { Typography } from '../typography/typography';

type BaseLayoutProps = {
  children: ReactNode;
  title: string;
  className?: string;
  wrapperClassName?: string;
};

export function BaseLayout({
  children,
  title,
  className,
  wrapperClassName,
}: BaseLayoutProps) {
  return (
    <Stack className={cn('h-dvh bg-primary-50', wrapperClassName)}>
      <Stack
        direction="row"
        justify="between"
        align="center"
        className="rounded-b-10 bg-neutral-0 px-unit-8 pb-unit-6 pt-unit-2 shadow-shadowDown"
      >
        <Typography.title6>{title}</Typography.title6>
        <Button
          variant="outline"
          className="rounded-[1000px] border-none bg-primary-100 !p-unit-4 text-primary-900"
        >
          <OlBellBing />
        </Button>
      </Stack>
      <Stack className={cn('flex-1 overflow-auto', className)}>{children}</Stack>
      <TabBar />
    </Stack>
  );
}

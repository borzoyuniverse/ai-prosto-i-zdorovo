import { forwardRef } from 'react';

import { OlAltArrowRight } from 'solar-icon-react/ol';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

interface ProfileMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ProfileMenuItem = forwardRef<HTMLDivElement, ProfileMenuItemProps>(
  ({ title, className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        gap={6}
        direction="row"
        align="center"
        className={cn('cursor-pointer rounded-7 bg-neutral-0 p-unit-8', className)}
        {...props}
      >
        <Typography.body5 className="flex-1 text-neutral-900">{title}</Typography.body5>
        <OlAltArrowRight size={20} className="text-primary-700" />
      </Stack>
    );
  },
);

ProfileMenuItem.displayName = 'ProfileMenuItem';

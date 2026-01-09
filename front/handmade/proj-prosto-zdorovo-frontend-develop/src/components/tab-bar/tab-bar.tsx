import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { FileRoutesByFullPath } from '@/app/routeTree.gen';
import { NewMessageIndicator } from '@/feature/chat/new-message-indicator';
import { Link } from '@tanstack/react-router';
import { BdCalendarAdd, BdClipboard, BdUser } from 'solar-icon-react/bd';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { Typography } from '../typography/typography';

type Roles = 'CLIENT' | 'SPECIALIST' | 'CURATOR';

const tabBarVariants: Record<
  Roles,
  {
    Icon: ({ active }: { active: boolean }) => ReactNode;
    to: keyof FileRoutesByFullPath;
  }[]
> = {
  CLIENT: [
    {
      Icon: () => <BdCalendarAdd />,
      to: '/',
    },
    {
      Icon: ({ active }) => <NewMessageIndicator active={active} />,
      to: '/chat-with-curator',
    },
    {
      to: '/client-recommendations',
      Icon: () => <BdClipboard />,
    },
    {
      Icon: () => <BdUser />,
      to: '/profile',
    },
  ],
  SPECIALIST: [
    {
      Icon: () => <BdCalendarAdd />,
      to: '/',
    },
  ],
  CURATOR: [
    {
      Icon: () => <BdCalendarAdd />,
      to: '/',
    },
  ],
};

export const TabBar = () => {
  const { t } = useTranslation();

  const role: Roles = 'CLIENT';

  return (
    <Stack
      direction="row"
      align="center"
      gap={2}
      className="rounded-t-10 bg-neutral-0 px-unit-4 pb-unit-3"
    >
      {tabBarVariants[role].map(({ Icon, to }, idx) => (
        <Link to={to} key={idx} className="flex-1">
          {({ isActive }) => (
            <Stack
              align="center"
              gap={1}
              className={cn('pb-unit-5 pt-unit-4 text-neutral-600', {
                'text-secondary-900': isActive,
              })}
            >
              <Stack
                align="center"
                justify="center"
                className={cn('rounded-7 px-unit-11 py-unit-2 text-neutral-300', {
                  'bg-secondary-600 text-secondary-900': isActive,
                })}
              >
                <Icon active={isActive} />
              </Stack>
              <Typography.body7>{t(`tab-bar.${role}.${idx + 1}`)}</Typography.body7>
            </Stack>
          )}
        </Link>
      ))}
    </Stack>
  );
};

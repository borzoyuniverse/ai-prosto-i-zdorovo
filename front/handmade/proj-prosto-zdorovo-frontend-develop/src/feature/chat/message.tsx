import { forwardRef } from 'react';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

type MessageProps = {
  senderId: string;
  text: string;
  time: string;
  currentUserId: string;
} & React.ComponentProps<'div'>;

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ text, senderId, currentUserId, time, ...props }, ref) => {
    const isOwnMessage = senderId === currentUserId;

    return (
      <Stack align={isOwnMessage ? 'end' : 'start'} ref={ref} {...props}>
        <Stack
          gap={2}
          className={cn('w-fit rounded-8 bg-neutral-0 p-unit-6', {
            'bg-primary-200': isOwnMessage,
          })}
        >
          <Typography.body6 className="text-neutral-900">{text}</Typography.body6>
          <Typography.body7 className="text-end text-neutral-600">
            {time}
          </Typography.body7>
        </Stack>
      </Stack>
    );
  },
);

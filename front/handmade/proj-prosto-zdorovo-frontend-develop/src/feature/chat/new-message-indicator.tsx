import { useCallback } from 'react';

import { GetChatsResponse, useGetChats } from '@/api/rpc-request/chat/use-get-chats';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { BdChatRoundDots } from 'solar-icon-react/bd';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { useStompSubscription } from './stomp-client/hooks/use-stomp-subscription';

type UnreadMessage = { chatId: string; unreadCount: number };

type NewMessageIndicatorProps = {
  active: boolean;
};

export const NewMessageIndicator = ({ active }: NewMessageIndicatorProps) => {
  const queryClient = useQueryClient();
  const userId = 'user1';

  const { data, isError, error, isPending } = useGetChats({ userId });

  const onMessage = useCallback(
    (msg: UnreadMessage) => {
      queryClient.setQueryData<InfiniteData<GetChatsResponse>>(
        [useGetChats.method, { userId }, useGetChats.baseKey],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              chats: page.chats.map((chat) =>
                chat.id === msg.chatId ? { ...chat, unreadCount: msg.unreadCount } : chat,
              ),
            })),
          };
        },
      );
    },
    [queryClient],
  );

  useStompSubscription<UnreadMessage>({
    topic: `/topic/user/${userId}/unread-updated`,
    onMessage,
  });

  if (isError) {
    throw error;
  }

  if (isPending) {
    return;
  }

  const unreadCount = data.chats[0].unreadCount;

  return (
    <Stack className="relative">
      <BdChatRoundDots className={active ? 'text-secondary-900' : 'text-neutral-300'} />
      <Stack
        align="center"
        justify="center"
        className="absolute -right-unit-2 -top-unit-2 size-unit-8 rounded-full bg-primary-700"
      >
        <Typography.numeric className="text-neutral-0">{unreadCount}</Typography.numeric>
      </Stack>
    </Stack>
  );
};

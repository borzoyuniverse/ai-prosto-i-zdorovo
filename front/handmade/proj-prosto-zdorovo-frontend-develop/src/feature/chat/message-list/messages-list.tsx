import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GetMessagesByChatIdResponse,
  MessageDto,
  useGetMessagesByChatId,
} from '@/api/rpc-request/chat/use-get-messages-by-chatid';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useIntersectionObserver } from 'usehooks-ts';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { FloatingDate } from './floating-date';
import { useDividerNavigation } from './use-divider-navigation';
import { useIsScrolling } from './use-is-scrolling';
import { Message } from '../message';
import { useStompPublish } from '../stomp-client/hooks/use-stomp-publish';
import { useStompSubscription } from '../stomp-client/hooks/use-stomp-subscription';
import { getMarginValue } from '../tools/get-margin-value';
import { isShowDateInfo } from '../tools/is-show-date-info';

type MessagesListProps = {
  chatId: string;
};

export const MessagesList = ({ chatId }: MessagesListProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: messages,
    isError,
    error,
    isPending,
    fetchNextPage,
  } = useGetMessagesByChatId({ chatId });

  const readMessage = useStompPublish<{ chatId: string }>('/read-message');

  const [cursorRef] = useIntersectionObserver({
    threshold: 0.1,
    onChange: (isIntersecting) => isIntersecting && fetchNextPage(),
  });
  const [lastMessageRef] = useIntersectionObserver({
    threshold: 0.1,
    onChange: (isIntersecting) => isIntersecting && readMessage?.({ chatId }),
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isScrolling } = useIsScrolling(scrollContainerRef);

  const dates = messages?.messages
    ?.filter((msg, idx, arr) => {
      const { isShowDate } = isShowDateInfo(msg, arr[idx + 1]);
      return isShowDate;
    })
    .map((msg) => new Date(msg.createdAt).toDateString());

  const { observeDate, floatingDate } = useDividerNavigation({
    dividerDates: dates ?? [],
    scrollContainer: scrollContainerRef,
  });

  const onMessage = useCallback(
    (msg: MessageDto) => {
      queryClient.setQueryData<InfiniteData<GetMessagesByChatIdResponse>>(
        [useGetMessagesByChatId.method, { chatId }, useGetMessagesByChatId.baseKey],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index: number) => {
              if (index === 0) {
                return {
                  ...page,
                  messages: [msg, ...page.messages],
                };
              }
              return page;
            }),
          };
        },
      );
    },
    [chatId, queryClient],
  );

  useStompSubscription<MessageDto>({
    topic: `/topic/chat/${chatId}`,
    onMessage,
  });

  if (isError) {
    throw error;
  }

  if (isPending) {
    return;
  }

  const getRef = (idx: number) => {
    if (idx === 0) {
      return lastMessageRef;
    } else if (idx === messages.messages.length - 3) {
      return cursorRef;
    } else {
      return null;
    }
  };

  return (
    <>
      <FloatingDate date={floatingDate} isShow={isScrolling} />
      <Stack
        direction="columnReverse"
        className="flex-1 overflow-auto px-unit-6 pb-unit-8"
        ref={scrollContainerRef}
        id="scroll-container"
      >
        {messages.messages.map((msg, idx) => {
          const nextMessage = messages.messages[idx + 1];

          const { isShowDate, date } = isShowDateInfo(msg, nextMessage);
          const marginValue = getMarginValue(msg, nextMessage);

          return (
            <>
              <Message
                {...msg}
                key={msg.id}
                currentUserId="user1"
                time={t('dates.time', { date: msg.createdAt })}
                ref={getRef(idx)}
                style={{ marginTop: `${marginValue}px` }}
              />
              {isShowDate ? (
                <Typography.body7
                  key={`${msg.id}-${date.toISOString()}`}
                  ref={observeDate}
                  data-date={date.toDateString()}
                  className="mx-auto mb-unit-4 mt-unit-6 w-fit rounded-5 bg-secondary-700 px-unit-4 pb-unit-2 pt-unit-1 text-center font-medium"
                >
                  {t('dates.dayOfFullMonth', { date })}
                </Typography.body7>
              ) : null}
            </>
          );
        })}
      </Stack>
    </>
  );
};

import { PAGE_SIZE } from '@/config/consts';

import { useInfiniteRPCQuery } from '@/lib/api/request/use-infinite-rpc-query';

export type MessageDto = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Date;
};

export type GetMessagesByChatIdResponse = {
  messages: MessageDto[];
};

export type GetMessagesByChatIdRequest = { chatId: string };

export function useGetMessagesByChatId(params: GetMessagesByChatIdRequest) {
  return useInfiniteRPCQuery<GetMessagesByChatIdResponse>({
    method: useGetMessagesByChatId.method,
    params,
    queryKeys: [useGetMessagesByChatId.baseKey],
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.messages.length >= PAGE_SIZE ? lastPageParam + 1 : undefined,
    select: (result) =>
      result.pages.reduce(
        (acc, page) => ({
          messages: [...acc.messages, ...page.messages],
        }),
        {
          messages: [],
        },
      ),
  });
}

useGetMessagesByChatId.baseKey = 'messages';

useGetMessagesByChatId.method = 'get-messages';

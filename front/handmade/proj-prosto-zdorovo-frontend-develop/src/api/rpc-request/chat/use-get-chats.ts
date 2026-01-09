import { PAGE_SIZE } from '@/config/consts';

import { useInfiniteRPCQuery } from '@/lib/api/request/use-infinite-rpc-query';

export type ChatDto = {
  id: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageDate: Date;
};

export type GetChatsResponse = {
  chats: ChatDto[];
};

export type GetChatsRequest = { userId: string };

export function useGetChats(params: GetChatsRequest) {
  return useInfiniteRPCQuery<GetChatsResponse>({
    method: useGetChats.method,
    params,
    queryKeys: [useGetChats.baseKey],
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.chats.length === PAGE_SIZE ? lastPageParam + 1 : undefined,
    select: (result) =>
      result.pages.reduce(
        (acc, page) => ({
          chats: [...acc.chats, ...page.chats],
        }),
        {
          chats: [],
        },
      ),
  });
}

useGetChats.baseKey = 'chats';

useGetChats.method = 'get-chats';

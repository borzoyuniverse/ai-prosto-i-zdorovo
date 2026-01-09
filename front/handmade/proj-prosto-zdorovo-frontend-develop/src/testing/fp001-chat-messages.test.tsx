import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';

import { useGetMessagesByChatId } from '@/api/rpc-request/chat/use-get-messages-by-chatid';
import { MessagesList } from '@/feature/chat/message-list/messages-list';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/api/rpc-request/chat/use-get-messages-by-chatid', () => ({
  useGetMessagesByChatId: vi.fn(),
}));

vi.mock('@/feature/chat/message-list/use-divider-navigation', () => ({
  useDividerNavigation: () => ({ observeDate: vi.fn(), floatingDate: new Date() }),
}));

vi.mock('@/feature/chat/message-list/use-is-scrolling', () => ({
  useIsScrolling: () => ({ isScrolling: false }),
}));

vi.mock('@/feature/chat/stomp-client/hooks/use-stomp-publish', () => ({
  useStompPublish: () => vi.fn(),
}));

vi.mock('@/feature/chat/stomp-client/hooks/use-stomp-subscription', () => ({
  useStompSubscription: () => undefined,
}));

vi.mock('usehooks-ts', () => ({
  useIntersectionObserver: () => [vi.fn()],
}));

vi.mock('@/feature/chat/message', () => ({
  Message: () => null,
}));

const renderWithQueryClient = (ui: React.ReactElement) => {
  const client = new QueryClient();
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
};

describe('MessagesList', () => {
  it('loads messages for chat', () => {
    const useGetMessagesByChatIdMock = vi.mocked(useGetMessagesByChatId);

    useGetMessagesByChatIdMock.mockReturnValue({
      data: { messages: [] },
      isError: false,
      error: null,
      isPending: false,
      fetchNextPage: vi.fn(),
    } as any);

    renderWithQueryClient(<MessagesList chatId="chat-1" />);

    expect(useGetMessagesByChatIdMock).toHaveBeenCalledWith({ chatId: 'chat-1' });
  });
});

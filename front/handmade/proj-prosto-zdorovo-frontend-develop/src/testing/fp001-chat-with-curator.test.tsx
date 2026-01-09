import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetChats } from '@/api/rpc-request/chat/use-get-chats';
import { ChatWithCurator } from '@/app/pages/chat-with-curator/chat-with-curator';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/components/base-layout/base-layout', () => ({
  BaseLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('@/lib/shadcn/components/ui/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));


vi.mock('@/feature/chat/chat-input/chat-input', () => ({
  ChatInput: () => null,
}));

vi.mock('@/feature/chat/message-list/messages-list', () => ({
  MessagesList: () => null,
}));

vi.mock('@/api/rpc-request/chat/use-get-chats', () => ({
  useGetChats: vi.fn(),
}));

describe('ChatWithCurator', () => {
  it('loads chat list for the user', () => {
    const useGetChatsMock = vi.mocked(useGetChats);

    useGetChatsMock.mockReturnValue({
      data: { chats: [] },
      isError: false,
      error: null,
      isPending: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<ChatWithCurator />);

    expect(useGetChatsMock).toHaveBeenCalled();
  });

  it('renders spinner while loading', () => {
    const useGetChatsMock = vi.mocked(useGetChats);

    useGetChatsMock.mockReturnValue({
      data: { chats: [] },
      isError: false,
      error: null,
      isPending: true,
      fetchNextPage: vi.fn(),
    } as any);

    render(<ChatWithCurator />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});

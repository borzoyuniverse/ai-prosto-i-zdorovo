import { useTranslation } from 'react-i18next';

import { useGetChats } from '@/api/rpc-request/chat/use-get-chats';
import { ChatInput } from '@/feature/chat/chat-input/chat-input';
import { MessagesList } from '@/feature/chat/message-list/messages-list';

import { BaseLayout } from '@/components/base-layout/base-layout';
import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';

export const ChatWithCurator = () => {
  const { t } = useTranslation();
  const { data, isError, error, isPending } = useGetChats({
    userId: 'userId',
  });

  if (isError) {
    throw error;
  }

  if (isPending) {
    return (
      <BaseLayout title={t('chat-with-curator.title')}>
        <Spinner />
      </BaseLayout>
    );
  }

  const chatId = data?.chats?.[0]?.id;

  return (
    <BaseLayout title={t('chat-with-curator.title')}>
      {chatId ? (
        <>
          <MessagesList chatId={chatId} />
          <ChatInput
            chatId={chatId}
            className="sticky bottom-unit-3 left-unit-4 w-[calc(100%-16px)]"
          />
        </>
      ) : null}
    </BaseLayout>
  );
};

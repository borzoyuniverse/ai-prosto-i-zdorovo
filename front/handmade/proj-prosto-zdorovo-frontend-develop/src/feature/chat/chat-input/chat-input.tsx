import { useState } from 'react';

import { MessageDto } from '@/api/rpc-request/chat/use-get-messages-by-chatid';
import { OlArrowUp, OlPaperclip } from 'solar-icon-react/ol';

import { TextareaAutoSize } from '@/components/textarea-autosize/textarea-autosize';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { useStompPublish } from '../stomp-client/hooks/use-stomp-publish';

interface ChatInputProps {
  chatId: string;
  className?: string;
}

export const ChatInput = ({ chatId, className }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const sendMessage =
    useStompPublish<Omit<MessageDto, 'id' | 'createdAt'>>('/send-message');

  const onClick = () => {
    sendMessage?.({
      chatId,
      senderId: 'user1',
      text: value,
    });
    setValue('');
  };

  return (
    <Stack
      direction="row"
      align="end"
      justify="between"
      gap={2}
      className={cn('rounded-10 bg-neutral-0 p-unit-3', className)}
    >
      <Stack
        direction="row"
        align="center"
        justify="between"
        className="w-full rounded-9 bg-neutral-100 px-unit-6 py-unit-5"
      >
        <TextareaAutoSize
          name="message"
          wrapperClassName="w-full"
          className="max-h-[128px] min-h-[16px] overflow-auto rounded-0 border-none bg-transparent !p-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Сообщение"
        />
        <button className="p-unit-2">
          <OlPaperclip size="20px" />
        </button>
      </Stack>
      <button
        className={cn('shrink-0 rounded-full bg-neutral-100 p-unit-6', {
          'bg-primary-700': value !== '',
        })}
        onClick={onClick}
        disabled={value === ''}
      >
        <OlArrowUp
          className={cn('text-neutral-600', { 'text-neutral-0': value !== '' })}
        />
      </button>
    </Stack>
  );
};

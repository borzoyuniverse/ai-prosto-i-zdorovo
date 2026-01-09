import { MessageDto } from '@/api/rpc-request/chat/use-get-messages-by-chatid';

export const getMarginValue = (
  currentMsg: MessageDto,
  nextMessage?: MessageDto,
): number => {
  const curSenderId = currentMsg.senderId;
  const nextSenderId = nextMessage?.senderId;

  if (!nextSenderId) {
    return 8;
  }

  return curSenderId === nextSenderId ? 4 : 8;
};

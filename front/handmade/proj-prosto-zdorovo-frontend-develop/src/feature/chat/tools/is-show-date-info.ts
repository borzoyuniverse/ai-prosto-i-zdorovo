import { MessageDto } from '@/api/rpc-request/chat/use-get-messages-by-chatid';
import { isSameDay } from 'date-fns';

export const isShowDateInfo = (
  currentMsg: MessageDto,
  nextMessage?: MessageDto,
): {
  isShowDate: boolean;
  date: Date;
} => {
  const curDate = new Date(currentMsg.createdAt);
  const nextDate = nextMessage ? new Date(nextMessage.createdAt) : null;

  const isShowDate = !nextDate || !isSameDay(curDate, nextDate);

  return {
    isShowDate,
    date: curDate,
  };
};

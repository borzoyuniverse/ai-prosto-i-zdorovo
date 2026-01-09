import { ChatWithCurator } from '@/app/pages/chat-with-curator/chat-with-curator';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat-with-curator/')({
  component: ChatWithCurator,
});

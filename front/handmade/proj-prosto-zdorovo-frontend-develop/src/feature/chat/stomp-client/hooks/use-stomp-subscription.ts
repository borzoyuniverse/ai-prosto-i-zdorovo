import { useEffect } from 'react';

import { useStompService } from '../use-stomp-service';

type UseStompSubscriptionOptions<T> = {
  topic: string;
  onMessage: (message: T) => void;
};

export function useStompSubscription<T>({
  topic,
  onMessage,
}: UseStompSubscriptionOptions<T>) {
  const stompService = useStompService();

  useEffect(() => {
    if (!stompService.getClient()) return;

    stompService.subscribe(topic, (msg) => {
      const clean = msg.body.replaceAll('\0', '');
      const body: T = JSON.parse(clean);
      onMessage(body);
    });

    return () => {
      stompService.unsubscribe(topic);
    };
  }, [stompService, topic, onMessage]);
}

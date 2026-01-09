import { useStompService } from '../use-stomp-service';

export const useStompPublish = <T extends object>(destination: string) => {
  const client = useStompService().getClient();

  if (!client) {
    return;
  }

  return (body: T) =>
    client.publish({
      destination,
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    });
};

import { useRouteContext } from '@tanstack/react-router';

export function useStompService() {
  const service = useRouteContext({
    strict: false,
    select: (context) => context.stompService,
  });

  if (!service) throw new Error('StompService must be provided in context');

  return service;
}

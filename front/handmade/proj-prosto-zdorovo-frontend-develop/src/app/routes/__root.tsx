import { stompService } from '@/feature/chat/stomp-client/stomp-service';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServiceUnavailableError,
} from '@/types/errors';
import { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  ErrorComponentProps,
  Outlet,
} from '@tanstack/react-router';

export type RootRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouterContext>()({
  // notFoundComponent() {
  //   return < />;
  // },
  errorComponent: CustomErrorComponent,
  component: Outlet,
  context() {
    return {
      stompService,
    };
  },
});

export function CustomErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof NotFoundError) {
    return <div />;
  } else if (error instanceof ConflictError) {
    return <div />;
  } else if (error instanceof ServiceUnavailableError) {
    return <div />;
  } else if (error instanceof BadRequestError) {
    return <div />;
  } else if (error instanceof ForbiddenError) {
    return <div />;
  } else {
    return <div />;
  }
}

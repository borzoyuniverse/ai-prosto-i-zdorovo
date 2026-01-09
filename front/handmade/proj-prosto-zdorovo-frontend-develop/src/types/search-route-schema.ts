import type { FileRoutesById } from '@/app/routeTree.gen';
import type { FileRoutesByPath } from '@tanstack/react-router';

export type SearchRouteSchema<T extends keyof FileRoutesByPath> =
  FileRoutesById[T]['types']['searchSchema'];

export type WithRepository<T, R> = T & { repository: R };

export type ValueOf<T> = T[keyof T];

export type WithSignal<T = unknown> = T & { signal: AbortSignal };

export type PaginationMeta = { pageNumber?: number; pageSize?: number };

export class RepositoryException extends Error {}

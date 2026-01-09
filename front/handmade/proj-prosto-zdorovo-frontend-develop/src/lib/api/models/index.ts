import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export type Pagination = {
  page: number;
  pageSize: number;
};

export type PrimitivesUnion = string | number | boolean | null | undefined;

export type ObjectParamsUnion =
  | Record<string, unknown>
  | Record<string, never>
  | undefined;

export type ArrayParamsUnion = unknown[] | never[];

export type BasicParamsUnion = ObjectParamsUnion | ArrayParamsUnion | PrimitivesUnion;

export type BaseRequest = {
  jsonrpc: '2.0';
  method: string;
  params?: ObjectParamsUnion;
  id?: string;
  skipCache?: boolean;
};

export type PaginatedBaseRequest = {
  jsonrpc: '2.0';
  method: string;
  params?: ObjectParamsUnion & { pagination: Pagination };
  id?: string;
  skipCache?: boolean;
};

export const RPCErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z
    .object({
      data: z
        .object({
          reason: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const RPCResponseSchema = z
  .union([
    z
      .object({
        jsonrpc: z.literal('2.0'),
        id: z.string().optional(),
        result: z.unknown(),
      })
      .strict(),
    z
      .object({
        jsonrpc: z.literal('2.0'),
        id: z.string().optional(),
        error: RPCErrorSchema,
      })
      .strict(),
  ])
  .refine(
    (data) => 'result' in data || 'error' in data,
    (data) => ({
      message: `Incorrect RPC response format was recieved: "${JSON.stringify(data)}"`,
    }),
  );

export type RPCError = z.infer<typeof RPCErrorSchema>;

export type BaseResponse<TData> = {
  jsonrpc: '2.0';
  id?: string;
} & ({ result: TData } | { error: RPCError });

export type BaseRPCQueryOptions<TData = unknown> = Parameters<typeof useQuery<TData>>[0];

export type UseRPCMutationHandlers<
  TData = unknown,
  TParams extends BasicParamsUnion = BasicParamsUnion,
  TContext = unknown,
> = {
  onMutate?: (variables: TParams) => Promise<TContext | undefined> | TContext | undefined;
  onSuccess?: (
    data: TData,
    variables: TParams,
    context: TContext,
  ) => Promise<unknown> | unknown;
  onError?: (
    error: Error,
    variables: TParams,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    variables: TParams,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown;
};

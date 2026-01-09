import { AxiosResponse } from 'axios';
import { SHA256 } from 'crypto-js';
import { z } from 'zod';

import { axiosInstance } from '../instance';
import {
  BaseRequest,
  BaseResponse,
  ObjectParamsUnion,
  PaginatedBaseRequest,
  Pagination,
  RPCError,
  RPCResponseSchema,
} from '../models';
import { RPCErrorResolver } from '../utils';

function isSuccessRPCResponse<TData>(
  response: z.infer<typeof RPCResponseSchema>,
): response is { jsonrpc: '2.0'; id?: string; result: TData } {
  return 'result' in response;
}

function isErrorRPCResponse(
  response: z.infer<typeof RPCResponseSchema>,
): response is { jsonrpc: '2.0'; id?: string; error: RPCError } {
  return 'error' in response;
}

type BasicJsonRPCRequestOptions = {
  method: string;
  params?: ObjectParamsUnion;
  skipCache?: boolean;
  userId?: string;
  signal?: AbortSignal;
};

export async function basicJsonRPCRequest<TData>({
  method,
  params,
  skipCache = true,
  userId,
  signal,
}: BasicJsonRPCRequestOptions) {
  return await axiosInstance
    .post<BaseResponse<TData>, AxiosResponse<BaseResponse<TData>>, BaseRequest>(
      `?method=${method}`,
      {
        jsonrpc: '2.0',
        method,
        params,
        id: SHA256(JSON.stringify([method, { ...params }, userId])).toString(),
        skipCache,
      },
      { signal },
    )
    .then(({ data }) => {
      const { success, data: response, error } = RPCResponseSchema.safeParse(data);

      if (!success) {
        throw {
          code: 500,
          message: error.format()._errors.join(','),
        } satisfies RPCError;
      }

      if (isSuccessRPCResponse<TData>(response)) {
        return response.result;
      } else if (isErrorRPCResponse(response)) {
        throw response.error;
      } else {
        throw {
          code: 500,
          message: `RPC result is missing for method: "${method}"`,
        } satisfies RPCError;
      }
    })
    .catch(RPCErrorResolver);
}

type BasicPaginatedJsonRPCRequestOptions = {
  method: string;
  params: ObjectParamsUnion;
  pagination: Pagination;
  skipCache?: boolean;
  userId?: string;
  signal?: AbortSignal;
};

export async function basicPaginatedJsonRPCRequest<TData>({
  method,
  params,
  pagination,
  skipCache = true,
  userId,
  signal,
}: BasicPaginatedJsonRPCRequestOptions) {
  return await axiosInstance
    .post<BaseResponse<TData>, AxiosResponse<BaseResponse<TData>>, PaginatedBaseRequest>(
      `?method=${method}`,
      {
        jsonrpc: '2.0',
        method,
        params: {
          ...params,
          pagination,
        },
        id: SHA256(JSON.stringify([method, { ...params }, userId])).toString(),
        skipCache,
      },
      { signal },
    )
    .then(({ data }) => {
      const { success, data: response, error } = RPCResponseSchema.safeParse(data);

      if (!success) {
        throw {
          code: 500,
          message: error.format()._errors.join(','),
        } satisfies RPCError;
      }

      if (isSuccessRPCResponse<TData>(response)) {
        return response.result;
      } else if (isErrorRPCResponse(response)) {
        throw response.error;
      } else {
        throw {
          code: 500,
          message: `RPC result is missing for method: "${method}"`,
        } satisfies RPCError;
      }
    })
    .catch(RPCErrorResolver);
}

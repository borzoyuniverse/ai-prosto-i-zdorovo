import { http, HttpResponse, JsonBodyType, RequestHandler } from 'msw';

import { BaseRequest, PaginatedBaseRequest } from '@/lib/api/models';

import { rpcData } from '../db/rpc-data';

type RpcPagination = {
  page: number;
  size: number;
};

type PaginatedMock = {
  pagination: Record<number, JsonBodyType>;
};

export const rpcEndpoint: RequestHandler[] = [
  http.post<Record<string, never>, PaginatedBaseRequest | BaseRequest>(
    '/api/webhook/json-rpc/',
    async ({ request }) => {
      const body = (await request.json()) as BaseRequest & {
        params?: { pagination?: RpcPagination };
      };

      const methodMock = rpcData[body.method];

      if (!methodMock) {
        return HttpResponse.json({ error: 'Method not found' }, { status: 404 });
      }

      // Проверяем, есть ли запрос на пагинацию
      const paginationParams = body.params?.pagination;
      if (
        paginationParams &&
        typeof methodMock === 'object' &&
        'pagination' in methodMock &&
        typeof methodMock.pagination === 'object'
      ) {
        const { page = 1, size = 10 } = paginationParams;

        const paginatedMock = methodMock as PaginatedMock;
        const pageData = paginatedMock.pagination[page] ?? { messages: [], page, size };

        return HttpResponse.json(pageData);
      }

      // Обычный запрос без пагинации
      return HttpResponse.json(methodMock);
    },
  ),
];

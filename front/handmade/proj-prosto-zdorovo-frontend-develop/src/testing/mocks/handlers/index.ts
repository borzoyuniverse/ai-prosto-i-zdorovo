import { RequestHandler } from 'msw';

import { rpcEndpoint } from './rpc-endpoint';

export const handlers: RequestHandler[] = [...rpcEndpoint];

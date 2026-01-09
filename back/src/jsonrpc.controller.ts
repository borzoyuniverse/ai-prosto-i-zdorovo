import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { JsonRpcService } from './jsonrpc.service';

type RpcRequest = {
  jsonrpc?: string;
  method?: string;
  params?: Record<string, unknown>;
  id?: string;
};

@Controller('api/webhook/json-rpc')
export class JsonRpcController {
  constructor(private readonly jsonRpcService: JsonRpcService) {}

  @Post()
  @HttpCode(200)
  handle(@Query('method') methodQuery: string | undefined, @Body() body: RpcRequest) {
    const method = body?.method ?? methodQuery;
    const id = body?.id;

    if (!method) {
      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32600, message: 'Method is required' },
      };
    }

    try {
      const result = this.jsonRpcService.handle(method, body?.params);
      return { jsonrpc: '2.0', id, result };
    } catch (err: any) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: typeof err?.code === 'number' ? err.code : 500,
          message: typeof err?.message === 'string' ? err.message : 'Internal error',
        },
      };
    }
  }
}

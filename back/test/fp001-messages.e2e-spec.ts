import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Messages', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('responds to get-messages', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-messages')
      .send({
        jsonrpc: '2.0',
        method: 'get-messages',
        params: { chatId: 'chat-1' },
        id: 'req-10',
      })
      .expect(200);
  });
});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Chats', () => {
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

  it('responds to get-chats', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-chats')
      .send({
        jsonrpc: '2.0',
        method: 'get-chats',
        params: { userId: 'user-1' },
        id: 'req-8',
      })
      .expect(200);
  });
});

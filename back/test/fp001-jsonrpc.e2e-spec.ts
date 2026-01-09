import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 JsonRPC', () => {
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

  it('responds to get-appointments', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-appointments')
      .send({
        jsonrpc: '2.0',
        method: 'get-appointments',
        params: { userId: 'user-1' },
        id: 'req-1',
      })
      .expect(200);
  });

  it('returns error when method is missing', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/')
      .send({
        jsonrpc: '2.0',
        params: {},
        id: 'req-1a',
      })
      .expect(200);
  });

  it('returns error for unknown method', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=unknown-method')
      .send({
        jsonrpc: '2.0',
        method: 'unknown-method',
        params: {},
        id: 'req-1b',
      })
      .expect(200);
  });
});

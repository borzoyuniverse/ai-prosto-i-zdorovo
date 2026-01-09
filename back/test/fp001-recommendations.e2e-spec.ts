import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Recommendations', () => {
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

  it('responds to get-recommendations', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-recommendations')
      .send({
        jsonrpc: '2.0',
        method: 'get-recommendations',
        params: { specialistTypes: ['MASTER_COACH'] },
        id: 'req-6',
      })
      .expect(200);
  });
});

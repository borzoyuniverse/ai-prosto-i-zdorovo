import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Recommendations Specialist', () => {
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

  it('responds to recommendations-specialist', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=recommendations-specialist')
      .send({
        jsonrpc: '2.0',
        method: 'recommendations-specialist',
        params: { userId: 'user-1' },
        id: 'req-9',
      })
      .expect(200);
  });
});

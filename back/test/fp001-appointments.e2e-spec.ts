import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Appointments', () => {
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

  it('responds to get-appointment-types', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-appointment-types')
      .send({
        jsonrpc: '2.0',
        method: 'get-appointment-types',
        params: {},
        id: 'req-2',
      })
      .expect(200);
  });
});

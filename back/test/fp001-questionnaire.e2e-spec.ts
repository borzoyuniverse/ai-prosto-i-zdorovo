import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('FP001 Questionnaire', () => {
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

  it('responds to search-form', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=search-form')
      .send({
        jsonrpc: '2.0',
        method: 'search-form',
        params: { includeFilled: false },
        id: 'req-3',
      })
      .expect(200);
  });

  it('responds to get-form-template', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-form-template')
      .send({
        jsonrpc: '2.0',
        method: 'get-form-template',
        params: { id: 'form-1' },
        id: 'req-4',
      })
      .expect(200);
  });

  it('responds to form-submission', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=form-submission')
      .send({
        jsonrpc: '2.0',
        method: 'form-submission',
        params: { formId: 'form-1', answers: { q1: 'a' } },
        id: 'req-5',
      })
      .expect(200);
  });
});

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

  it('responds to specialist-available', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=specialist-available')
      .send({
        jsonrpc: '2.0',
        method: 'specialist-available',
        params: { consultationTypeId: 'type-1' },
        id: 'req-2a',
      })
      .expect(200);
  });

  it('responds to get-goals', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=get-goals')
      .send({
        jsonrpc: '2.0',
        method: 'get-goals',
        params: { consultationTypeId: 'type-1' },
        id: 'req-2b',
      })
      .expect(200);
  });

  it('responds to free-slots', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=free-slots')
      .send({
        jsonrpc: '2.0',
        method: 'free-slots',
        params: { consultationTypeId: 'type-1', date: '2026-01-01' },
        id: 'req-2c',
      })
      .expect(200);
  });

  it('responds to create-appointment', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=create-appointment')
      .send({
        jsonrpc: '2.0',
        method: 'create-appointment',
        params: {
          consultationTypeId: 'type-1',
          goalId: 'goal-1',
          slotId: 'slot-1',
        },
        id: 'req-2d',
      })
      .expect(200);
  });

  it('responds to confirm-appointment', async () => {
    await request(app.getHttpServer())
      .post('/api/webhook/json-rpc/?method=confirm-appointment')
      .send({
        jsonrpc: '2.0',
        method: 'confirm-appointment',
        params: { appointmentId: 'appt-1' },
        id: 'req-2e',
      })
      .expect(200);
  });
});

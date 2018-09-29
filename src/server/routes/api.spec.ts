import express from 'express';
import request from 'supertest';

import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  MessageType,
} from '../../types/message';

import api from './api';

describe('/api', () => {
  const app: express.Application = express();
  app.use(express.json());
  app.use(api);

  describe('/blink', () => {

    describe('input validation', () => {
      it('should fail gracefully with no message', (done) => {
        const data: any = null;
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });

      it('should fail gracefully with no message type', (done) => {
        const data: any = {};
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });

      it('should fail gracefully with invalid message type', (done) => {
        const data: any = {type: 'bad type'};
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });

      it('should fail gracefully with missing message args', (done) => {
        const data: any = {type: MessageType.BlinkSetColor, color: null};
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });

      it('should fail gracefully with invalid message args', (done) => {
        const data: any = {
          type: MessageType.BlinkSetColor,
          color: '#12345z',
        };
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });
    });

    it('should succeed with BlinkOff message', (done) => {
      const data: BlinkOffMessage = {
        type: MessageType.BlinkOff,
      };
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });

    it('should succeed with BlinkSetColor message', (done) => {
      const data: BlinkSetColorMessage = {
        type: MessageType.BlinkSetColor,
        color: '#aaff00',
      };
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });
  });
});

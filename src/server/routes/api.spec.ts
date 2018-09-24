import express from 'express';
import request from 'supertest';

import {
  BlinkSetColorMessage,
  Message,
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
          color: { r: 100, g: 200, b: -1 },
        };
        request(app).post('/blink').send(data)
          .expect(400)
          .end(done);
      });
    });

    it('should succeed with BlinkOff message', (done) => {
      const data: Message = {
        type: MessageType.BlinkOff,
      };
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });

    it('should succeed with BlinkSetColor message', (done) => {
      const data: BlinkSetColorMessage = {
        type: MessageType.BlinkSetColor,
        color: { r: 0, g: 100, b: 200 },
      };
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });
  });
});

import { strict as assert } from 'assert';
import express from 'express';
import sinon from 'sinon';
import request from 'supertest';

import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  MessageType,
} from '../../types/message';

import Factory from '../../util/factory';
import MessageSender from '../../util/message-sender';
import api from './api';

describe('/api', () => {
  let mockFactory: sinon.SinonMock;
  let mockMessageSender: sinon.SinonStubbedInstance<MessageSender>;

  let app: express.Application;

  before(() => {
    mockFactory = sinon.mock(Factory);
    mockMessageSender = sinon.createStubInstance(MessageSender);
    mockFactory.expects('createMessageSender').once().returns(mockMessageSender);

    app = express();
    app.use(express.json());
    app.use(api);
  });

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
      const data = new BlinkOffMessage();
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });

    it('should succeed with BlinkSetColor message', (done) => {
      const data = new BlinkSetColorMessage('#ee8800');
      request(app).post('/blink').send(data)
        .expect(200)
        .end(done);
    });
  });

  describe('MessageSender integration', () => {

    it('creates message sender once', (done) => {
      const data = new BlinkOffMessage();
      request(app).post('/blink').send(data).end(() => {
        request(app).post('/blink').send(data).end(done);
      });
    });

    it('sends the message', (done) => {
      mockMessageSender.trigger.resetHistory();

      const data = new BlinkOffMessage();
      request(app).post('/blink')
        .send(data)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert.strictEqual(mockMessageSender.trigger.callCount, 1);
          done();
        });
    });
  });

});

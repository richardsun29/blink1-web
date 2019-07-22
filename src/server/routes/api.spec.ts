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
import sleep from '../../util/sleep';
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

  afterEach(() => {
    mockMessageSender.trigger.resetHistory();
    mockMessageSender.isSubscriberConnected.resetHistory();
  });

  describe('MessageSender integration', () => {

    it('creates message sender once', async () => {
      const data = new BlinkOffMessage();
      await request(app).post('/blink').send(data).expect(200);
      await request(app).post('/blink').send(data).expect(200);
    });

    it('sends the message', async () => {
      const data = new BlinkOffMessage();
      await request(app).post('/blink').send(data).expect(200);
      assert.strictEqual(mockMessageSender.trigger.callCount, 1);
    });
  });

  describe('/blink', () => {

    describe('input validation', () => {
      it('should fail gracefully with no message', async () => {
        const data: any = null;
        await request(app).post('/blink').send(data).expect(400);
      });

      it('should fail gracefully with no message type', async () => {
        const data: any = {};
        await request(app).post('/blink').send(data).expect(400);
      });

      it('should fail gracefully with invalid message type', async () => {
        const data: any = {type: 'bad type'};
        await request(app).post('/blink').send(data).expect(400);
      });

      it('should fail gracefully with missing message args', async () => {
        const data: any = {type: MessageType.BlinkSetColor, color: null};
        await request(app).post('/blink').send(data).expect(400);
      });

      it('should fail gracefully with invalid message args', async () => {
        const data: any = {
          type: MessageType.BlinkSetColor,
          color: '#12345z',
        };
        await request(app).post('/blink').send(data).expect(400);
      });
    });

    it('should succeed with BlinkOff message', async () => {
      const data = new BlinkOffMessage();
      await request(app).post('/blink').send(data).expect(200);
    });

    it('should succeed with BlinkSetColor message', async () => {
      const data = new BlinkSetColorMessage('#ee8800');
      await request(app).post('/blink').send(data).expect(200);
    });
  });

  describe('/status', () => {
    it('should respond with the connection status - true', async () => {
      mockMessageSender.isSubscriberConnected.returns(true);
      const res = await request(app).get('/status').expect(200);
      assert.strictEqual(res.body.isConnected, true);
      assert.strictEqual(mockMessageSender.isSubscriberConnected.callCount, 1);
    });

    it('should respond with the connection status - false', async () => {
      mockMessageSender.isSubscriberConnected.returns(false);
      const res = await request(app).get('/status').expect(200);
      assert.strictEqual(res.body.isConnected, false);
      assert.strictEqual(mockMessageSender.isSubscriberConnected.callCount, 1);
    });

    /* don't run slow test
    it('should gracefully handle timeout', async () => {
      mockMessageSender.isSubscriberConnected.callsFake(() => sleep(3000, true));
      const res = await request(app).get('/status').expect(200);
      assert.strictEqual(res.body.isConnected, false);
      assert.strictEqual(mockMessageSender.isSubscriberConnected.callCount, 1);
    }).timeout(5000);
    */
  });

});

import { strict as assert } from 'assert';
import sinon from 'sinon';

import PusherServer from 'pusher';

import Config from './config';
import Factory from './factory';
import MessageSender from './message-sender';

describe('MessageSender', () => {
  let mockFactory: sinon.SinonMock;
  let mockPusherServer: sinon.SinonStubbedInstance<PusherServer>;

  const testChannel: string = 'test channel';

  beforeEach(() => {
    sinon.replaceGetter(Config, 'PUSHER_BLINK_CHANNEL', () => testChannel);

    mockFactory = sinon.mock(Factory);
    mockPusherServer = sinon.createStubInstance<PusherServer>(PusherServer);

    mockFactory.expects('createPusherServer').once().returns(mockPusherServer);
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should trigger an event', () => {
    const eventName: string = 'test-event';
    const data: object = { test: 'some data' };

    const messageSender: MessageSender = new MessageSender();
    messageSender.trigger(eventName, data);

    assert(mockPusherServer.trigger.calledWith(testChannel, eventName, data));
  });

  describe('#subscriberConnected', () => {
    it('should pass connection state to callback', (done) => {
      const err = undefined;
      const req = {};
      const res = {
        statusCode: 200,
        body: JSON.stringify({ occupied: true }),
      };

      mockPusherServer.get.callsFake((config, callback) => {
        assert.strictEqual(config.path, `/channels/${testChannel}`);
        callback(err, req, res);
      });

      const messageSender: MessageSender = new MessageSender();
      messageSender.subscriberConnected((isConnected) => {
        assert.strictEqual(isConnected, true);
        assert.strictEqual(mockPusherServer.get.callCount, 1);
        done();
      });
    });

    it('should handle generic errors', (done) => {
      const err = new Error();
      const req = undefined;
      const res = undefined;

      mockPusherServer.get.callsFake((config, callback) => {
        assert.strictEqual(config.path, `/channels/${testChannel}`);
        callback(err, req, res);
      });

      const messageSender: MessageSender = new MessageSender();
      messageSender.subscriberConnected((isConnected) => {
        assert.strictEqual(isConnected, false);
        assert.strictEqual(mockPusherServer.get.callCount, 1);
        done();
      });
    });

    it('should handle HTTP errors', (done) => {
      const err = new Error();
      const req = {};
      const res = { statusCode: 500 };

      mockPusherServer.get.callsFake((config, callback) => {
        assert.strictEqual(config.path, `/channels/${testChannel}`);
        callback(err, req, res);
      });

      const messageSender: MessageSender = new MessageSender();
      messageSender.subscriberConnected((isConnected) => {
        assert.strictEqual(isConnected, false);
        assert.strictEqual(mockPusherServer.get.callCount, 1);
        done();
      });
    });

  });
});

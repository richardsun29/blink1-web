import assert from 'assert';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import PusherServer from 'pusher';

import Factory from '../util/factory';
import MessageSender from './message-sender';

describe('MessageSender', function() {
  let mockFactory: sinon.SinonMock;
  let mockPusherServer: sinon.SinonStubbedInstance<PusherServer>;

  beforeEach(function() {
    mockFactory = sinon.mock(Factory);
    mockPusherServer = sinon.createStubInstance<PusherServer>(PusherServer);

    mockFactory.expects('createPusherServer').once().returns(mockPusherServer);
  });

  afterEach(function() {
    sinon.verifyAndRestore();
  });

  it('should trigger an event', function() {
    const eventName: string = 'test-event';
    const data: object = { test: 'some data' };

    let messageSender: MessageSender = new MessageSender();
    messageSender.trigger(eventName, data);

    assert(mockPusherServer.trigger.calledWith(sinon.match.any, eventName, data));
  });
});

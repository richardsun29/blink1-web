import assert from 'assert';
import sinon from 'sinon';

import PusherClient from 'pusher-js';

import Factory from '../util/factory';
import MessageReceiver from './message-receiver';

describe('MessageReceiver', function() {
  let mockFactory: sinon.SinonMock;
  let mockPusherClient: sinon.SinonStubbedInstance<Pusher.Pusher>;
  let mockChannel: Pusher.Channel;

  beforeEach(function() {
    mockFactory = sinon.mock(Factory);
    mockPusherClient = sinon.createStubInstance<Pusher.Pusher>(PusherClient);
    mockChannel = {} as Pusher.Channel;
    mockPusherClient.connection = {} as Pusher.ConnectionManager;

    mockFactory.expects('createPusherClient').once().returns(mockPusherClient);
    mockPusherClient.subscribe.onFirstCall().returns(mockChannel);
    mockChannel.bind = sinon.spy();
    mockPusherClient.connection.bind = sinon.spy();
  });

  afterEach(function() {
    sinon.verifyAndRestore();
  });

  it('should handle connection errors', function() {
    let messageReceiver: MessageReceiver = new MessageReceiver();

    let connectionBindSpy: sinon.SinonSpy = mockPusherClient.connection.bind as sinon.SinonSpy;
    assert(connectionBindSpy.calledOnceWith('error', sinon.match.any));
  });

  it('should bind to a channel event', function() {
    const eventName: string = 'test-event';
    const callback: Pusher.EventCallback = sinon.stub();

    let messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.bind(eventName, callback);

    let channelBindSpy: sinon.SinonSpy = mockChannel.bind as sinon.SinonSpy;
    assert(channelBindSpy.calledOnceWith(eventName, callback));
  });

  it('should disconnect', function() {
    let messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.disconnect();
    assert(mockPusherClient.disconnect.calledOnce);
  });
});

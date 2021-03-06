import { strict as assert } from 'assert';
import sinon from 'sinon';

import PusherClient from 'pusher-js';

import Config from './config';
import Factory from './factory';
import MessageReceiver from './message-receiver';

describe('MessageReceiver', () => {
  let mockFactory: sinon.SinonMock;
  let mockPusherClient: sinon.SinonStubbedInstance<Pusher.Pusher>;
  let mockChannel: Pusher.Channel;

  const testChannel: string = 'test channel';

  beforeEach(() => {
    sinon.replaceGetter(Config, 'PUSHER_BLINK_CHANNEL', () => testChannel);

    mockFactory = sinon.mock(Factory);
    mockPusherClient = sinon.createStubInstance<Pusher.Pusher>(PusherClient);
    mockChannel = {} as Pusher.Channel;
    mockPusherClient.connection = {} as Pusher.ConnectionManager;

    mockFactory.expects('createPusherClient').once().returns(mockPusherClient);
    mockPusherClient.subscribe.onFirstCall().returns(mockChannel);
    mockChannel.bind = sinon.spy();
    mockPusherClient.connection.bind = sinon.spy();
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should get channel name from config', () => {
    const messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.disconnect();

    assert(mockPusherClient.subscribe.calledOnceWithExactly(testChannel));
  });

  it('should handle connection errors', () => {
    const messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.disconnect();

    const connectionBindSpy: sinon.SinonSpy = mockPusherClient.connection.bind as sinon.SinonSpy;
    assert(connectionBindSpy.calledOnceWith('error', sinon.match.any));
  });

  it('should bind to a channel event', () => {
    const eventName: string = 'test-event';
    const callback: Pusher.EventCallback = sinon.stub();

    const messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.bind(eventName, callback);

    const channelBindSpy: sinon.SinonSpy = mockChannel.bind as sinon.SinonSpy;
    assert(channelBindSpy.calledOnceWith(eventName, callback));
  });

  it('should disconnect', () => {
    const messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.disconnect();
    assert(mockPusherClient.disconnect.calledOnce);
  });
});

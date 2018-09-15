import assert from 'assert';
import sinon = require('sinon');

import Pusher = require('pusher-js');

import Factory from '../util/factory';
import MessageReceiver from './message-receiver';

describe('MessageReceiver', function() {
  const mockFactory: sinon.SinonMock = sinon.mock(Factory);
  const mockPusherClient: sinon.SinonStubbedInstance<Pusher.Pusher> =
                          sinon.createStubInstance<Pusher.Pusher>(Pusher);
  const mockChannel: { bind: sinon.SinonSpy } = {
    bind: sinon.spy()
  };

  afterEach(function() {
    sinon.restore();
  });

  it('should bind to a channel', function() {
    mockFactory.expects('createPusherClient').once().returns(mockPusherClient);
    mockPusherClient.subscribe.onFirstCall().returns(mockChannel);

    const eventName: string = 'test-event';
    const callback: Pusher.EventCallback = sinon.stub();

    var messageReceiver: MessageReceiver = new MessageReceiver();
    messageReceiver.bind(eventName, callback);

    assert(mockChannel.bind.calledOnceWith(eventName, callback));
  });
});

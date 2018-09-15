'use strict';

const assert = require('assert');
const sinon = require('sinon');

const PusherClient = require('pusher-js');
const Factory = require('../util/factory');

const MessageReceiver = require('./message-receiver');

describe('MessageReceiver', function() {
  const mockFactory = sinon.mock(Factory);
  const mockPusherClient = sinon.createStubInstance(PusherClient);
  const mockChannel = {
    bind: sinon.spy()
  };

  afterEach(function() {
    sinon.restore();
  });

  it('should bind to a channel', function() {
    mockFactory.expects('createPusherClient').once().returns(mockPusherClient);
    mockPusherClient.subscribe.onFirstCall().returns(mockChannel);

    const event = 'test-event';
    const callback = sinon.stub();

    var messageReceiver = new MessageReceiver();
    messageReceiver.bind(event, callback);

    assert(mockChannel.bind.calledOnceWith(event, callback));
  });
});

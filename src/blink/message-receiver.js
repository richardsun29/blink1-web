'use strict';

const Factory = require('../util/factory');

class MessageReceiver {
  constructor() {
    this.pusher = Factory.createPusherClient();
  }

  bind(event, callback) {
    const channel = this.pusher.subscribe('my-channel');
    channel.bind(event, callback);
  }
}

module.exports = MessageReceiver;

'use strict';

require('dotenv').config();
const PusherClient = require('pusher-js');

const Factory = {
  createPusherClient() {
    return new PusherClient(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
      forceTLS: true,
    });
  }
};

module.exports = Factory;

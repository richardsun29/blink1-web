import pusher = require('pusher-js');

import { PUSHER_KEY, PUSHER_CLUSTER } from '../util/config';

export default class Factory {
  static createPusherClient(): Pusher.Pusher {
    return new pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true,
    });
  }
};

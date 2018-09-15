import Pusher = require('pusher-js');

import { PUSHER_KEY, PUSHER_CLUSTER } from '../util/config';

const Factory = {
  createPusherClient(): Pusher.Pusher {
    return new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true,
    });
  }
};

export default Factory;

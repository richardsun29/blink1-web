import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

import Config from '../util/config';

export default class Factory {
  public static createPusherClient(): Pusher.Pusher {
    return new PusherClient(Config.PUSHER_KEY, {
      cluster: Config.PUSHER_CLUSTER,
      encrypted: true,
    });
  }

  public static createPusherServer(): PusherServer {
    return new PusherServer({
      appId: Config.PUSHER_APPID,
      key: Config.PUSHER_KEY,
      secret: Config.PUSHER_SECRET,
      encrypted: true,
      cluster: Config.PUSHER_CLUSTER,
    });
  }
}

import Blink1 from 'node-blink1';
import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

import Config from './config';
import MessageReceiver from './message-receiver';
import MessageSender from './message-sender';

/* tslint:disable:member-ordering */
export default class Factory {
  public static createPusherClient(): Pusher.Pusher {
    return new PusherClient(Config.PUSHER_KEY, {
      cluster: Config.PUSHER_CLUSTER,
      encrypted: true,
      // activityTimeout: 60 * 1000,
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

  public static createBlink1(): Blink1 {
    return new Blink1();
  }

  public static createMessageReceiver(): MessageReceiver {
    return new MessageReceiver();
  }

  public static createMessageSender(): MessageSender {
    return new MessageSender();
  }
}

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

  public static getMessageReceiver(): MessageReceiver {
    if (!this.messageReceiverInstance) {
      this.messageReceiverInstance = new MessageReceiver();
    }
    return this.messageReceiverInstance;
  }
  private static messageReceiverInstance: MessageReceiver;

  public static getMessageSender(): MessageSender {
    if (!this.messageSenderInstance) {
      this.messageSenderInstance = new MessageSender();
    }
    return this.messageSenderInstance;
  }
  private static messageSenderInstance: MessageSender;
}

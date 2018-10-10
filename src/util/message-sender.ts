import PusherServer from 'pusher';

import Config from './config';
import Factory from './factory';

export default class MessageSender {
  private pusherServer: PusherServer;

  constructor() {
    this.pusherServer = Factory.createPusherServer();
  }

  public trigger(eventName: string, data: any): void {
    this.pusherServer.trigger(Config.PUSHER_BLINK_CHANNEL, eventName, data);
  }
}

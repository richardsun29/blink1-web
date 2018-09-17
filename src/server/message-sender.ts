import PusherServer from 'pusher';

import Factory from '../util/factory';

export default class MessageSender {
  private pusherServer: PusherServer;

  constructor() {
    this.pusherServer = Factory.createPusherServer();
  }

  public trigger(eventName: string, data: any): void {
    this.pusherServer.trigger('my-channel', eventName, data);
  }
}

import Factory from '../util/factory';
import PusherServer from 'pusher';

export default class MessageSender {
  private pusherServer: PusherServer;

  constructor() {
    this.pusherServer = Factory.createPusherServer();
  }

  trigger(eventName: string, data: any): void {
    this.pusherServer.trigger('my-channel', eventName, data);
  }
}

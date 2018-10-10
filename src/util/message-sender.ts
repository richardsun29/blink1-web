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

  public subscriberConnected(callback: (isConnected: boolean) => void): void {
    this.pusherServer.get({
      path: `/channels/${Config.PUSHER_BLINK_CHANNEL}`,
      params: {},
    }, (err, req, res) => {
      if (err) {
        callback(false);
        return;
      }
      if (res.statusCode === 200) {
        const result = JSON.parse(res.body);
        callback(result.occupied);
      } else {
        console.error(err);
        callback(false);
      }
    });
  }
}

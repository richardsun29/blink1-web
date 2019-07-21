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

  public isSubscriberConnected(): Promise<boolean> {
    return new Promise((resolve) => {
      this.pusherServer.get({
        path: `/channels/${Config.PUSHER_BLINK_CHANNEL}`,
        params: {},
      }, (err, req, res) => {
        if (err) {
          resolve(false);
        } else {
          if (res.statusCode === 200) {
            const result = JSON.parse(res.body);
            resolve(result.occupied);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

}

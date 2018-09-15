import Factory from '../util/factory';

export default class MessageReceiver {
  private pusher: Pusher.Pusher;

  constructor() {
    this.pusher = Factory.createPusherClient();
  }

  public bind(eventName: string, callback: Pusher.EventCallback): void {
    const channel: Pusher.Channel = this.pusher.subscribe('my-channel');
    channel.bind(eventName, callback);
  }
}

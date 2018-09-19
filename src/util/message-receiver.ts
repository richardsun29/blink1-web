import Factory from './factory';

export default class MessageReceiver {
  private pusher: Pusher.Pusher;
  private channel: Pusher.Channel;

  constructor() {
    this.pusher = Factory.createPusherClient();
    this.channel = this.pusher.subscribe('my-channel');

    this.pusher.connection.bind('error', (err) => {
      console.error('Pusher: connection error', err);
    });
  }

  public bind(eventName: string, callback: Pusher.EventCallback): void {
    this.channel.bind(eventName, callback);
  }

  public disconnect(): void {
    this.pusher.disconnect();
  }
}

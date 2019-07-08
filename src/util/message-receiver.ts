import Config from './config';
import Factory from './factory';

export default class MessageReceiver {
  private pusher: Pusher.Pusher;
  private channel: Pusher.Channel;

  private eventBindings: Array<{ eventName: string, callback: Pusher.EventCallback }> = [];
  private reconnectTimer: NodeJS.Timer | null = null;

  constructor() {
    // @ts-ignore
    this.pusher = null;
    // @ts-ignore
    this.channel = null;

    this.connect();
  }

  public bind(eventName: string, callback: Pusher.EventCallback): void {
    this.eventBindings.push({ eventName, callback });
    this.channel.bind(eventName, callback);
  }

  public disconnect(): void {
    this.pusher.disconnect();
  }

  private connect(): void {
    this.pusher = Factory.createPusherClient();
    this.channel = this.pusher.subscribe(Config.PUSHER_BLINK_CHANNEL);

    this.pusher.connection.bind('error', (err) => {
      console.error('Pusher: connection error', err);
    });

    // try to reconnect if network goes down
    this.pusher.connection.bind('unavailable', () => this.reconnect());

    this.pusher.connection.bind('connected', () => {
      console.log('Pusher: connected');

      if (this.reconnectTimer) {
        clearInterval(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });
  }

  private reconnect(): void {
      console.warn('Pusher: unavailable, reconnecting');

      if (this.reconnectTimer) {
        // already reconnecting
        return;
      }

      this.reconnectTimer = setInterval(() => {
        //this.disconnect();
        //this.connect();
      }, 60 * 1000);
  }
}

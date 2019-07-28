import Factory from '../util/factory';
import MessageReceiver from '../util/message-receiver';
import Blink from './blink';

class BlinkApp {
  private messageReceiver: MessageReceiver;
  private blink: Blink;

  constructor() {
    this.messageReceiver = Factory.createMessageReceiver();
    this.blink = new Blink();
  }

  public run(): void {
    this.messageReceiver.bind('blink', this.blink.processMessage.bind(this.blink));
  }
}

const app = new BlinkApp();
app.run();

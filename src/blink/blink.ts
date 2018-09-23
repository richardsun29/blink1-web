import Color from 'color';

import Blink1 from 'node-blink1';
import {
  BlinkSetColorMessage,
  Message,
  MessageType,
 } from '../types/message';

export default class Blink {
  // @ts-ignore
  private blink1: Blink1;

  constructor() {
    try {
      this.blink1 = new Blink1();
    } catch (e) {
      console.error(e);
    }
  }

  public processMessage(message: Message): void {
    switch (message.type) {
      case MessageType.BlinkOff:
        this.off();
        break;
      case MessageType.BlinkSetColor:
        this.setColor((message as BlinkSetColorMessage).color);
    }
  }

  private off(): void {
    this.run(() => {
      this.blink1.off();
    });
  }

  private setColor(color: Color): void {
    this.run(() => {
      this.blink1.fadeToRGB(500, color.red(), color.green(), color.blue());
    });
  }

  // try to reconnect to device if fails
  private run(callback: () => void): void {
    try {
      callback();
    } catch (e) {
      try {
        this.blink1 = new Blink1();
        callback();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

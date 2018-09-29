import tinycolor from 'tinycolor2';

import Blink1 from 'node-blink1';
import {
  BlinkSetColorMessage,
  Message,
  MessageType,
 } from '../types/message';
 import Factory from '../util/factory';

export default class Blink {
  // @ts-ignore
  private blink1: Blink1;

  constructor() {
    try {
      this.blink1 = Factory.createBlink1();
    } catch (e) {
      console.error(e.message);
    }
  }

  public processMessage(message: Message): void {
    switch (message.type) {
      case MessageType.BlinkOff:
        this.off();
        break;
      case MessageType.BlinkSetColor:
        this.setColor((message as BlinkSetColorMessage).color);
        break;
    }
  }

  private off(): void {
    this.run(() => {
      this.blink1.off();
    });
  }

  private setColor(color: string): void {
    const rgb: tinycolor.ColorFormats.RGB = tinycolor(color).toRgb();
    this.run(() => {
      this.blink1.fadeToRGB(500, rgb.r, rgb.g, rgb.b);
    });
  }

  // try to reconnect to device if fails
  private run(callback: () => void): void {
    try {
      callback();
    } catch (e) {
      try {
        this.blink1 = Factory.createBlink1();
        callback();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

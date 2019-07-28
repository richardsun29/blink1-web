import _ from 'lodash';
import tinycolor from 'tinycolor2';

import Blink1 from 'node-blink1';
import {
  BlinkSetColorMessage,
  Message,
  MessageType,
} from '../types/message';
import Config from '../util/config';
import Factory from '../util/factory';

type StatusCallback = () => void;

export default class Blink {

  // @ts-ignore
  private blink1: Blink1;

  private onSucess?: StatusCallback;
  private onError?: StatusCallback;

  constructor(onSuccess?: StatusCallback, onError?: StatusCallback) {
    this.onSucess = onSuccess;
    this.onError = onError;
    try {
      this.blink1 = Factory.createBlink1();
    } catch (e) {
      console.error(e.message);
    }
  }

  // turn off blink if no commands are sent
  private handleTimeout = _.debounce(() => {
    try {
      this.blink1.off();
    } catch (e) {}
  }, Config.BLINK_TIMEOUT * 1000);

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

  public close(): void {
    this.handleTimeout.cancel();
    try {
      this.blink1.close();
    } catch (e) {}
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

  private run(callback: () => void): void {
    let succeeded: boolean = false;
    try {
      callback();
      succeeded = true;
    } catch (e) {
      // try to reconnect to device if fails
      try {
        this.blink1 = Factory.createBlink1();
        callback();
        succeeded = true;
      } catch (err) {
        // give up
        console.error(err.message);
        succeeded = false;
      }
    }

    // report results
    if (succeeded) {
      if (this.onSucess) {
        this.onSucess();
      }
    } else {
      if (this.onError) {
        this.onError();
      }
    }

    this.handleTimeout();
  }
}

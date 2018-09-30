import tinycolor from 'tinycolor2';

import {
  BlinkOffMessage,
  BlinkSetColorMessage,
} from '../../types/message';

export default class ApiService {
  private static urls: { [key: string]: string } = {
    blink: '/api/blink',
  };

  constructor() {

  }

  public static blinkSetColor(color: tinycolor.Instance): void {
    const message = new BlinkSetColorMessage(color.toHexString());
    $.post(this.urls.blink, JSON.stringify(message));
  }

  public static blinkOff(): void {
    const message = new BlinkOffMessage();
    $.post(this.urls.blink, JSON.stringify(message));
  }
}

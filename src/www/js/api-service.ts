import tinycolor from 'tinycolor2';

import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  Message,
} from '../../types/message';

export default class ApiService {
  private static urls: { [key: string]: string } = {
    blink: '/api/blink',
  };

  constructor() {

  }

  public static blinkSetColor(color: tinycolor.Instance): void {
    const message = new BlinkSetColorMessage(color.toHexString());
    this.post(this.urls.blink, message);
  }

  public static blinkOff(): void {
    const message = new BlinkOffMessage();
    this.post(this.urls.blink, message);
  }

  private static post(url: string, data: Message): void {
    $.ajax({
      type: 'POST',
      url,
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
  }
}

import tinycolor from 'tinycolor2';

import {
  BlinkSetColorMessage,
  MessageType,
} from '../../types/message';

export default class ApiService {
  constructor() {

  }

  public static setColor(color: tinycolor.Instance): void {
    const message = new BlinkSetColorMessage(color.toHexString());

    $.post('/api/blink', JSON.stringify(message));
  }
}

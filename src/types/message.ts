import _ from 'lodash';

export enum MessageType {
  BlinkOff,
  BlinkSetColor,
}

export interface Message {
  type: MessageType;
}

export class BlinkOffMessage implements Message {
  public type = MessageType.BlinkOff;

  constructor() { }
}

export class BlinkSetColorMessage implements Message {
  public type = MessageType.BlinkSetColor;
  public color: string;

  constructor(color: string) {
    this.color = color;
  }
}

// validate format
function isValidColor(color: any): boolean {
  if (!_.isString(color)) {
    return false;
  }
  const colorRegex = /^#[0-9a-f]{6}$/i;
  return colorRegex.test(color);
}
export function isValidMessage(message: any): message is Message {
  if (!_.isObjectLike(message)) {
    return false;
  }
  switch (message.type) {
    case MessageType.BlinkOff:
      return true;
    case MessageType.BlinkSetColor:
      return isValidColor(message.color);
    default:
      return false;
  }
}

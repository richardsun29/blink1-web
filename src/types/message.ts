import _ from 'lodash';

export enum MessageType {
  None,
  BlinkOff,
  BlinkSetColor,
  StatusUpdateNotification,
  StatusUpdateRequest,
}

export interface Message {
  readonly type: MessageType;
}

export class BlinkOffMessage implements Message {
  public type = MessageType.BlinkOff;

  constructor() { }

  public static isValid(message: any): message is BlinkOffMessage {
    return true;
  }
}

export class BlinkSetColorMessage implements Message {
  public type = MessageType.BlinkSetColor;
  public color: string;

  constructor(color: string) {
    this.color = color;
  }

  public static isValid(message: any): message is BlinkSetColorMessage {
    return this.isValidColor(message.color);
  }

  private static isValidColor(color: any): boolean {
    if (!_.isString(color)) {
      return false;
    }
    const colorRegex = /^#[0-9a-f]{6}$/i;
    return colorRegex.test(color);
  }
}

export class StatusUpdateNotificationMessage implements Message {
  public type = MessageType.StatusUpdateNotification;
  public successful: boolean;

  constructor(successful: boolean) {
    this.successful = successful;
  }

  public static isValid(message: any): message is StatusUpdateNotificationMessage {
    return _.isBoolean(message.successful);
  }
}

export class StatusUpdateRequestMessage implements Message {
  public type = MessageType.StatusUpdateRequest;

  constructor() { }

  public static isValid(message: any): message is StatusUpdateRequestMessage {
    return true;
  }
}

// validate format
export function isValidMessage(message: any): message is Message {
  if (!_.isObjectLike(message)) {
    return false;
  }
  switch (message.type) {
    case MessageType.BlinkOff:
      return BlinkOffMessage.isValid(message);
    case MessageType.BlinkSetColor:
      return BlinkSetColorMessage.isValid(message);
    case MessageType.StatusUpdateNotification:
      return StatusUpdateNotificationMessage.isValid(message);
    case MessageType.StatusUpdateRequest:
      return StatusUpdateRequestMessage.isValid(message);
    default:
      return false;
  }
}

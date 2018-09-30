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

export enum MessageType {
  BlinkOff,
  BlinkSetColor,
}

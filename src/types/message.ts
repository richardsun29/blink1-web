export interface Message {
  type: MessageType;
}

export interface BlinkOffMessage extends Message {
  type: MessageType.BlinkOff;
}

export interface BlinkSetColorMessage extends Message {
  type: MessageType.BlinkSetColor;
  color: string;
}

export enum MessageType {
  BlinkOff,
  BlinkSetColor,
}

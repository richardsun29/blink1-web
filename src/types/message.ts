import Color from 'color';

export interface Message {
  type: MessageType;
}

export interface BlinkSetColorMessage extends Message {
  color: Color;
}

export enum MessageType {
  BlinkOff,
  BlinkSetColor,
}

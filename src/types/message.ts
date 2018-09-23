export interface Message {
  type: MessageType;
}

export interface BlinkSetColorMessage extends Message {
  color: {
    r: number;
    g: number;
    b: number;
  };
}

export enum MessageType {
  BlinkOff,
  BlinkSetColor,
}

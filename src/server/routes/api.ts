import express from 'express';
const router: express.Router = express.Router();

import _ from 'lodash';

import Factory from '../../util/factory';

import { Message, MessageType } from '../../types/message';
import MessageSender from '../../util/message-sender';
const messageSender: MessageSender = Factory.createMessageSender();

// validate format
function isValidColor(color: any): color is { r: number, g: number, b: number } {
  if (!_.isObjectLike(color)) {
    return false;
  }
  return _.every(color, (val: number) => _.inRange(val, 0, 255));
}
function isMessage(message: any): message is Message {
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

router.post('/blink', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isMessage(req.body)) {
    messageSender.trigger('blink', req.body);
    res.send();
  } else {
    res.status(400);
    res.send('Invalid message');
  }
});

export default router;

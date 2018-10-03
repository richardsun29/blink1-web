import express from 'express';
const router: express.Router = express.Router();

import Factory from '../../util/factory';

import {
  isValidMessage,
  Message,
  MessageType,
} from '../../types/message';

import MessageSender from '../../util/message-sender';
const messageSender: MessageSender = Factory.createMessageSender();

router.post('/blink', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isValidMessage(req.body)) {
    messageSender.trigger('blink', req.body);
    res.send();
  } else {
    res.status(400);
    res.send('Invalid message');
  }
});

export default router;

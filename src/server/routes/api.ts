import express from 'express';
const router: express.Router = express.Router();

import Factory from '../../util/factory';
import sleep from '../../util/sleep';

import {
  isValidMessage,
  Message,
  MessageType,
} from '../../types/message';

import MessageSender from '../../util/message-sender';
const getMessageSender = (() => {
  let messageSender: MessageSender | null = null;
  return () => {
    if (!messageSender) {
      messageSender = Factory.createMessageSender();
    }
    return messageSender;
  };
})();

router.post('/blink', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isValidMessage(req.body)) {
    getMessageSender().trigger('blink', req.body);
    res.send();
  } else {
    res.status(400);
    res.send('Invalid message');
  }
});

router.get('/status', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const isConnected: boolean = await Promise.race([
    getMessageSender().isSubscriberConnected(),
    sleep(2000, false),
  ]);

  res.send({ isConnected });
});

export default router;

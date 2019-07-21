import { strict as assert } from 'assert';

import Factory from '../util/factory';
import sleep from '../util/sleep';

import MessageReceiver from '../util/message-receiver';
import MessageSender from '../util/message-sender';

describe('Message Channel', () => {
  let messageReceiver: MessageReceiver;
  let messageSender: MessageSender;

  beforeEach(() => {
    process.env['PUSHER_CHANNEL'] = 'testchannel';

    messageReceiver = Factory.createMessageReceiver();
    messageSender = Factory.createMessageSender();
  });

  afterEach(() => {
    messageReceiver.disconnect();
  });

  describe('Send/Receive message', () => {
    it('should send a message successfully', (done) => {
      const eventName: string = 'test event';
      const data: any = {
        num: 5,
        str: 'abc',
        arr: [1, 2, '3'],
        obj: { a: 1 },
      };
      const callback: Pusher.EventCallback = (recvData: any) => {
        assert.deepStrictEqual(data, recvData);
        done();
      };

      messageReceiver.bind(eventName, callback);

      setTimeout(() => {
        messageSender.trigger(eventName, data);
      }, 1000);
    }).timeout(5000);

    it('should send messages for separate events', (done) => {
      const eventName1: string = 'test event 1';
      const eventName2: string = 'test event 2';
      const data1: any = 'data 1';
      const data2: any = 'data 2';

      let done1: boolean = false;
      let done2: boolean = false;
      const _done = (event: 1 | 2): void => {
        if (event === 1) {
          done1 = true;
        } else {
          done2 = true;
        }
        if (done1 && done2) {
          done();
        }
      };

      const callback1: Pusher.EventCallback = (recvData: any) => {
        assert.deepStrictEqual(data1, recvData);
        _done(1);
      };
      const callback2: Pusher.EventCallback = (recvData: any) => {
        assert.deepStrictEqual(data2, recvData);
        _done(2);
      };

      messageReceiver.bind(eventName1, callback1);
      messageReceiver.bind(eventName2, callback2);

      setTimeout(() => {
        messageSender.trigger(eventName1, data1);
        messageSender.trigger(eventName2, data2);
      }, 1000);
    }).timeout(5000);
  });

  describe('Client connection status', () => {
    it('should detect if no subscribers are connected', async () => {
      messageReceiver.disconnect();
      await sleep(1000);
      assert.strictEqual(await messageSender.isSubscriberConnected(), false);
    }).timeout(5000);

    it('should detect if a subscriber is connected', async () => {
      await sleep(1000);
      assert.strictEqual(await messageSender.isSubscriberConnected(), true);
    }).timeout(5000);

    it('should detect if the subscriber disconnects', async () => {
      await sleep(1000);
      assert.strictEqual(await messageSender.isSubscriberConnected(), true);
      messageReceiver.disconnect();

      await sleep(1000);
      assert.strictEqual(await messageSender.isSubscriberConnected(), false);
    }).timeout(5000);
  });

});

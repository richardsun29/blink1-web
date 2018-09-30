import { strict as assert } from 'assert';
import sinon from 'sinon';
import { getFake$, IJQueryFake } from '../../test/jquery.fake';

import tinycolor from 'tinycolor2';

import {
  BlinkSetColorMessage,
  isValidMessage,
  MessageType,
} from '../../types/message';

import ApiService from './api-service';

describe('ApiService', () => {
  let fake$: IJQueryFake;

  beforeEach(() => {
    // @ts-ignore
    global.$ = fake$ = getFake$();
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  describe('#blinkSetColor', () => {
    it('sends a POST request', () => {
      const color = tinycolor('#ff8800');
      ApiService.blinkSetColor(color);

      assert.equal(fake$.post.callCount, 1);

      const args = fake$.post.getCall(0).args;
      assert.equal(args[0], '/api/blink');
      const message = JSON.parse(args[1]);
      assert(isValidMessage(message));
      assert.equal(message.type, MessageType.BlinkSetColor);
      assert(tinycolor.equals(color, tinycolor(message.color)));
    });
  });

  describe('#blinkOff', () => {
    it('sends a POST request', () => {
      ApiService.blinkOff();

      assert.equal(fake$.post.callCount, 1);

      const args = fake$.post.getCall(0).args;
      assert.equal(args[0], '/api/blink');
      const message = JSON.parse(args[1]);
      assert(isValidMessage(message));
      assert.equal(message.type, MessageType.BlinkOff);
    });
  });
});

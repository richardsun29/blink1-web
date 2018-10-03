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

      assert.strictEqual(fake$.ajax.callCount, 1);

      const settings = fake$.ajax.getCall(0).args[0];
      assert.strictEqual(settings.url, '/api/blink');
      assert.strictEqual(settings.type, 'POST');
      assert.strictEqual(settings.contentType, 'application/json');

      const message = JSON.parse(settings.data);
      assert(isValidMessage(message));
      assert.strictEqual(message.type, MessageType.BlinkSetColor);
      assert(tinycolor.equals(color, tinycolor(message.color)));
    });

    it('handles null color', () => {
      // @ts-ignore
      ApiService.blinkSetColor(null);

      assert.strictEqual(fake$.ajax.callCount, 1);

      const settings = fake$.ajax.getCall(0).args[0];
      assert.strictEqual(settings.url, '/api/blink');
      assert.strictEqual(settings.type, 'POST');
      assert.strictEqual(settings.contentType, 'application/json');

      const message = JSON.parse(settings.data);
      assert(isValidMessage(message));
      assert.strictEqual(message.type, MessageType.BlinkOff);
    });
  });

  describe('#blinkOff', () => {
    it('sends a POST request', () => {
      ApiService.blinkOff();

      assert.strictEqual(fake$.ajax.callCount, 1);

      const settings = fake$.ajax.getCall(0).args[0];
      assert.strictEqual(settings.url, '/api/blink');
      assert.strictEqual(settings.type, 'POST');
      assert.strictEqual(settings.contentType, 'application/json');

      const message = JSON.parse(settings.data);
      assert(isValidMessage(message));
      assert.strictEqual(message.type, MessageType.BlinkOff);
    });
  });
});

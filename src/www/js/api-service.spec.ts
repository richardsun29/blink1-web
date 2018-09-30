import { strict as assert } from 'assert';
import sinon from 'sinon';

import tinycolor from 'tinycolor2';

import fake$ from '../../test/jquery.fake';
// @ts-ignore
global.$ = fake$;

import {
  BlinkSetColorMessage,
  MessageType,
} from '../../types/message';

import ApiService from './api-service';

describe('ApiService', () => {

  describe('#setColor', () => {
    it('works', () => {
      const color = tinycolor('#ff8800');
      ApiService.setColor(color);
    });
  });
});

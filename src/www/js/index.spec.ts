import { strict as assert } from 'assert';
import sinon from 'sinon';

// tslint:disable:no-implicit-dependencies
import tinycolor from 'tinycolor2';
import ApiService from './api-service';

import fake$ from '../../test/jquery.fake';
// @ts-ignore
global.$ = fake$;

import fake_ from '../../test/lodash.fake';
// @ts-ignore
global._ = fake_;

describe('www', () => {
  let index: any;

  beforeEach(() => {
    index = require('./index');
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should run on document ready', () => {
    assert.deepEqual(fake$.getCall(0).args, []);
    assert.equal(fake$.ready.callCount, 1);
  });

  describe('#onColorSelect', () => {
    it('initalizes the color picker', () => {
      assert(fake$.calledWith('#color-picker'));
      assert(fake$.spectrum.called);
    });

    it('throttles color selection callback', () => {
      const throttleMin: sinon.SinonMatcher = sinon.match((ms) => ms > 50, 'throttleMin');
      assert(fake_.throttle.calledWithMatch(sinon.match.any, throttleMin));
    });

    it('calls ApiServer.setColor', () => {
      const setColorSpy: sinon.SinonSpy = sinon.spy();
      sinon.replace(ApiService, 'setColor', setColorSpy);

      assert(fake$.spectrum.called);
      const args = fake$.spectrum.getCall(0).args;
      const colorSelectCallback: (color: tinycolor.Instance) => void = args[0]['move'];

      const color: tinycolor.Instance = tinycolor('#ff8800');
      colorSelectCallback(color);
      assert(setColorSpy.calledOnceWithExactly(color));
    });
  });
});

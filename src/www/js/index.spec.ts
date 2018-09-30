import { strict as assert } from 'assert';
import sinon from 'sinon';
import { getFake$, IJQueryFake } from '../../test/jquery.fake';
import { getFake_, ILodashFake } from '../../test/lodash.fake';

// tslint:disable:no-implicit-dependencies
import tinycolor from 'tinycolor2';
import ApiService from './api-service';

import * as index from './index';

describe('www', () => {
  let fake$: IJQueryFake;
  let fake_: ILodashFake;

  beforeEach(() => {
    // @ts-ignore
    global.$ = fake$ = getFake$();

    // @ts-ignore
    global._ = fake_ = getFake_();
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should run on document ready', () => {
    index.EntryPoint();
    assert.deepEqual(fake$.getCall(0).args, []);
    assert.equal(fake$.ready.callCount, 1);
  });

  describe('#onColorSelect', () => {
    it('initalizes the color picker', () => {
      index.EntryPoint();
      assert(fake$.calledWith('#color-picker'));
      assert(fake$.spectrum.called);
    });

    it('throttles color selection callback', () => {
      index.EntryPoint();
      const throttleMin: sinon.SinonMatcher = sinon.match((ms) => ms > 50, 'throttleMin');
      assert(fake_.throttle.calledWithMatch(sinon.match.any, throttleMin));
    });

    it('calls ApiServer.blinkSetColor', () => {
      index.EntryPoint();
      const setColorSpy: sinon.SinonSpy = sinon.spy();
      sinon.replace(ApiService, 'blinkSetColor', setColorSpy);

      assert(fake$.spectrum.called);
      const args = fake$.spectrum.getCall(0).args;
      const colorSelectCallback: (color: tinycolor.Instance) => void = args[0]['move'];

      const color: tinycolor.Instance = tinycolor('#ff8800');
      colorSelectCallback(color);
      assert(setColorSpy.calledOnceWithExactly(color));
    });
  });
});

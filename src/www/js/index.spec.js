const assert = require('assert').strict;
const sinon = require('sinon');
const tinycolor = require('tinycolor2');

describe('www', () => {
  // jQuery
  global.$ = sinon.stub();
  $.returns($);
  $.ready = sinon.fake();

  let index;

  beforeEach(() => {
    index = require('./index');
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should run on document ready', () => {
    assert.equal($.callCount, 1);
    assert.equal($.ready.callCount, 1);
  });

  describe('#onColorSelect', () => {
    it('should run on document ready', () => {
      const color = tinycolor('#aaff36');
      index.onColorSelect({}, color);
    });
  });
});

import assert from 'assert';
import sinon from 'sinon';

import Config from '../util/config';

describe('Config', function() {
  afterEach(function() {
    sinon.verifyAndRestore();
  });

  it('should have all required config for Pusher', function() {
    assert(Config.PUSHER_APPID);
    assert(Config.PUSHER_KEY);
    assert(Config.PUSHER_SECRET);
    assert(Config.PUSHER_CLUSTER);
  });

  it('should throw when required config not set', function() {
    sinon.replace(process.env, 'PUSHER_APPID', '');

    assert.throws(() => Config.PUSHER_APPID);
  });

  it('should return a default value when optional config not set', function() {
    sinon.replace(process.env, 'PORT', '');
    assert(Config.PORT);
  });
});

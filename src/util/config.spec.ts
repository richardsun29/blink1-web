import { strict as assert } from 'assert';
import sinon from 'sinon';

import Config from './config';

describe('Config', () => {
  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should have all required config for Pusher', () => {
    assert(Config.PUSHER_APPID);
    assert(Config.PUSHER_KEY);
    assert(Config.PUSHER_SECRET);
    assert(Config.PUSHER_CLUSTER);
  });

  it('should have all required config for the server', () => {
    assert(Config.PASSWORD_HASH);
    assert(Config.JWT_SECRET);
  });

  it('should throw when required config not set', () => {
    sinon.replace(process.env, 'PUSHER_APPID', '');

    assert.throws(() => Config.PUSHER_APPID);
  });

  it('should return a default value when optional config not set', () => {
    sinon.replace(process.env, 'PORT', '');
    assert(Config.PORT);

    sinon.replace(process.env, 'BLINK_TIMEOUT', '');
    assert(Config.BLINK_TIMEOUT);
  });
});

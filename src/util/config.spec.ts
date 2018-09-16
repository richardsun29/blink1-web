import assert from 'assert';

import Config from '../util/config';

describe('Config', function() {
  it('should have all required config for Pusher', function() {
    assert(Config.PUSHER_APPID);
    assert(Config.PUSHER_KEY);
    assert(Config.PUSHER_SECRET);
    assert(Config.PUSHER_CLUSTER);
  })
});

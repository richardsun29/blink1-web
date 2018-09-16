import assert from 'assert';
import sinon = require('sinon');
import proxyquire from 'proxyquire';

describe('Factory', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('should create a PusherClient with config', function() {
    const spyPusher: sinon.SinonSpy = sinon.spy();
    const config: NodeJS.ProcessEnv = {
      PUSHER_KEY: 'test key',
      PUSHER_CLUSTER: 'test cluster'
    };

    const Factory = proxyquire('../util/factory', {
    'pusher-js': spyPusher,
    '../util/config': config
    }).default;

    let pusherClient: Pusher.Pusher = Factory.createPusherClient();

    assert(spyPusher.calledOnceWith(config.PUSHER_KEY,
      sinon.match({ cluster: config.PUSHER_CLUSTER })
    ));
    assert(pusherClient instanceof spyPusher);
  });
});

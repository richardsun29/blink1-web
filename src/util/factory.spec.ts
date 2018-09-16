import assert from 'assert';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import Config from '../util/config';
import PusherServer from 'pusher';

describe('Factory', function() {

  beforeEach(function() {
    sinon.replaceGetter(Config, 'PUSHER_APPID', () => 'test appid');
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_SECRET', () => 'test secret');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');
  });

  afterEach(function() {
    sinon.verifyAndRestore();
  });

  it('should create a PusherClient with config', function() {
    const spyPusherClient: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('../util/factory', {
      'pusher-js': spyPusherClient
    }).default;

    let pusherClient: Pusher.Pusher = Factory.createPusherClient();

    var args = spyPusherClient.args[0];
    assert.strictEqual(Config.PUSHER_KEY, args[0]);
    assert.strictEqual(Config.PUSHER_CLUSTER, args[1].cluster);

    assert(spyPusherClient.calledOnceWith(Config.PUSHER_KEY,
      sinon.match({ cluster: Config.PUSHER_CLUSTER })
    ));
    assert(pusherClient instanceof spyPusherClient);
  });

  it('should create a PusherServer with config', function() {
    const spyPusherServer: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('../util/factory', {
      'pusher': spyPusherServer,
    }).default;

    let pusherServer: PusherServer = Factory.createPusherServer();

    assert(spyPusherServer.calledOnceWith(sinon.match({
      cluster: Config.PUSHER_CLUSTER,
      appId: Config.PUSHER_APPID,
      key: Config.PUSHER_KEY,
      secret: Config.PUSHER_SECRET,
    })));
    assert(pusherServer instanceof spyPusherServer);
  });
});

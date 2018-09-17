import assert from 'assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import PusherServer from 'pusher';

import Config from '../util/config';

describe('Factory', () => {

  beforeEach(() => {
    sinon.replaceGetter(Config, 'PUSHER_APPID', () => 'test appid');
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_SECRET', () => 'test secret');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should create a PusherClient with config', () => {
    const spyPusherClient: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('../util/factory', {
      'pusher-js': spyPusherClient,
    }).default;

    const pusherClient: Pusher.Pusher = Factory.createPusherClient();

    const args = spyPusherClient.args[0];
    assert.strictEqual(Config.PUSHER_KEY, args[0]);
    assert.strictEqual(Config.PUSHER_CLUSTER, args[1].cluster);

    assert(spyPusherClient.calledOnceWith(Config.PUSHER_KEY,
      sinon.match({ cluster: Config.PUSHER_CLUSTER }),
    ));
    assert(pusherClient instanceof spyPusherClient);
  });

  it('should create a PusherServer with config', () => {
    const spyPusherServer: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('../util/factory', {
      'pusher': spyPusherServer,
    }).default;

    const pusherServer: PusherServer = Factory.createPusherServer();

    assert(spyPusherServer.calledOnceWith(sinon.match({
      cluster: Config.PUSHER_CLUSTER,
      appId: Config.PUSHER_APPID,
      key: Config.PUSHER_KEY,
      secret: Config.PUSHER_SECRET,
    })));
    assert(pusherServer instanceof spyPusherServer);
  });
});

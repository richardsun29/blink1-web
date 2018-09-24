import { strict as assert } from 'assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import Blink1 from 'node-blink1';
import PusherServer from 'pusher';

import Config from './config';

describe('Factory', () => {

  beforeEach(() => {
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should create a PusherClient with config', () => {
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');
    const spyPusherClient: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('./factory', {
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
    sinon.replaceGetter(Config, 'PUSHER_APPID', () => 'test appid');
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_SECRET', () => 'test secret');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');
    const spyPusherServer: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('./factory', {
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

  it('should create a Blink1', () => {
    const spyBlink1: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('./factory', {
      'node-blink1': spyBlink1,
    }).default;

    const blink1: Blink1 = Factory.createBlink1();

    assert(spyBlink1.calledOnce);
    assert(blink1 instanceof spyBlink1);
  });
});

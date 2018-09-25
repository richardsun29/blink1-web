import { strict as assert } from 'assert';
import _proxyquire from 'proxyquire';
const proxyquire = _proxyquire.noCallThru();
import sinon from 'sinon';

import Blink1 from 'node-blink1';
import PusherServer from 'pusher';

import Config from './config';
import MessageReceiver from './message-receiver';
import MessageSender from './message-sender';

describe('Factory', () => {

  beforeEach(() => {
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  function testCreateObject(module: string, method: string): sinon.SinonSpy {
    const spy: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('./factory', {
      [module]: spy,
    }).default;

    const obj = Factory[method]();

    assert.equal(spy.callCount, 1);
    assert(obj instanceof spy);

    return spy;
  }

  function testCreateSingleton(module: string, method: string): sinon.SinonSpy {
    const spy: sinon.SinonSpy = sinon.spy();

    const Factory = proxyquire('./factory', {
      [module]: spy,
    }).default;

    const obj = Factory[method]();

    assert.equal(spy.callCount, 1);
    assert(obj instanceof spy);

    const obj2 = Factory[method]();

    assert.equal(spy.callCount, 1);
    assert(obj2 instanceof spy);
    assert.equal(obj, obj2);

    return spy;
  }

  it('should create a PusherClient with config', () => {
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');

    const spy: sinon.SinonSpy = testCreateObject('pusher-js', 'createPusherClient');

    const args = spy.args[0];
    assert.equal(Config.PUSHER_KEY, args[0]);
    assert.equal(Config.PUSHER_CLUSTER, args[1].cluster);

    assert(spy.calledOnceWith(Config.PUSHER_KEY,
      sinon.match({ cluster: Config.PUSHER_CLUSTER }),
    ));
  });

  it('should create a PusherServer with config', () => {
    sinon.replaceGetter(Config, 'PUSHER_APPID', () => 'test appid');
    sinon.replaceGetter(Config, 'PUSHER_KEY', () => 'test key');
    sinon.replaceGetter(Config, 'PUSHER_SECRET', () => 'test secret');
    sinon.replaceGetter(Config, 'PUSHER_CLUSTER', () => 'test cluster');

    const spy: sinon.SinonSpy = testCreateObject('pusher', 'createPusherServer');

    assert(spy.calledOnceWith(sinon.match({
      cluster: Config.PUSHER_CLUSTER,
      appId: Config.PUSHER_APPID,
      key: Config.PUSHER_KEY,
      secret: Config.PUSHER_SECRET,
    })));
  });

  it('should create a Blink1', () => {
    testCreateObject('node-blink1', 'createBlink1');
  });

  it('should create a MessageReceiver singleton', () => {
    testCreateSingleton('./message-receiver', 'getMessageReceiver');
  });

  it('should create a MessageSender singleton', () => {
    testCreateSingleton('./message-sender', 'getMessageSender');
  });
});

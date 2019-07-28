import {strict as assert} from 'assert';
import sinon from 'sinon';

import Blink1 from 'node-blink1';
import tinycolor from 'tinycolor2';
import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  Message,
  MessageType,
} from '../types/message';
import Config from '../util/config';
import Factory from '../util/factory';

import Blink from './blink';

describe('Blink', () => {
  let mockFactory: sinon.SinonMock;
  let mockBlink1: sinon.SinonStubbedInstance<Blink1>;

  let blink: Blink;

  beforeEach(() => {
    sinon.stub(console, 'error');

    // never time out
    sinon.replaceGetter(Config, 'BLINK_TIMEOUT', () => Number.MAX_VALUE);

    mockFactory = sinon.mock(Factory);
    mockBlink1 = sinon.createStubInstance(Blink1);
  });

  afterEach(() => {
    sinon.verifyAndRestore();
    blink.close();
  });

  describe('#constructor', () => {
    it('should connect to blink1', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);
      blink = new Blink();
    });

    it('should handle blink1 error', () => {
      mockFactory.expects('createBlink1').throws();
      assert.doesNotThrow(() => blink = new Blink());
    });
  });

  describe('#StatusCallback', () => {
    const message = new BlinkOffMessage();
    const onSuccess: sinon.SinonSpy = sinon.spy();
    const onError: sinon.SinonSpy = sinon.spy();

    afterEach(() => {
      onSuccess.resetHistory();
      onError.resetHistory();
    });

    it('should report success on success', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);
      blink = new Blink(onSuccess, onError);
      blink.processMessage(message);
      assert.strictEqual(onSuccess.callCount, 1);
      assert.strictEqual(onError.callCount, 0);
    });

    it('should report success on success after retry', () => {
      mockFactory.expects('createBlink1').throws();
      mockFactory.expects('createBlink1').returns(mockBlink1);
      blink = new Blink(onSuccess, onError);
      blink.processMessage(message);
      assert.strictEqual(onSuccess.callCount, 1);
      assert.strictEqual(onError.callCount, 0);
    });

    it('should report error on failure', () => {
      mockFactory.expects('createBlink1').twice().throws();
      blink = new Blink(onSuccess, onError);
      blink.processMessage(message);
      assert.strictEqual(onSuccess.callCount, 0);
      assert.strictEqual(onError.callCount, 1);
    });

    it('should report error on invalid message', () => {
      const invalidMessage: Message = { type: MessageType.None };
      mockFactory.expects('createBlink1').returns(mockBlink1);
      blink = new Blink(onSuccess, onError);
      blink.processMessage(invalidMessage);
      assert.strictEqual(onSuccess.callCount, 0);
      assert.strictEqual(onError.callCount, 1);
    });
  });

  describe('#off', () => {
    const offMessage = new BlinkOffMessage();

    it('should run command', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);

      blink = new Blink();

      blink.processMessage(offMessage);

      assert(mockBlink1.off.calledOnce);
    });

    it('should try to reconnect', () => {
      mockFactory.expects('createBlink1').throws();
      mockFactory.expects('createBlink1').returns(mockBlink1);

      blink = new Blink();

      blink.processMessage(offMessage);

      assert(mockBlink1.off.calledOnce);
    });
  });

  describe('#setColor', () => {
    it('should run command', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);
      blink = new Blink();

      const message = new BlinkSetColorMessage('#aaff00');

      blink.processMessage(message);

      assert(mockBlink1.fadeToRGB.calledOnce);

      const color: tinycolor.ColorFormats.RGB = tinycolor(message.color).toRgb();
      const args: any[] = mockBlink1.fadeToRGB.firstCall.args;
      assert.deepStrictEqual(args.slice(1), [color.r, color.g, color.b]);
    });
  });
});

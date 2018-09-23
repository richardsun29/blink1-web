import assert from 'assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import Color from 'color';
import Blink1 from 'node-blink1';
import {
  BlinkSetColorMessage,
  Message,
  MessageType,
} from '../types/message';

import Blink from './blink';

describe('Blink', () => {
  let mockBlink1: sinon.SinonStubbedInstance<Blink1>;
  let stubBlink1Constructor: sinon.SinonStub;

  let BlinkTestee: any; // class Blink

  beforeEach(() => {
    sinon.stub(console, 'error');

    mockBlink1 = sinon.createStubInstance(Blink1);
    stubBlink1Constructor = sinon.stub();

    BlinkTestee = proxyquire.noCallThru()('./blink', {
      'node-blink1': stubBlink1Constructor,
    }).default;
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  describe('#constructor', () => {
    it('should connect to blink1', () => {
      stubBlink1Constructor.onFirstCall().returns(mockBlink1);
      const blink: Blink = new BlinkTestee();
      assert(stubBlink1Constructor.calledOnce);
    });

    it('should handle blink1 error', () => {
      stubBlink1Constructor.onFirstCall().throws();
      assert.doesNotThrow(() => new BlinkTestee());
      assert(stubBlink1Constructor.calledOnce);
    });
  });

  describe('#off', () => {
    it('should run command', () => {
      stubBlink1Constructor.onFirstCall().returns(mockBlink1);

      const blink: Blink = new BlinkTestee();

      blink.processMessage({
        type: MessageType.BlinkOff,
      } as Message);

      assert.equal(stubBlink1Constructor.callCount, 1);
      assert.equal(mockBlink1.off.callCount, 1);
    });

    it('should try to reconnect', () => {
      stubBlink1Constructor.onFirstCall().throws()
                           .onSecondCall().returns(mockBlink1);

      const blink: Blink = new BlinkTestee();

      blink.processMessage({
        type: MessageType.BlinkOff,
      } as Message);

      assert.equal(stubBlink1Constructor.callCount, 2);
      assert.equal(mockBlink1.off.callCount, 1);
    });
  });

  describe('#setColor', () => {
    it('should run command', () => {
      stubBlink1Constructor.onFirstCall().returns(mockBlink1);
      const color: any = { r: 0, g: 126, b: 255 };

      const blink: Blink = new BlinkTestee();

      blink.processMessage({
        type: MessageType.BlinkSetColor,
        color,
      } as BlinkSetColorMessage);

      assert.equal(stubBlink1Constructor.callCount, 1);
      assert.equal(mockBlink1.fadeToRGB.callCount, 1);

      const args: any[] = mockBlink1.fadeToRGB.firstCall.args;
      assert.deepStrictEqual(args.slice(1), [color.r, color.g, color.b]);
    });
  });
});

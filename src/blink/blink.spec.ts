import {strict as assert} from 'assert';
import sinon from 'sinon';

import Blink1 from 'node-blink1';
import tinycolor from 'tinycolor2';
import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  MessageType,
} from '../types/message';
import Factory from '../util/factory';

import Blink from './blink';

describe('Blink', () => {
  let mockFactory: sinon.SinonMock;
  let mockBlink1: sinon.SinonStubbedInstance<Blink1>;

  beforeEach(() => {
    sinon.stub(console, 'error');

    mockFactory = sinon.mock(Factory);
    mockBlink1 = sinon.createStubInstance(Blink1);
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  describe('#constructor', () => {
    it('should connect to blink1', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);
      const blink: Blink = new Blink();
    });

    it('should handle blink1 error', () => {
      mockFactory.expects('createBlink1').throws();
      assert.doesNotThrow(() => new Blink());
    });
  });

  describe('#off', () => {
    const offMessage = new BlinkOffMessage();

    it('should run command', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);

      const blink: Blink = new Blink();

      blink.processMessage(offMessage);

      assert(mockBlink1.off.calledOnce);
    });

    it('should try to reconnect', () => {
      mockFactory.expects('createBlink1').throws();
      mockFactory.expects('createBlink1').returns(mockBlink1);

      const blink: Blink = new Blink();

      blink.processMessage(offMessage);

      assert(mockBlink1.off.calledOnce);
    });
  });

  describe('#setColor', () => {
    it('should run command', () => {
      mockFactory.expects('createBlink1').returns(mockBlink1);
      const blink: Blink = new Blink();

      const message = new BlinkSetColorMessage('#aaff00');

      blink.processMessage(message);

      assert(mockBlink1.fadeToRGB.calledOnce);

      const color: tinycolor.ColorFormats.RGB = tinycolor(message.color).toRgb();
      const args: any[] = mockBlink1.fadeToRGB.firstCall.args;
      assert.deepStrictEqual(args.slice(1), [color.r, color.g, color.b]);
    });
  });
});

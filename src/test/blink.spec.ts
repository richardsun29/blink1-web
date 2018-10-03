import { strict as assert } from 'assert';
import sinon from 'sinon';

import Blink1 from 'node-blink1';
import tinycolor from 'tinycolor2';

import { BlinkSetColorMessage } from '../types/message';
import Config from '../util/config';
import Factory from '../util/factory';

import Blink from '../blink/blink';

describe('Blink e2e', () => {
  let mockFactory: sinon.SinonMock;
  let mockBlink1: sinon.SinonStubbedInstance<Blink1>;

  let blink: Blink;

  beforeEach(() => {
    sinon.stub(console, 'error');

    mockFactory = sinon.mock(Factory);
    mockBlink1 = sinon.createStubInstance(Blink1);
  });

  afterEach(() => {
    sinon.verifyAndRestore();
    blink.close();
  });

  it('should time out after not receiving commands', (done) => {
    mockFactory.expects('createBlink1').returns(mockBlink1);
    sinon.replaceGetter(Config, 'BLINK_TIMEOUT', () => 1);

    mockBlink1.off.callsFake(() => done());

    blink = new Blink();

    const color: tinycolor.Instance = tinycolor('#0088ff');
    const message: BlinkSetColorMessage = new BlinkSetColorMessage(color.toHexString());
    blink.processMessage(message);

    const rgb = color.toRgb();
    assert(mockBlink1.fadeToRGB.calledOnceWith(sinon.match.any, rgb.r, rgb.g, rgb.b));
  }).timeout(5000);
});

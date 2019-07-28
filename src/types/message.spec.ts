import {strict as assert} from 'assert';

import {
  BlinkOffMessage,
  BlinkSetColorMessage,
  isValidMessage,
  MessageType,
  StatusUpdateNotificationMessage,
  StatusUpdateRequestMessage,
} from './message';

describe('Messages', () => {
  describe('BlinkOffMessage', () => {
    describe('#constructor', () => {
      it('should create a valid object', () => {
        const message = new BlinkOffMessage();
        assert.strictEqual(message.type, MessageType.BlinkOff);
        assert.strictEqual(isValidMessage(message), true);
      });
    });

    describe('#isValid', () => {
      it('should always be valid', () => {
        const message = { type: MessageType.BlinkOff };
        assert.strictEqual(isValidMessage(message), true);
      });
    });
  });

  describe('BlinkSetColorMessage', () => {
    describe('#constructor', () => {
      it('should create a valid object', () => {
        const message = new BlinkSetColorMessage('#ffffff');
        assert.strictEqual(message.type, MessageType.BlinkSetColor);
        assert.strictEqual(message.color, '#ffffff');
        assert.strictEqual(isValidMessage(message), true);
      });
    });

    describe('#isValid', () => {
      it('should reject missing fields', () => {
        const message = { type: MessageType.BlinkSetColor };
        assert.strictEqual(isValidMessage(message), false);
      });
      it('should reject invalid types', () => {
        const message = { type: MessageType.BlinkSetColor, color: 5};
        assert.strictEqual(isValidMessage(message), false);
      });
      it('should reject invalid color strings', () => {
        const message = { type: MessageType.BlinkSetColor, color: '#zzzzzz'};
        assert.strictEqual(isValidMessage(message), false);
      });
      it('should accept valid messages', () => {
        const message = { type: MessageType.BlinkSetColor, color: '#ffffff'};
        assert.strictEqual(isValidMessage(message), true);
      });
    });
  });

  describe('StatusUpdateNotificationMessage', () => {
    describe('#constructor', () => {
      it('should create a valid object', () => {
        const message = new StatusUpdateNotificationMessage(true);
        assert.strictEqual(message.type, MessageType.StatusUpdateNotification);
        assert.strictEqual(message.successful, true);
        assert.strictEqual(isValidMessage(message), true);
      });
    });

    describe('#isValid', () => {
      it('should reject missing fields', () => {
        const message = { type: MessageType.StatusUpdateNotification };
        assert.strictEqual(isValidMessage(message), false);
      });
      it('should reject invalid types', () => {
        const message = { type: MessageType.StatusUpdateNotification, successful: 5};
        assert.strictEqual(isValidMessage(message), false);
      });
      it('should accept valid messages', () => {
        const message = { type: MessageType.StatusUpdateNotification, successful: true};
        assert.strictEqual(isValidMessage(message), true);
      });
    });
  });

  describe('StatusUpdateRequestMessage', () => {
    describe('#constructor', () => {
      it('should create a valid object', () => {
        const message = new StatusUpdateRequestMessage();
        assert.strictEqual(message.type, MessageType.StatusUpdateRequest);
        assert.strictEqual(isValidMessage(message), true);
      });
    });

    describe('#isValid', () => {
      it('should always be valid', () => {
        const message = { type: MessageType.StatusUpdateRequest };
        assert.strictEqual(isValidMessage(message), true);
      });
    });
  });
});

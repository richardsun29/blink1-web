import {strict as assert} from 'assert';

import { StatusUpdateNotificationMessage } from '../types/message';

import StatusManager from './status-manager';

describe('StatusManager', () => {
  describe('Last Status', () => {
    it('should return false if no status has been set', () => {
      assert.strictEqual(StatusManager.lastStatusWasSuccess(), false);
    });

    it('should update state', () => {
      StatusManager.setLastStatus(new StatusUpdateNotificationMessage(true));
      assert.strictEqual(StatusManager.lastStatusWasSuccess(), true);
      StatusManager.setLastStatus(new StatusUpdateNotificationMessage(false));
      assert.strictEqual(StatusManager.lastStatusWasSuccess(), false);
    });
  });
});

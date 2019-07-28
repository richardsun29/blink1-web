import { StatusUpdateNotificationMessage } from '../types/message';

export default class StatusManager {
  private static lastStatus: StatusUpdateNotificationMessage;

  public static setLastStatus(lastStatus: StatusUpdateNotificationMessage): void {
    this.lastStatus = lastStatus;
  }

  public static lastStatusWasSuccess(): boolean {
    if (!this.lastStatus) {
      return false;
    }

    return this.lastStatus.successful;
  }
}

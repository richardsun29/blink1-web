import dotenv from 'dotenv';
dotenv.config();

class ConfigNotSetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigNotSetError';
  }
}

export default class Config {
  private static getRequiredConfig(name: string): string {
    if (process.env[name]) {
      return process.env[name] as string;
    } else {
      throw new ConfigNotSetError(name);
    }
  }

  private static getOptionalConfig(name: string, defaultValue?: string): string {
    try {
      return this.getRequiredConfig(name);
    } catch (e) {
      // Typescript 2.1 breaking change: instanceof Error subclass doesn't work
      // if (e instanceof ConfigNotSetError && defaultValue) {
      if (e.name === 'ConfigNotSetError' && defaultValue) {
        return defaultValue;
      }
      throw e;
    }
  }

  public static get PUSHER_APPID(): string { return this.getRequiredConfig('PUSHER_APPID'); }
  public static get PUSHER_KEY(): string { return this.getRequiredConfig('PUSHER_KEY'); }
  public static get PUSHER_SECRET(): string { return this.getRequiredConfig('PUSHER_SECRET'); }
  public static get PUSHER_CLUSTER(): string { return this.getRequiredConfig('PUSHER_CLUSTER'); }

  public static get PORT(): number { return parseInt(this.getOptionalConfig('PORT', '5000')); }
  public static get PASSWORD_HASH(): string { return this.getRequiredConfig('PASSWORD_HASH'); }
  public static get JWT_SECRET(): string { return this.getRequiredConfig('JWT_SECRET'); }

  public static get BLINK_TIMEOUT(): number { return parseInt(this.getOptionalConfig('BLINK_TIMEOUT', '30')); }
}

import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config({ path: '.env' });
}

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

  static get PUSHER_APPID(): string { return this.getRequiredConfig('PUSHER_APPID'); }
  static get PUSHER_KEY(): string { return this.getRequiredConfig('PUSHER_KEY'); }
  static get PUSHER_SECRET(): string { return this.getRequiredConfig('PUSHER_SECRET'); }
  static get PUSHER_CLUSTER(): string { return this.getRequiredConfig('PUSHER_CLUSTER'); }

  static get PORT(): number { return parseInt(this.getOptionalConfig('PORT', '5000')); }
}
import dotenv from 'dotenv';
dotenv.config();

export const PUSHER_APPID: string = process.env.APPID || '';
export const PUSHER_KEY: string = process.env.PUSHER_KEY || '';
export const PUSHER_SECRET: string = process.env.PUSHER_SECRET || '';
export const PUSHER_CLUSTER: string = process.env.PUSHER_CLUSTER || '';

export const PORT: number = parseInt(process.env.PORT || '5000');

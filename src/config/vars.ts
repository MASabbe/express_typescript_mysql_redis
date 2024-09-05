import dotenv from 'dotenv';

dotenv.config();
export const env = process.env.NODE_ENV || 'development';
export const logs = env === 'production' ? 'combined' : 'dev';
export const port = process.env.PORT || 3000;
export const appName = process.env.APP_NAME;
export const appVersion = process.env.APP_VERSION;
export const jwtSecret = process.env.APP_JWT_SECRET;
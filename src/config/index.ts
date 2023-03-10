import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export default {
  CREDENTIALS: process.env.CREDENTIALS === 'true',
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
  LOG_FORMAT: process.env.LOG_FORMAT,
  LOG_DIR: process.env.LOG_DIR,
  ORIGIN: process.env.ORIGIN,
  SERVER: {
    PORT: process.env.PORT,
  },
  MONGODB: {
    MONGODB_URI: process.env.MONGODB_URI,
  }
};

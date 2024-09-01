import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const config = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  dbURI: process.env.MONGODB_URI,
};

export default config;

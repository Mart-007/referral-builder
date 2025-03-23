import * as dotenv from 'dotenv'
dotenv.config()

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '8000',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY
}

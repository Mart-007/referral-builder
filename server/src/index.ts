const serviceAccount = require('../src/config/firebase.json')

import * as admin from 'firebase-admin'
import CONFIG from './config/config'
import createServer from './app'
import moment from 'moment-timezone'
import { logger } from './helpers/logger'

moment.tz.setDefault('Asia/Manila')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: CONFIG.FIREBASE_STORAGE_BUCKET
})

const app = createServer()

app.listen(CONFIG.PORT, () => {
  logger(`Listening on port ${CONFIG.PORT}. APP: ${CONFIG.APP}`)
})

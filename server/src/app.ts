import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import * as errorHandler from './helpers/errorHandlers'
import { api } from './routes/index'

function createServer() {
  const app: Application = express()

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use('/health-checks', (_req: Request, res: Response, _next: NextFunction) =>
    res.status(200).send('OK!')
  )

  app.use('/', api)

  app.use(errorHandler.notFound)
  app.use(errorHandler.internalServerError)

  return app
}

export default createServer

import { Request, Response } from 'express'
import * as MESSAGE from '../enums/Messages'
import ReferralDao from '../dao/referral-dao'
import httpStatus from 'http-status'
import { logger } from '../helpers/logger'
import moment from 'moment-timezone'

class ReferralController {
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { givenName, surname, email, phone, address } = req.body

      if (!givenName || !surname || !email || !phone || !address)
        throw ReferenceError(MESSAGE.MISSING_REQUIRED_PARAMETERS)

      const result = await ReferralDao.create({ ...req.body, createdAt: moment().valueOf() })

      res.status(httpStatus.CREATED).send({
        success: true,
        result
      })
    } catch (error) {
      const errorCode =
        error instanceof ReferenceError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      res.status(errorCode).send({
        success: false,
        message: error.message
      })
    }
  }

  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.query.id) throw ReferenceError(MESSAGE.MISSING_REQUIRED_PARAMETERS)

      const result = await ReferralDao.get(req.query.id as string)

      if (!result) throw ReferenceError(MESSAGE.NO_DATA_FOUND)

      res.status(httpStatus.OK).send({
        success: true,
        result
      })
    } catch (error) {
      const errorCode =
        error instanceof ReferenceError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      res.status(errorCode).send({
        success: false,
        message: error.message
      })
    }
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await ReferralDao.getAll()

      if (!result) throw ReferenceError(MESSAGE.NO_DATA_FOUND)

      res.status(httpStatus.OK).send({
        success: true,
        result
      })
    } catch (error) {
      const errorCode =
        error instanceof ReferenceError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      res.status(errorCode).send({
        success: false,
        message: error.message
      })
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await ReferralDao.delete(req.query.id as string)

      if (!result) throw ReferenceError(MESSAGE.NO_DATA_FOUND)

      res.status(httpStatus.OK).send({
        success: true,
        message: MESSAGE.SUCCESSFULLY_DELETED
      })
    } catch (error) {
      const errorCode =
        error instanceof ReferenceError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      res.status(errorCode).send({
        success: false,
        message: error.message
      })
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.body
      const result = await ReferralDao.update(id, req.body)

      if (!result) throw ReferenceError(MESSAGE.NO_DATA_FOUND)

      res.status(httpStatus.OK).send({
        success: true,
        message: MESSAGE.SUCCESSFULLY_UPDATE
      })
    } catch (error) {
      const errorCode =
        error instanceof ReferenceError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      res.status(errorCode).send({
        success: false,
        message: error.message
      })
    }
  }
}

export default ReferralController

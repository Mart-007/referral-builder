import { Router } from 'express'
import ReferralController from '../controller/referral-controller'
import verifyToken from '../helpers/verifyToken'

const referral = new ReferralController()

export const api: Router = Router()

/* MIDDLEWARE FOR AUTHENTICATION */
api.use(verifyToken)

api.post('/referral/create', referral.create)
api.get('/referral/get', referral.get)
api.get('/referral/getAll', referral.getAll)
api.delete('/referral/delete', referral.delete)
api.put('/referral/update', referral.update)

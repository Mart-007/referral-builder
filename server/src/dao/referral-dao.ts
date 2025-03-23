import * as admin from 'firebase-admin'
import { ICreateParams } from '../interface/IReferral'

class ReferralDao {
  static create = async (params: ICreateParams) => {
    const docRef = admin.firestore().collection('REFERRAL').doc()
    const docId = docRef.id

    await docRef.set({ id: docId, ...params })
    return { id: docId, ...params }
  }

  static get = async (id: string) => {
    const snapshot = await admin.firestore().collection('REFERRAL').doc(id).get()
    return snapshot.data()
  }

  static getAll = async () => {
    const snapshot = await admin
      .firestore()
      .collection('REFERRAL')
      .orderBy('createdAt', 'desc')
      .get()
    const referrals: unknown[] = []

    snapshot.forEach(doc => {
      referrals.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return referrals
  }

  static delete = async (id: string) => {
    return await admin.firestore().collection('REFERRAL').doc(id).delete()
  }

  static update = async (id: string, data: Partial<any>) => {
    return await admin.firestore().collection('REFERRAL').doc(id).update(data)
  }
}

export default ReferralDao

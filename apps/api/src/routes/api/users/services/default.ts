import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { PASSWORD_ENCRYPT_KEY } from '@/common/constants/ev'
import { ResponseService } from '@/common/service/response'
import { dbAddresses, dbUsers } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const { currentPassword, newPassword, confirmNewPassword } = req.body
  try {
    const getUser = await dbUsers.findById(userId)
    if (!getUser) {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!(currentPassword && newPassword && confirmNewPassword)) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    if (newPassword !== confirmNewPassword) {
      res.json(response.error({ message: 'Password not matched' }))
    }
    const decryptPassword = CryptoJS.AES.decrypt(
      getUser?.password as string,
      PASSWORD_ENCRYPT_KEY
    )
    const encryptCurrentPassword = CryptoJS.AES.encrypt(
      currentPassword,
      PASSWORD_ENCRYPT_KEY
    )
    const decryptCurrentPassword = CryptoJS.AES.decrypt(
      encryptCurrentPassword.toString(),
      PASSWORD_ENCRYPT_KEY
    )
    if (decryptCurrentPassword.toString() !== decryptPassword.toString()) {
      res.json(response.error({ message: 'Wrong old password' }))
    }
    const encryptNewPassword = CryptoJS.AES.encrypt(
      newPassword,
      PASSWORD_ENCRYPT_KEY
    )
    const updateUserPassword = await dbUsers.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: encryptNewPassword.toString(),
          changePasswordAt: Date.now(),
        },
      },
      { new: true }
    )

    res.json(
      response.success({
        item: updateUserPassword,
        allItemCount: 1,
        message: 'Password successfully updated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const deactivateAccount = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const getUser = await dbUsers.findOne({ _id: userId })
    if (!getUser) {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
    const deactivateUser = await dbUsers.findByIdAndUpdate(userId, {
      deactivated: true,
    })

    res.json(
      response.success({
        item: deactivateUser,
        allItemCount: 1,
        message: 'User Account successfully deactivated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbUsers.find({}).populate({
      path: 'guest',
      populate: [{ path: 'emergencyContacts' }, { path: 'address' }],
    })

    const modifyUsers = users.map((user: any) => ({
      personalInfo: {
        firstName: user.guest.firstName,
        middleName: user.guest.middleName,
        lastName: user.guest.lastName,
        language: user.guest.languages,
        currency: user.guest.currency,
        gender: user.guest.gender,
        phone: user.guest.phone,
        cellPhone: user.guest.cellPhone,
        country: user.guest.country,
        emergencyContacts: user.guest?.emergencyContacts
          ? user.guest.emergencyContacts
          : null,
        birthDate: user.guest.birthDate,
        confirm: user.guest?.confirm ? JSON.parse(user.guest?.confirm) : null,
        governmentId: user.guest?.governmentId ? user.guest.governmentId : null,
      },
    }))
    const addresses = await dbAddresses.find({})
    if (users.length > 0) {
      res.json(
        response.success({
          items: [modifyUsers, addresses],
          allItemCount: users.length,
        })
      )
    } else {
      res.json(response.error({ message: 'No data found' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

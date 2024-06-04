import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { FileService } from '@/common/service/file'
import { ResponseService } from '@/common/service/response'
import { T_GovernmentId, Z_AddGovernmentId } from '@repo/contract'
import {
  dbAddresses,
  dbEmergencyContacts,
  dbGuests,
  dbUsers,
} from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
const fileService = new FileService()

export const getPersonalInfo = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const getUserInfo = await dbUsers.findOne({ _id: userId }).populate('guest')

    if (!getUserInfo) {
      return res.json(
        response.success({ message: 'No user found with the provided ID' })
      )
    }

    const plainUserInfo = getUserInfo.toObject()

    res.json(response.success({ item: plainUserInfo }))
  } catch (err: any) {
    console.error('Error fetching user data:', err)
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      birthDate,
      governmentId,
      phone,
      cellPhone,
      confirm,
    } = req.body

    const userId = req.params.userId

    if (!userId) {
      return res.status(400).json(
        response.error({
          message: 'Invalid user ID format',
        })
      )
    }

    const getUser = await dbUsers.findById(userId)

    const editPersonalInfo = await dbGuests.findByIdAndUpdate(
      getUser?.guest,
      {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        birthDate: birthDate,
        governmentId: governmentId,
        cellPhone: cellPhone,
        phone: phone,
        confirm: JSON.stringify(confirm),
      },
      { new: true }
    )

    if (!editPersonalInfo) {
      return res.status(404).json(
        response.error({
          message: 'User not found',
        })
      )
    }

    res.json(
      response.success({
        item: editPersonalInfo,
        message: 'Successfully updated',
      })
    )
  } catch (err: any) {
    console.error('Error updating personal info:', err)
    res.status(500).json(
      response.error({
        message: 'An unknown error occurred',
      })
    )
  }
}

export const addAddress = async (req: Request, res: Response) => {
  const { country, streetAddress, city, stateProvince, aptSuite, zipCode } =
    req.body
  const personalInfoId = req.params.personalInfoId
  const getUser = await dbUsers.findById(personalInfoId)
  try {
    if ((streetAddress && city && stateProvince) || (aptSuite && zipCode)) {
      const getPersonalInfo = await dbGuests
        .findOne({
          _id: getUser?.guest,
          deletedAt: null,
        })
        .populate('address')

      if (getPersonalInfo) {
        let returnAddress = null
        if (
          getPersonalInfo.address === null ||
          getPersonalInfo.address === undefined
        ) {
          const newAddress = new dbAddresses({
            country: country,
            streetAddress: streetAddress,
            city: city,
            aptSuite: aptSuite,
            stateProvince: stateProvince,
            zipCode: zipCode,
          })
          await newAddress.save()
          await dbGuests.updateOne(
            { _id: getUser?.guest },
            { address: newAddress._id }
          )
          returnAddress = newAddress
        } else {
          const updateAddress = await dbAddresses.findByIdAndUpdate(
            getPersonalInfo.address?._id,
            {
              $set: {
                streetAddress: streetAddress,
                city: city,
                stateProvince: stateProvince,
                country: country,
                aptSuite: aptSuite,
                zipCode: zipCode,
                updatedAt: Date.now(),
              },
            },
            { new: true }
          )
          await dbGuests.updateOne(
            { _id: getUser?.guest },
            { address: updateAddress?._id }
          )

          returnAddress = updateAddress
        }
        res.json(
          response.success({
            item: returnAddress,
            message: 'Address successfully updated',
          })
        )
      } else {
        res.json(
          response.error({ message: 'No personal information data found' })
        )
      }
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const editAddress = async (req: Request, res: Response) => {
  const { streetAddress, city, stateProvince, zipCode, aptSuite, country } =
    req.body
  const userId = req.params.userId
  try {
    if (
      (streetAddress && city && stateProvince) ||
      (aptSuite && zipCode && country)
    ) {
      const personalInfo = await dbGuests
        .findOne({ _id: userId })
        .populate('address')
      if (personalInfo) {
        const updateAddress = await dbAddresses.findOneAndUpdate(
          {
            personalInfoId: personalInfo._id,
          },
          {
            streetAddress: streetAddress,
            city: city,
            stateProvince: stateProvince,
            aptSuite: aptSuite,
            country: country,
            zipCode: zipCode,
          },
          { new: true }
        )
        res.json(
          response.success({
            item: updateAddress,
            message: 'Address updated successfully',
          })
        )
      } else {
        res.json(
          response.error({
            message: USER_NOT_EXIST,
          })
        )
      }
    } else {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY,
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addEmergencyContact = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const getUser = await dbUsers.findById(userId)
  const { email, phoneNumber, name, relationship } = req.body
  try {
    if (name && phoneNumber && email && relationship) {
      const getPersonalInfo = await dbGuests
        .findOne({ _id: getUser?.guest, deletedAt: null })
        .populate('emergencyContacts')

      if (getPersonalInfo) {
        let returnEmergencyContact = null
        const newEmergencyContact = new dbEmergencyContacts({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          relationship: relationship,
        })
        await newEmergencyContact.save()
        await dbGuests.findByIdAndUpdate(
          getUser?.guest,
          {
            $push: { emergencyContacts: newEmergencyContact },
          },
          { new: true }
        )
        returnEmergencyContact = newEmergencyContact
        res.json(
          response.success({
            item: returnEmergencyContact,
            message: 'Emergency contact updated successfully!',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'No personal information data found!',
          })
        )
      }
    } else {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY,
        })
      )
    }
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const removeEmergencyContact = async (req: Request, res: Response) => {
  const userId = res.locals?.user.id
  const getUser = await dbUsers.findById(userId)
  const emergencyContactId = req.params.emergencyContactId
  try {
    const personalInfo = await dbGuests.findById({ _id: getUser?.guest })
    if (personalInfo !== null) {
      const emergencyContact = await dbEmergencyContacts.findOne({
        _id: emergencyContactId,
      })
      if (emergencyContact) {
        if (emergencyContact.deletedAt) {
          res.json(
            response.error({
              message: 'Emergency contact already deleted!',
            })
          )
        } else {
          const updateResult = await dbEmergencyContacts.updateOne(
            { _id: emergencyContactId },
            { $set: { deletedAt: new Date() } }
          )
          if (updateResult) {
            res.json(
              response.success({
                item: updateResult,
                message: 'Emergency contact successfully deleted!',
              })
            )
          }
        }
      } else {
        res.json(
          response.error({
            message: 'Emergency contact not found!',
          })
        )
      }
    } else {
      res.json(
        response.error({
          message: USER_NOT_EXIST,
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateCurrency = async (req: Request, res: Response) => {
  const guestId = req.params.guestId
  const { currency } = req.body
  try {
    if (!currency) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    const getPersonalInfo = await dbGuests.findOne({
      _id: guestId,
      deletedAt: null,
    })
    if (!getPersonalInfo) {
      return res.json(response.error({ message: 'Personal info not found' }))
    }
    const updateUserCurrency = await dbGuests.findByIdAndUpdate(
      guestId,
      {
        $set: {
          currency: currency,
        },
      },
      { new: true }
    )
    res.json(
      response.success({
        item: updateUserCurrency,
        allItemCount: 1,
        message: 'Currency successfully updated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getAllGovernmentIdByPersonInfoId = async (
  req: Request,
  res: Response
) => {
  const personId = req.params.guestId

  try {
    const getPersonInfoId = await dbGuests.findById(personId)
    if (getPersonInfoId) {
      res.json(
        response.success({
          items: getPersonInfoId?.governmentId,
          allItemCount:
            getPersonInfoId?.governmentId?.length === 0
              ? 0
              : getPersonInfoId?.governmentId?.length,
        })
      )
    } else {
      res.json(
        response.error({ message: 'This person not found in our system' })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateLanguage = async (req: Request, res: Response) => {
  const personalInfoId = req.params.personalInfoId
  const { language } = req.body
  try {
    console.log('personalInfoId:', personalInfoId)
    if (!language) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    const getPersonalInfo = await dbGuests.findOne({ id: personalInfoId })
    if (getPersonalInfo) {
      return res.json(response.error({ message: 'Personal info not found' }))
    }
    const updateUserLanguage = await dbGuests.findByIdAndUpdate(
      personalInfoId,
      { language: language },
      { new: true }
    )

    res.json(
      response.success({
        item: updateUserLanguage,
        allItemCount: 1,
        message: 'Language successfully updated',
      })
    )
    console.log('Update User Language:', updateUserLanguage)
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const addGovernmentId = async (req: Request, res: Response) => {
  const guestId = req.params.guestId
  const files = req.files
  const isValidInput = Z_AddGovernmentId.safeParse(req.body)
  if (isValidInput.success && files) {
    const { type } = req.body
    try {
      const getUser = await dbUsers.findById(guestId)
      const getGuestId = getUser?.guest

      const getGuestInfo = await dbGuests.findById({ _id: getGuestId })
      console.log('Guest info: ', getGuestInfo)

      if (getGuestInfo) {
        if (getGuestInfo.governmentId === null) {
          const upload = await fileService.upload({ files })
          const addNewGovernmentId = await dbGuests.findByIdAndUpdate(
            getUser?.guest,
            {
              governmentId: JSON.stringify([
                { fileKey: upload.key, type: type, createdAt: new Date() },
              ] as T_GovernmentId[]),
            },
            { new: true }
          )
          res.json(
            response.success({
              items: addNewGovernmentId?.governmentId,
              message: 'Government Id successfully added!',
            })
          )
        } else {
          const updatedGovernmentId = JSON.parse(
            JSON.stringify(getGuestInfo.governmentId)
          ) as T_GovernmentId[]
          const typeAlreadyExists = updatedGovernmentId.some(
            (govId: T_GovernmentId) => govId.type === type
          )

          if (!typeAlreadyExists) {
            if (updatedGovernmentId.length < 2) {
              const upload = await fileService.upload({ files })
              updatedGovernmentId.push({
                fileKey: upload.key,
                type: type,
                createdAt: new Date(),
              })

              const updateGovId = await dbGuests.findOneAndUpdate(
                { _id: getGuestId },
                { governmentId: updatedGovernmentId }
              )

              res.json(
                res.json(
                  response.success({
                    items: updateGovId?.governmentId || [],
                    message: 'Government Id successfully added!',
                  })
                )
              )
            } else {
              res.json(
                response.error({
                  message: 'Only 2 government IDs are allowed!',
                })
              )
            }
          } else {
            res.json(
              response.error({
                message: 'This type of Id is already exists!',
              })
            )
          }
        }
      } else {
        res.json(
          response.error({
            message: 'This guest does not exist!',
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: !isValidInput.success
          ? isValidInput.error.issues
          : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

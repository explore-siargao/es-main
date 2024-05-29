import { Response, Request } from 'express'
import { prisma } from '@/common/helpers/prismaClient'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { FileService } from '@/common/service/file'
import { T_GovernmentId, Z_AddGovernmentId } from '@repo/contract'
import { ResponseService } from '@/common/service/response'

const response = new ResponseService()
const fileService = new FileService()

export const getPersonalInfo = async (req: Request, res: Response) => {
  try {
    const getPersonalInfo = await prisma.guests.findFirst({
      where: { userId: Number(req?.params?.userId) },
      include: {
        User: true,
        emergencyContacts: true,
        Address: true,
      },
    })
    const modifyPersonInfo = {
      ...getPersonalInfo,
      confirm: getPersonalInfo?.confirm
        ? JSON.parse(getPersonalInfo?.confirm)
        : null,
      governmentId: getPersonalInfo?.governmentId
        ? JSON.parse(getPersonalInfo.governmentId)
        : null,
    }
    if (getPersonalInfo !== null) {
      res.json(
        response.success({
          item: modifyPersonInfo,
        })
      )
    } else {
      res.json(response.success({ message: 'No data found' }))
    }
  } catch (err: any) {
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
      phoneNumber,
      confirm,
    } = req.body
    const userId = Number(req.params.userId)
    const editPersonalInfo = await prisma.guests.update({
      where: {
        userId: userId,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        birthDate: birthDate,
        governmentId: governmentId,
        cellPhone: phoneNumber,
        confirm: JSON.stringify(confirm),
      },
    })
    res.json(
      response.success({
        item: editPersonalInfo,
        message: 'Successfully updated',
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addEmergencyContact = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, name, relationship } = req.body
    const personalInfoId = Number(req.params.personalInfoId)
    if (name && relationship && (email || phoneNumber)) {
      const getPersonalInfo = await prisma.guests.findFirst({
        where: {
          id: personalInfoId,
          deletedAt: null,
        },
      })

      if (getPersonalInfo) {
        const newEmergencyContact = await prisma.emergencyContacts.create({
          data: {
            peronalInfoId: personalInfoId,
            email: email,
            phoneNumber: phoneNumber,
            name: name,
            relationship: relationship,
          },
        })

        res.json(
          response.success({
            item: newEmergencyContact,
            message: 'Emergency Contact Successfully Added',
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

export const removeEmergencyContact = async (req: Request, res: Response) => {
  const personId = Number(req.params.peronalInfoId)
  const emergencyContactId = Number(req.params.emergencyContactId)
  try {
    const personalInfo = await prisma.guests.findFirst({
      where: {
        id: personId,
      },
    })
    if (personalInfo !== null) {
      const personInfoId = personalInfo.id
      const emergencyContactExist =
        (await prisma.emergencyContacts.findFirst({
          where: {
            id: emergencyContactId,
            peronalInfoId: personInfoId,
          },
        })) !== null
      if (emergencyContactExist) {
        const deleteEmergencyContact = await prisma.emergencyContacts.delete({
          where: {
            id: emergencyContactId,
            peronalInfoId: personInfoId,
          },
        })
        res.json(
          response.success({
            item: deleteEmergencyContact,
            message: 'Sucessfully deleted emergency contact',
          })
        )
      } else {
        res.json(
          response.error({ message: 'Emergency contact already deleted' })
        )
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addAddress = async (req: Request, res: Response) => {
  try {
    const { country, streetAddress, city, stateProvince, aptSuite, zipCode } =
      req.body
    const personalInfoId = Number(req.params.personalInfoId)
    if ((streetAddress && city && stateProvince) || (aptSuite && zipCode)) {
      const getPersonalInfo = await prisma.guests.findFirst({
        where: {
          id: personalInfoId,
          deletedAt: null,
        },
        include: {
          Address: true,
        },
      })

      if (getPersonalInfo) {
        let returnAddress = null
        if (getPersonalInfo.Address === null) {
          const newAddress = await prisma.addresses.create({
            data: {
              peronalInfoId: personalInfoId,
              country: country,
              streetAddress: streetAddress,
              city: city,
              aptSuite: aptSuite,
              stateProvince: stateProvince,
              zipCode: zipCode,
            },
          })
          returnAddress = newAddress
        } else {
          const updateAddress = await prisma.addresses.update({
            where: {
              peronalInfoId: getPersonalInfo.id,
              id: getPersonalInfo.Address?.id | 0,
            },
            data: {
              streetAddress: streetAddress,
              city: city,
              stateProvince: stateProvince,
              country: country,
              aptSuite: aptSuite,
              zipCode: zipCode,
            },
          })
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
  const userId = Number(req.params.userId)
  try {
    if (
      (streetAddress && city && stateProvince) ||
      (aptSuite && zipCode && country)
    ) {
      const personalInfo = await prisma.guests.findUnique({
        where: {
          userId: userId,
        },
        include: {
          Address: true,
        },
      })
      if (personalInfo) {
        const updateAddress = await prisma.addresses.update({
          where: {
            peronalInfoId: personalInfo.id,
            id: personalInfo.Address?.id,
          },
          data: {
            streetAddress: streetAddress,
            city: city,
            stateProvince: stateProvince,
            aptSuite: aptSuite,
            country: country,
            zipCode: zipCode,
          },
        })
        res.json(
          response.success({
            item: updateAddress,
            message: 'Address successfully updated',
          })
        )
      } else {
        res.json(response.error({ message: USER_NOT_EXIST }))
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

export const getAllGovernmentIdByPersonInfoId = async (
  req: Request,
  res: Response
) => {
  const personId = Number(req.params.peronalInfoId)
  try {
    const getPersonInfoId = await prisma.guests.findUnique({
      where: {
        id: personId,
      },
    })
    if (getPersonInfoId) {
      res.json(
        response.success({
          items: JSON.parse(getPersonInfoId?.governmentId as string),
          allItemCount:
            getPersonInfoId?.governmentId === null
              ? 0
              : JSON.parse(getPersonInfoId?.governmentId as string).length,
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

export const addGovernmentId = async (req: Request, res: Response) => {
  const peronalInfoId = Number(req.params.peronalInfoId)
  const files = req.files
  const isValidInput = Z_AddGovernmentId.safeParse(req.body)
  if (isValidInput.success && files) {
    const { type } = req.body
    try {
      const getPersonIfo = await prisma.guests.findUnique({
        where: {
          id: peronalInfoId,
        },
      })
      if (getPersonIfo) {
        if (getPersonIfo.governmentId === null) {
          const upload = await fileService.upload({ files })
          const addNewGovernmentId = await prisma.guests.update({
            where: {
              id: peronalInfoId,
            },
            data: {
              governmentId: JSON.stringify([
                { fileKey: upload.key, type: type, createdAt: new Date() },
              ] as T_GovernmentId[]),
            },
          })

          res.json(
            response.success({
              items: JSON.parse(
                addNewGovernmentId.governmentId as string
              ) as T_GovernmentId[],
              message: 'Government Id successfully added',
            })
          )
        } else {
          const updatedGovernmentId = JSON.parse(
            getPersonIfo.governmentId
          ) as T_GovernmentId[]
          const typeAlreadyExists = updatedGovernmentId.some(
            (govId: T_GovernmentId) => govId.type === type
          )

          //
          if (!typeAlreadyExists) {
            if (updatedGovernmentId.length < 2) {
              const upload = await fileService.upload({ files })
              updatedGovernmentId.push({
                fileKey: upload.key,
                type: type,
                createdAt: new Date(),
              })
              const updateGovId = await prisma.guests.update({
                where: {
                  id: peronalInfoId,
                },
                data: {
                  governmentId: JSON.stringify(updatedGovernmentId),
                },
              })
              res.json(
                response.success({
                  items: JSON.parse(
                    updateGovId.governmentId as string
                  ) as T_GovernmentId[],
                  message: 'Government Id successfully added',
                })
              )
            } else {
              res.json(
                response.error({
                  message: '2 Government IDs are allowed',
                })
              )
            }
          } else {
            res.json(
              response.error({
                message: 'This type of Id already exists',
              })
            )
          }
          //
        }
      } else {
        res.json(
          response.error({
            message: 'This person not found in our system',
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message,
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

export const updateLanguage = async (req: Request, res: Response) => {
  const personalInfoId = Number(req.params.personalInfoId)
  const { language } = req.body
  try {
    if (!language) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    const getPersonalInfo = await prisma.guests.findFirst({
      where: {
        id: personalInfoId,
      },
    })
    if (!getPersonalInfo) {
      return res.json(response.error({ message: 'Personal info not found' }))
    }
    const updateUserLanguage = await prisma.guests.update({
      where: {
        id: personalInfoId,
      },
      data: {
        language: language,
      },
    })
    res.json(
      response.success({
        item: updateUserLanguage,
        allItemCount: 1,
        message: 'Language successfully updated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const updateCurrency = async (req: Request, res: Response) => {
  const personalInfoId = Number(req.params.personalInfoId)
  const { currency } = req.body
  try {
    if (!currency) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    const getPersonalInfo = await prisma.guests.findFirst({
      where: {
        id: personalInfoId,
      },
    })
    if (!getPersonalInfo) {
      return res.json(response.error({ message: 'Personal info not found' }))
    }
    const updateUserCurrency = await prisma.guests.update({
      where: {
        id: personalInfoId,
      },
      data: {
        currency: currency,
      },
    })
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

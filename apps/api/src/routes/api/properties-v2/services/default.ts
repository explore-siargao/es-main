import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const addProperty = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
  try {
    const newProperty = new dbProperties({
      offerBy: hostId,
      status: 'Incomplete',
      finishedSections: [],
      title: '',
      description: '',
      currency: null,
      primaryLanguage: null,
      phone: null,
      email: null,
      location: null,
      checkInTime: null,
      checkOutTime: null,
      isLateCheckOutAllowed: false,
      lateCheckOutType: null,
      lateCheckOutValue: null,
      termsAndConditions: null,
      taxId: null,
      taxId2: null,
      companyLegalName: null,
      type: null,
      facilities: [],
      policies: [],
      bookableUnits: [],
      reservations: [],
    })
    await newProperty.save()
    res.json(
      response.success({
        item: newProperty,
        message: 'New property added successfully',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

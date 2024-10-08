import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

enum PropertyType {
  HOSTEL = 'HOSTEL',
  APARTMENT = 'APARTMENT',
  HOMESTAY = 'HOMESTAY',
  HOTEL = 'HOTEL',
  RESORT = 'RESORT',
  VILLA = 'WHOLE_PLACE',
}

export const addPropertyType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const type: string = req.body.type
  if (!hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (!type) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (
        !Object.values(PropertyType).includes(
          type.toUpperCase() as PropertyType
        )
      ) {
        res.json(response.error({ message: 'Invalid property type' }))
      } else {
        const newProperty = new dbProperties({
          offerBy: hostId,
          status: 'Incomplete',
          finishedSections: [],
          title: '',
          description: '',
          currency: '',
          primaryLanguage: '',
          photos: [],
          phone: '',
          email: '',
          location: null,
          checkInTime: null,
          checkOutTime: null,
          isLateCheckOutAllowed: false,
          lateCheckOutType: null,
          lateCheckOutValue: 0,
          termsAndConditions: null,
          taxId: null,
          taxId2: null,
          companyLegalName: '',
          type: type,
          facilities: [],
          policies: [],
          bookableUnits: [],
          reservations: [],
        })
        await newProperty.save()

        res.json(
          response.success({
            item: { type: type },
            message: 'Property Type successfully added',
          })
        )
      }
    }
  }
}

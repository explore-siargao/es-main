import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { properties } from './jsons/property'

enum PropertyType {
  HOSTEL = 'HOSTEL',
  APARTMENT = 'APARTMENT',
  HOMESTAY = 'HOMESTAY',
  HOTEL = 'HOTEL',
  RESORT = 'RESORT',
  VILLA = 'VILLA',
}

const response = new ResponseService()

export const addPropertyType = async (req: Request, res: Response) => {
  const hostId = Number(res.locals.user.id)
  const type: string = req.body.type
  if (!hostId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!type) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  if (
    !Object.values(PropertyType).includes(type.toUpperCase() as PropertyType)
  ) {
    return res.json(response.error({ message: 'Invalid property type' }))
  }

  properties.push({
    id: 10,
    hostId: 4,
    Host: {
      id: 4,
      firstName: 'Richard',
      lastName: 'Dela pena',
    },
    status: 'Incomplete',
    finishedSections: '[]',
    name: '',
    description: '',
    currency: '',
    primaryLanguage: '',
    Photos: [],
    phone: '',
    email: '',
    Location: {
      street: '',
      barangay: '',
      city: '',
      latitude: 0,
      longitude: 0,
      howToGetThere: '',
    },
    checkInTime: '',
    checkOutTime: '',
    lateCheckOutAllowed: false,
    lateCheckOutType: '',
    lateCheckoutValue: 0,
    termsAndConditions: '',
    taxId: 0,
    taxId2: 0,
    companyLegalName: '',
    type: type,
    Facilities: [],
    Policies: [
      {
        id: 1,
        category: 'ThingsToKnow',
        index: 1,
        policy: 'No pets allowed',
        reason: null,
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 2,
        index: 5,
        category: 'ThingsToKnow',
        policy: 'Quiet hours',
        reason: 'Respect for Others',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 3,
        index: 9,
        category: 'AdditionalRules',
        policy: 'Custom rule 1',
        reason: 'because of reason',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 4,
        index: 7,
        category: 'AdditionalRules',
        policy: 'Custom rule 2',
        reason: 'because of reason',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 5,
        index: 12,
        category: 'SafetyConsideration',
        policy: 'Not suitable for children',
        reason:
          'Certain activities or environments may be too complex or challenging for children',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 6,
        index: 15,
        category: 'SafetyConsideration',
        policy: 'Safety Hazards',
        reason:
          'Some environments or activities may pose safety risks to children due to hazards such as sharp objects, high places, heavy machinery, or dangerous substances',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 7,
        index: 18,
        category: 'SafetyDevices',
        policy: 'Sharp Objects',
        reason:
          'Devices with sharp edges or pointed parts may pose a risk of cuts or puncture injuries to children if mishandled or used improperly',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 8,
        index: 19,
        category: 'SafetyDevices',
        policy: 'Small Parts',
        reason:
          'Devices containing small parts or components that can be detached may pose a choking hazard to young children who may put them in their mouths',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 9,
        index: 13,
        category: 'PropertyInfo',
        policy: 'Fire Safety',
        reason:
          'Information about fire safety measures in the property, including the location of fire exits, fire extinguishers, smoke detectors, and emergency evacuation procedures.',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 10,
        index: 17,
        category: 'PropertyInfo',
        policy: 'Security Measures',
        reason:
          'Details about security features in the property, such as locks on doors and windows, security cameras, alarm systems, and any neighborhood watch programs.',
        propertyId: 1,
        isSelected: false,
      },
      {
        id: 2,
        index: 3,
        category: 'Things To Know',
        policy: 'No parties or events',
        reason: null,
        propertyId: 1,
        isSelected: true,
      },
      {
        id: 10,
        index: 22,
        category: 'Property Info',
        policy: 'No wheelchair access',
        reason:
          'Details about security features in the property, such as locks on doors and windows, security cameras, alarm systems, and any neighborhood watch programs.',
        propertyId: 1,
        isSelected: true,
      },
    ],
    BookableUnit: [],
    reservation: [],
  })

  res.json(
    response.success({
      item: { type: type },
      message: 'Property Type successfully added',
    })
  )
}

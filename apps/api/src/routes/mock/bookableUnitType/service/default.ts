import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { bookableUnitTypes } from './jsons/bookableUnitType'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'
import { Z_BookableUnitTypes } from '@repo/contract'
const response = new ResponseService()

export const getBookableUnitTypeById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const getBookableUnitType = bookableUnitTypes.find((item) => item.id === id)
  if (!getBookableUnitType) {
    return res.json(response.error({ message: 'No data found' }))
  }
  res.json(response.success({ item: getBookableUnitType }))
}

export const getBookableUnitTypeByHost = async (
  req: Request,
  res: Response
) => {
  const hostId = Number(req.params.hostId)
  const getBookableUnitTypeByHostId = bookableUnitTypes.filter((item) => {
    return item.hostId === hostId
  })
  if (getBookableUnitTypeByHostId.length === 0) {
    return res.json(
      response.success({
        items: getBookableUnitTypeByHostId,
        allItemCount: getBookableUnitTypeByHostId.length,
        message: 'No data found',
      })
    )
  }
  res.json(
    response.success({
      items: getBookableUnitTypeByHostId,
      allItemCount: getBookableUnitTypeByHostId.length,
    })
  )
}

export const addBookableUnitType = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const {
    category,
    name,
    description,
    maxGuests,
    adultsIncluded,
    childrenIncluded,
    isMultiroomUnit,
    numBedrooms,
    minNightlyRate,
    totalSizeSqm,
    additionalPricePerPerson,
    thresholdOccupancyForAdditionalCharge,
  } = req.body
  const isValidInput = Z_BookableUnitTypes.safeParse(req.body)
  if (!hostId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!isValidInput.success) {
    return res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
  const hostData = {
    id: 2,
    firstName: 'John',
    lastName: 'Lindico',
  }
  const bookableUnitTypeData = {
    id: 15,
    hostId: hostId,
    Host: hostData,
    category: category,
    name: name,
    description: description,
    isPrivate: false,
    maxGuest: maxGuests,
    adultsIncluded: adultsIncluded,
    childrenIncluded: childrenIncluded,
    isMultiroomUnit: isMultiroomUnit,
    photos: [
      {
        id: 1,
        key: '1.jpgs',
        thumbKey: '1.jpg',
        caption: 'Bed Photo',
      },
      {
        id: 2,
        key: '2.jpgs',
        thumbKey: '2.jpg',
        caption: 'Bed Photo',
      },
    ],
    features: [
      {
        id: 1,
        feature: 'Single Bed',
      },
      {
        id: 2,
        feature: 'for 4 persons',
      },
    ],
    bedconfigs: [
      {
        id: 1,
        roomName: 'Yahoo room',
        bedType: 'Single Bed',
        bedQty: 1,
      },
    ],
    numBedrooms: numBedrooms,
    minNightlyRate: minNightlyRate,
    totalSizeSqm: totalSizeSqm,
    additionalPricePerPerson: additionalPricePerPerson,
    thresholdOccupancyForAdditionalCharge:
      thresholdOccupancyForAdditionalCharge,
  }
  //@ts-ignore
  bookableUnitTypes.push(bookableUnitTypeData)
  res.json(
    response.success({
      item: bookableUnitTypeData,
      message: 'Bookable Unit Type successfully added',
    })
  )
}

export const updateBookableUnitTypeById = async (
  req: Request,
  res: Response
) => {
  const hostId = Number(req.params.hostId)
  const id = Number(req.params.id)
  const {
    category,
    name,
    description,
    isPrivate,
    maxGuests,
    adultsIncluded,
    childrenIncluded,
    isMultiroomUnit,
    numBedrooms,
    minNightlyRate,
    totalSizeSqm,
    additionalPricePerPerson,
    thresholdOccupancyForAdditionalCharge,
  } = req.body
  if (!hostId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (
    !category &&
    !name &&
    !description &&
    !maxGuests &&
    !isPrivate &&
    !adultsIncluded &&
    !childrenIncluded &&
    !isMultiroomUnit &&
    !numBedrooms &&
    !minNightlyRate &&
    !totalSizeSqm &&
    !additionalPricePerPerson &&
    !thresholdOccupancyForAdditionalCharge
  ) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const findBookableUnitType = bookableUnitTypes.findIndex(
    (item) => item.id === id
  )
  if (findBookableUnitType === -1) {
    return res.json(
      response.error({
        message: 'Bookable Unit Type not exist or its already deleted',
      })
    )
  }
  const bookableUnitTypeDataUpdate = {
    ...bookableUnitTypes[findBookableUnitType],
    category: category,
    name: name,
    description: description,
    maxGuests: maxGuests,
    isPrivate: isPrivate,
    adultsIncluded: adultsIncluded,
    childrenIncluded: childrenIncluded,
    isMultiroomUnit: isMultiroomUnit,
    numBedrooms: numBedrooms,
    minNightlyRate: minNightlyRate,
    totalSizeSqm: totalSizeSqm,
    additionalPricePerPerson: additionalPricePerPerson,
    thresholdOccupancyForAdditionalCharge:
      thresholdOccupancyForAdditionalCharge,
  }
  //@ts-ignore
  bookableUnitTypes[findBookableUnitType] = bookableUnitTypeDataUpdate

  res.json(
    response.success({
      item: bookableUnitTypes[findBookableUnitType],
      message: 'Bookable Unit Type successfully updated',
    })
  )
}

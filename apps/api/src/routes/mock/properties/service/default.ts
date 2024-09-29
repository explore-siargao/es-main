import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { ResponseService } from '@/common/service/response'
import {
  T_BookableUnitType,
  T_UpdatePropertyAddress,
  Z_Property,
} from '@repo/contract'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'

const response = new ResponseService()

const categoryEnum = {
  BED: 'Bed',
  ROOM: 'Room',
  WHOLEPLACE: 'Whole-Place',
}

export const getPropertyByMainGuestId = async (req: Request, res: Response) => {
  const mainGuestId = Number(req.params.mainGuestId)
  const filterProperties = properties.filter((property) =>
    property.reservation.some(
      (reservation) => reservation.mainGuestId === mainGuestId
    )
  )
  const filteredProperties = filterProperties
    .map((property) => ({
      ...property,
      reservation: property.reservation.filter(
        (reservation) => reservation.mainGuestId === mainGuestId
      ),
    }))
    .filter((property) => property.reservation.length > 0)
  res.json(
    response.success({
      items: filteredProperties,
    })
  )
}

export const getPropertiesByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const filterProperties = properties
    .filter((property) => property.hostId === hostId)
    .reverse()
  res.json(
    response.success({
      items: filterProperties,
    })
  )
}

export const getPropertyType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const propertyType = properties.find(
    (item) => item.id === propertyId && item.hostId === hostId
  )?.type
  res.json(response.success({ item: { propertyType: propertyType } }))
}

export const getPropertyByHostId = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const filteredProperties = properties.filter((item) => {
    return hostId === item.Host.id
  })
  res.json(
    response.success({
      items: filteredProperties,
      allItemCount: filteredProperties.length,
    })
  )
}

export const getPropertyById = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const property = properties.find((item) => item.id === propertyId)
  res.json(response.success({ item: property }))
}

export const oldAddProperty = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const {
    name,
    description,
    currency,
    primaryLanguage,
    phone,
    email,
    Location,
    checkInTime,
    checkOutTime,
    lateCheckOutAllowed,
    lateCheckOutType,
    propertyLateCheckoutValue,
    termsAndConditions,
    taxId,
    taxId2,
    companyLegalName,
    type,
  } = req.body

  const isValidInput = Z_Property.safeParse(req.body)
  if (!hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!isValidInput.success) {
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }

  const Photos = [
    {
      id: 1,
      thumbKey: '1.jpg',
      key: '2.jpg',
      caption: 'Outside view',
    },
    {
      id: 2,
      thumbKey: '3.jpg',
      key: '4.jpg',
      caption: 'Interior view',
    },
  ]

  const Amenities = [
    {
      id: 1,
      amenity: 'Free WiFi',
    },
    {
      id: 2,
      amenity: 'Free Coffee',
    },
  ]

  const bookableUnit = [
    {
      id: 1,
      bookableUnitTypeId: 1,
      propertyId: 1,
      BookableUnitType: {
        id: 1,
        Category: 'Bed in Room',
        Name: 'Amazing Room',
        Description: 'Clean and big room',
        isPrivate: true,
        maxGuests: 10,
        adultsIncluded: 5,
        childrenIncluded: 4,
        isMultiroomUnit: false,
        photos: [
          {
            id: 1,
            key: '1.jpg',
            thumbKey: '1.jpg',
            caption: 'Bed Photo',
          },
          {
            id: 2,
            key: '2.jpg',
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
        numBedrooms: 10,
        numBathrooms: 6,
        minNightlyRate: 1050.75,
        totalSizeSqm: 36.75,
        additionalPricePerPerson: 370.75,
        thresholdOccupancyForAdditionalCharge: 299.5,
      },
    },
  ]

  const host = {
    id: hostId,
    firstName: 'Lebron',
    lastName: 'James',
  }

  const propertyData = {
    id: 10,
    hostId: hostId,
    offerBy: host,
    name: name,
    description: description,
    currency: currency,
    primaryLanguage: primaryLanguage,
    Photos: Photos,
    phone: phone,
    email: email,
    Location: Location,
    checkInTime: checkInTime,
    checkOutTime: checkOutTime,
    lateCheckOutAllowed: lateCheckOutAllowed,
    lateCheckOutType: lateCheckOutType,
    propertyLateCheckoutValue: propertyLateCheckoutValue,
    termsAndConditions: termsAndConditions,
    PropertyAmenities: Amenities,
    taxId: taxId,
    taxId2: taxId2,
    companyLegalName: companyLegalName,
    type: type,
    BookableUnit: bookableUnit,
  }

  //@ts-ignore
  const newProperty = properties.push(propertyData)
  res.json(
    response.success({
      item: propertyData,
      message: 'New property added successfully',
    })
  )
}

export const addProperty = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!hostId || !isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const host = {
    id: hostId,
    firstName: res.locals.user.firstName,
    lastName: res.locals.user.lastName,
  }
  const propertyData = {
    id: properties.length + 1,
    hostId: hostId,
    offerBy: host,
    finishedSections: `[]`,
    status: 'Incomplete',
  }
  //@ts-ignore
  properties.push(propertyData)
  res.json(
    response.success({
      item: propertyData,
      message: 'New property added successfully',
    })
  )
}

export const updatePropertyType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const propertyIndex = properties.findIndex(
    (item) => item.hostId === hostId && item.id === propertyId
  )
  if (propertyIndex === -1) {
    res.json(
      response.error({
        message: 'Property not found for the given host id and property id',
      })
    )
  }
  // @ts-expect-error
  properties[propertyIndex].finishedSections = '["type"]'
  // @ts-expect-error
  properties[propertyIndex].type = req.body.type
  res.json(
    response.success({
      message: 'Property type updated',
      item: properties[propertyIndex],
    })
  )
}

export const updateProperty = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const propertyId = Number(req.params.id)
  const propertyIndex = properties.findIndex(
    (item) => item.hostId === hostId && item.id === propertyId
  )
  if (propertyIndex === -1) {
    res.json(
      response.error({
        message: 'Property not found for the given host id and property id',
      })
    )
  }
  const updatedProperty = { ...properties[propertyIndex], ...req.body }
  properties[propertyIndex] = updatedProperty
  res.json(
    response.success({
      message: 'Property updated successfully',
      item: updatedProperty,
    })
  )
}

export const deleteProperty = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = Number(req.params.propertyId)

    const propertyIndex = properties.findIndex(
      (property) => property.id === id && hostId === property.hostId
    )
    if (propertyIndex === -1 || propertyIndex === 0) {
      res.json(
        response.error({
          message: 'Property not found for the given host ID and ID',
        })
      )
    }

    if (properties[propertyIndex]?.hostId !== hostId) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    properties.splice(propertyIndex, 1)

    res.json(
      response.success({
        message: 'Property deleted successfully',
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

export const getPropertyInfo = async (req: Request, res: Response) => {
  const hostId = Number(res.locals.user?.id)
  const id = Number(req.params.propertyId)
  const findPropertyInfo = properties.find(
    (item) => item.id === id && hostId === item.hostId
  )
  const getPropertyInfo = {
    type: findPropertyInfo?.type,
    name: findPropertyInfo?.name,
    description: findPropertyInfo?.description,
    phone: findPropertyInfo?.phone,
    email: findPropertyInfo?.email,
  }
  res.json(response.success({ item: getPropertyInfo }))
}

export const getPropertyPhotos = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = Number(req.params.propertyId)
  if (!hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const findPropertyInfo = properties.find(
    (item) => item.id === id && hostId === item.hostId
  )
  const getPropertyPhotos = {
    Photos: findPropertyInfo?.Photos,
  }
  res.json(response.success({ items: getPropertyPhotos.Photos }))
}

export const getPropertyLocation = async (req: Request, res: Response) => {
  const hostId = 2
  const id = Number(req.params.id)
  const findPropertyInfo = properties.find((item) => item.id === id)
  const getPropertyAddress = {
    Location: findPropertyInfo?.Location,
  }
  res.json(response.error({ item: getPropertyAddress.Location }))
}

export const updatePropertyBasicInfo = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const { name, description } = req.body
  if (!name && !description) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const findPropertyIndex = properties.findIndex(
    (item) => item.id === propertyId
  )
  if (findPropertyIndex === -1) {
    res.json(response.error({ message: 'Property not found' }))
  }
  if (name !== undefined) {
    //@ts-ignore
    properties[findPropertyIndex].name = name
  }
  if (description !== undefined) {
    //@ts-ignore
    properties[findPropertyIndex].description = description
  }
  // @ts-expect-error
  properties[findPropertyIndex].finishedSections = '["type", "basicInfo"]'
  res.json(
    response.success({
      item: properties[findPropertyIndex],
      message: 'Property basic info updated',
    })
  )
}

export const updatePropertyPhotos = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = Number(req.params.propertyId)
  const photos = req.body.photos
  // const file = req.files
  if (!hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  // if (!file) {
  //   res.json(response.error({ message: 'No file found' }))
  // }
  const findPropertyIndex = properties.findIndex((item) => item.id === id)
  if (findPropertyIndex === -1) {
    res.json(response.error({ message: 'Property not found' }))
  }

  if (properties[findPropertyIndex]?.hostId !== hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const removeFileKey = photos.map((photo: any) => {
    return {
      ...photo,
      file: null,
    }
  })

  properties[findPropertyIndex]!.Photos = [...removeFileKey]
  res.json(
    response.success({
      items: properties[findPropertyIndex]?.Photos,
      message: 'Property photos updated',
    })
  )
}

export const updatePropertyLocation = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const {
    street,
    barangay,
    city,
    longitude,
    latitude,
    howToGetThere,
  }: T_UpdatePropertyAddress = req.body
  if (
    !street &&
    !barangay &&
    !city &&
    !longitude &&
    !latitude &&
    !howToGetThere
  ) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const findPropertyIndex = properties.findIndex(
    (item) => item.id === propertyId
  )
  if (findPropertyIndex === -1) {
    res.json(response.error({ message: 'Property not found' }))
  }
  if (properties[findPropertyIndex]?.Location) {
    if (street !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.street = street
    }
    if (barangay !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.barangay = barangay
    }

    if (city !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.city = city
    }
    if (longitude !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.longitude = longitude
    }
    if (howToGetThere !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.howToGetThere = howToGetThere
    }

    if (latitude !== undefined) {
      //@ts-ignore
      properties[findPropertyIndex].Location.latitude = latitude
    }
  } else {
    const property = { ...properties[findPropertyIndex] }
    const data = {
      ...property,
      Location: {
        street,
        barangay,
        city,
        longitude,
        latitude,
        howToGetThere,
      },
    }
    // @ts-expect-error
    properties[findPropertyIndex] = data
  }
  // @ts-expect-error
  properties[findPropertyIndex].finishedSections =
    '["type", "basicInfo", "location"]'
  res.json(
    response.success({
      item: properties[findPropertyIndex],
      message: 'Property location updated',
    })
  )
}

export const updatePropertyFacilities = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const { facilities } = req.body
  if (!facilities) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const findPropertyIndex = properties.findIndex(
    (item) => item.id === propertyId
  )
  if (findPropertyIndex === -1) {
    res.json(response.error({ message: 'Property not found' }))
  }

  const property = { ...properties[findPropertyIndex] }
  const data = {
    ...property,
    Facilities: facilities,
  }
  // @ts-expect-error
  properties[findPropertyIndex] = data

  // @ts-expect-error
  properties[findPropertyIndex].finishedSections =
    '["type", "basicInfo", "location", "facilities", "units"]'
  res.json(
    response.success({
      item: properties[findPropertyIndex],
      message: 'Property facilities updated',
    })
  )
}

export const getPropertiesBookableUnits = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const category = String(req.params.category)
  const id = Number(req.params.propertyId)
  const findProperty = properties.find(
    (item) => item.id === id && item.hostId === hostId
  )
  const getPropertyBookableunits = findProperty?.BookableUnit

  const filterByCategory = (category: string) => {
    return getPropertyBookableunits?.filter(
      (item) =>
        item.BookableUnitType.category.toLocaleLowerCase() ===
        category.toLocaleLowerCase()
    )
  }

  if (
    category.toLowerCase() !== categoryEnum.BED.toLowerCase() &&
    category.toLowerCase() !== categoryEnum.ROOM.toLowerCase() &&
    category.toLowerCase() !== categoryEnum.WHOLEPLACE.toLowerCase()
  ) {
    res.json(response.error({ message: 'Not valid category' }))
  }

  const filterUnits = filterByCategory(category)?.map((item) => ({
    BookableUnitType: item.BookableUnitType,
  }))

  const units = filterUnits?.map(
    //@ts-ignore
    (unit: any) => ({
      id: unit.BookableUnitType.id,
      name: unit.BookableUnitType.name,
      description: unit.BookableUnitType.description,
      totalSize: unit.BookableUnitType.totalSize,
      Photo: unit.BookableUnitType.Photo,
      qty: unit.BookableUnitType.qty,
    })
  )
  res.json(
    response.success({
      //@ts-ignore
      items: units,
      //@ts-ignore
      allItemCount: filterUnits[0]?.BookableUnitType.length,
    })
  )
}

//Add whole place
export const addWholePlaceUnit = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const {
    name,
    numBedrooms,
    numBathrooms,
    bedConfig,
    totalSize,
    amenities,
    qty,
  } = req.body
  const newBookableUnitType = {
    id: 100,
    propertyId: propertyId,
    BookableUnitType: {
      id: 100,
      category: 'Whole-Place',
      name: name,
      description: '',
      numBedrooms: numBedrooms,
      numBathrooms: numBathrooms,
      BedConfigs: bedConfig,
      amenities: amenities,
      totalSize: totalSize,

      Photo: {
        id: 100,
        thumbKey: '5.jpg',
        key: '5.jpg',
        description: '',
        tags: '',
      },
      isPrivate: false,
      maxGuest: 5,
      adultsIncluded: 2,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      qty: qty,
    },
  }
  const findBookableUnit = properties.find(
    (item) => item.id === propertyId && hostId === item.hostId
  )?.BookableUnit
  //@ts-ignore
  findBookableUnit.push(newBookableUnitType)
  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Whole Place Successfully added',
    })
  )
}

//add Room
export const addRoomUnit = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const { name, bedConfig, totalSize, amenities, qty } = req.body

  const hostId = Number(res.locals.user?.id)
  const newBookableUnitType = {
    id: 300,
    propertyId: propertyId,
    BookableUnitType: {
      id: 300,
      category: 'Room',
      name: name,
      description: '',
      BedConfigs: bedConfig,
      amenities: amenities,
      totalSize: totalSize,
      Photo: {
        id: 100,
        thumbKey: '5.jpg',
        key: '5.jpg',
        description: '',
        tags: '',
      },
      isPrivate: false,
      maxGuest: 5,
      adultsIncluded: 2,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      qty: qty,
    },
  }
  const findBookableUnit = properties.find(
    (item) => item.id === propertyId && hostId === item.hostId
  )?.BookableUnit
  //@ts-ignore
  findBookableUnit.push(newBookableUnitType)
  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Room Successfully added',
    })
  )
}

//add Bed
export const addBedUnit = async (req: Request, res: Response) => {
  const hostId = Number(res.locals.user.id)
  const propertyId = Number(req.params.propertyId)
  const { name, bedConfig, amenities, qty } = req.body
  const newBookableUnitType = {
    id: 200,
    propertyId: propertyId,
    BookableUnitType: {
      id: 200,
      category: 'Bed',
      name: name,
      description: '',
      BedConfigs: bedConfig,
      amenities: amenities,
      totalSize: null,
      Photo: {
        id: 100,
        thumbKey: '5.jpg',
        key: '5.jpg',
        description: '',
        tags: '',
      },
      isPrivate: false,
      maxGuest: 1,
      adultsIncluded: 1,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      qty: qty,
    },
  }
  const findBookableUnit = properties.find(
    (item) => item.id === propertyId && hostId === item.hostId
  )?.BookableUnit
  //@ts-ignore
  findBookableUnit.push(newBookableUnitType)
  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Bed Successfully added',
    })
  )
}

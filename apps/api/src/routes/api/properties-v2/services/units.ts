import { ResponseService } from '@/common/service/response'
import { dbBookableUnitTypes, dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

const categoryEnum = {
  BED: 'Bed',
  ROOM: 'Room',
  WHOLEPLACE: 'Whole-Place',
}

//Add whole place
export const addWholePlaceUnit = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId

  const newBookableUnitType = new dbBookableUnitTypes({
    category: 'Whole-Place',
    title: '',
    numBedRooms: 0,
    numBathRooms: 0,
    bedConfigs: [],
    amenities: [],
    totalSize: 0,
    photos: [],
    isPrivate: false,
    maxGuests: 0,
    adultsIncluded: 0,
    childrenIncluded: 0,
    description: '',
    isMultiRoomUnit: false,
    unitPrices: null,
    qty: 0,
  })
  await newBookableUnitType.save()

  await dbProperties.findByIdAndUpdate(
    propertyId,
    {
      $push: {
        bookableUnits: newBookableUnitType._id,
      },
      $set: {
        updatedAt: Date.now(),
      },
    },
    { new: true }
  )
  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Whole Place Successfully added',
    })
  )
}

//add Room
export const addRoomUnit = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const newBookableUnitType = new dbBookableUnitTypes({
    category: 'Room',
    title: '',
    description: '',
    bedConfigs: [],
    amenities: [],
    totalSize: 0,
    photos: [],
    isPrivate: false,
    maxGuests: 0,
    adultsIncluded: 0,
    childrenIncluded: 0,
    isMultiRoomUnit: false,
    qty: 0,
  })

  await newBookableUnitType.save()
  await dbProperties.findByIdAndUpdate(
    propertyId,
    {
      $push: {
        bookableUnits: newBookableUnitType._id,
      },
      $set: {
        updatedAt: Date.now(),
      },
    },
    { new: true }
  )

  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Room Successfully added',
    })
  )
}

//add Bed
export const addBedUnit = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId

  const newBookableUnitType = new dbBookableUnitTypes({
    category: 'Bed',
    title: '',
    description: '',
    bedConfigs: [],
    amenities: [],
    totalSize: null,
    photos: [],
    isPrivate: false,
    maxGuests: 0,
    adultsIncluded: 0,
    childrenIncluded: 0,
    isMultiRoomUnit: false,
    qty: 0,
  })
  await newBookableUnitType.save()
  await dbProperties.findByIdAndUpdate(
    propertyId,
    {
      $push: {
        bookableUnits: newBookableUnitType._id,
      },
      $set: {
        updatedAt: Date.now(),
      },
    },
    { new: true }
  )

  res.json(
    response.success({
      item: newBookableUnitType,
      message: 'BookableUnit Bed Successfully added',
    })
  )
}

export const getPropertiesBookableUnits = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const category = String(req.params.category)
  const propertyId = req.params.propertyId

  const findProperty = await dbProperties
    .findOne({
      _id: propertyId,
      offerBy: hostId,
      deletedAt: null,
    })
    .populate('bookableUnits')

  const getPropertyBookableunits = findProperty?.bookableUnits

  const filterByCategory = (category: string) => {
    return getPropertyBookableunits?.filter(
      (item) =>
        //@ts-ignore
        item?.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    )
  }

  if (
    category.toLowerCase() !== categoryEnum.BED.toLowerCase() &&
    category.toLowerCase() !== categoryEnum.ROOM.toLowerCase() &&
    category.toLowerCase() !== categoryEnum.WHOLEPLACE.toLowerCase()
  ) {
    return res.json(response.error({ message: 'Not valid category' }))
  }

  const filterUnits = filterByCategory(category)?.map((item: any) =>
    item.toObject()
  )

  const units = filterUnits?.filter((item) => ({ ...item }))

  res.json(response.success({ items: units, allItemCount: units?.length }))
}


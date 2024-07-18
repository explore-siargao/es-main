import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbBookableUnitTypes, dbProperties } from '@repo/database'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

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
    bedRooms: [],
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
    bedRooms: null,
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
    bedRooms: null,
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

export const updateBedUnitBasicInfo = async (req: Request, res: Response) => {
  const propertyId = new mongoose.Types.ObjectId(req.params.propertyId)
  const bookableUnitId = new mongoose.Types.ObjectId(req.params.bookableUnitId)
  const { title, description, qty } = req.body

  if (!title || !description || !qty) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  try {
    const getBookableUnitBed = await dbBookableUnitTypes.findOne({
      _id: bookableUnitId,
      category: 'Bed',
    })
    if (!getBookableUnitBed) {
      return res.json(response.error({ message: 'Bookable unit not found' }))
    }

    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })
    const findUnitInProperty =
      getProperty?.bookableUnits.includes(bookableUnitId)
    if (!findUnitInProperty) {
      return res.json(
        response.error({ message: 'Bookable unit not found in property' })
      )
    }

    const updateBedBasicInfo = await dbBookableUnitTypes.findOneAndUpdate(
      { _id: bookableUnitId, category: 'Bed', deletedAt: null },
      {
        $set: {
          title: title,
          description: description,
          qty: qty,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    )

    return res.json(
      response.success({
        item: updateBedBasicInfo,
        message: 'Bookable Unit basic info saved',
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

export const updateRoomUnitBasicInfo = async (req: Request, res: Response) => {
  const propertyId = new mongoose.Types.ObjectId(req.params.propertyId)
  const bookableUnitId = new mongoose.Types.ObjectId(req.params.bookableUnitId)
  const { title, description, totalSize, qty } = req.body

  if (!title || !description || !totalSize || !qty) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  try {
    const getBookableUnitRoom = await dbBookableUnitTypes.findOne({
      _id: bookableUnitId,
      category: 'Room',
    })
    if (!getBookableUnitRoom) {
      return res.json(response.error({ message: 'Bookable unit not found' }))
    }

    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })
    const findUnitInProperty =
      getProperty?.bookableUnits.includes(bookableUnitId)
    if (!findUnitInProperty) {
      return res.json(
        response.error({ message: 'Bookable unit not found in property' })
      )
    }

    const updateRoomBasicInfo = await dbBookableUnitTypes.findOneAndUpdate(
      { _id: bookableUnitId, category: 'Room', deletedAt: null },
      {
        $set: {
          title: title,
          description: description,
          totalSize: totalSize,
          qty: qty,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    )

    return res.json(
      response.success({
        item: updateRoomBasicInfo,
        message: 'Bookable Unit basic info saved',
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

export const updateWholePlaceUnitBasicInfo = async (
  req: Request,
  res: Response
) => {
  const propertyId = new mongoose.Types.ObjectId(req.params.propertyId)
  const bookableUnitId = new mongoose.Types.ObjectId(req.params.bookableUnitId)
  const { title, totalSize, numBedRooms, numBathRooms, bedRooms, qty } =
    req.body

  if (
    !title ||
    !numBedRooms ||
    !numBathRooms ||
    !totalSize ||
    !bedRooms ||
    !qty
  ) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  try {
    const getBookableUnitWholePlace = await dbBookableUnitTypes.findOne({
      _id: bookableUnitId,
      category: 'Whole-Place',
    })
    if (!getBookableUnitWholePlace) {
      return res.json(response.error({ message: 'Bookable unit not found' }))
    }

    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })
    const findUnitInProperty =
      getProperty?.bookableUnits.includes(bookableUnitId)
    if (!findUnitInProperty) {
      return res.json(
        response.error({ message: 'Bookable unit not found in property' })
      )
    }

    const updateWholePlaceBasicInfo =
      await dbBookableUnitTypes.findOneAndUpdate(
        { _id: bookableUnitId, category: 'Whole-Place', deletedAt: null },
        {
          $set: {
            title: title,
            totalSize: totalSize,
            numBedRooms: numBedRooms,
            numBathRooms: numBathRooms,
            bedRooms: bedRooms,
            qty: qty,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )

    return res.json(
      response.success({
        item: updateWholePlaceBasicInfo,
        message: 'Bookable Unit basic info saved',
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

export const getUnitById = async (req: Request, res: Response) => {
  const unitId = req.params.unitId
  try {
    const getUnit = await dbBookableUnitTypes
      .findOne({ _id: unitId, deletedAt: null })
      .populate('amenities')
      .populate('photos')
    if (!getUnit) {
      return res.json(response.error({ message: 'No bookable unit found' }))
    }
    res.json(response.success({ item: getUnit }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

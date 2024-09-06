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
    subtitle: '',
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
    isMultiRoomUnit: false,
    unitPrice: null,
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
    unitPrice: null,
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
    subtitle: '',
    isHaveSharedBathRoom: 'No',
    isSmokingAllowed: 'No',
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
    unitPrice: null,
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
  const {
    title,
    subtitle,
    qty,
    isHaveSharedBathRoom,
    isSmokingAllowed,
    totalSize,
  } = req.body

  if (
    !subtitle ||
    !qty ||
    !isHaveSharedBathRoom ||
    !isSmokingAllowed ||
    !totalSize
  ) {
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

    // Step 1: Retrieve the current document
    const currentBed = await dbBookableUnitTypes.findOne(
      { _id: bookableUnitId, category: 'Bed', deletedAt: null },
      { ids: 1 } // Only retrieve the ids field
    )

    if (!currentBed) {
      // Handle case where the document is not found
      return res.status(404).json({ error: 'Bed not found' })
    }

    // Step 2: Calculate the number of new ObjectIds needed
    const currentIdsCount = currentBed.ids.length
    const newIdsNeeded = qty - currentIdsCount

    let newIds: mongoose.Types.ObjectId[] = []
    if (newIdsNeeded > 0) {
      newIds = Array.from(
        { length: newIdsNeeded },
        () => new mongoose.Types.ObjectId()
      )
    }
    //Step 3
    const updateBedBasicInfo = await dbBookableUnitTypes.findOneAndUpdate(
      { _id: bookableUnitId, category: 'Bed', deletedAt: null },
      {
        $set: {
          title: title,
          subtitle: subtitle,
          qty: qty,
          isHaveSharedBathRoom: isHaveSharedBathRoom,
          isSmokingAllowed: isSmokingAllowed,
          totalSize: totalSize,
          updatedAt: Date.now(),
        },
        ...(newIdsNeeded > 0 && {
          $push: {
            ids: { $each: newIds },
          },
        }),
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
  const { title, subtitle, totalSize, description, qty } = req.body

  if (!subtitle || !totalSize || !qty || !description) {
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

    // Step 1: Retrieve the current document
    const currentRoom = await dbBookableUnitTypes.findOne(
      { _id: bookableUnitId, category: 'Room', deletedAt: null },
      { ids: 1 } // Only retrieve the ids field
    )

    if (!currentRoom) {
      // Handle case where the document is not found
      return res.status(404).json({ error: 'Room not found' })
    }

    // Step 2: Calculate the number of new ObjectIds needed
    const currentIdsCount = currentRoom.ids.length
    const newIdsNeeded = qty - currentIdsCount

    let newIds: mongoose.Types.ObjectId[] = []
    if (newIdsNeeded > 0) {
      newIds = Array.from(
        { length: newIdsNeeded },
        () => new mongoose.Types.ObjectId()
      )
    }

    // Step 3: Update the document by adding new ObjectIds
    const updateRoomBasicInfo = await dbBookableUnitTypes.findOneAndUpdate(
      { _id: bookableUnitId, category: 'Room', deletedAt: null },
      {
        $set: {
          title: title,
          subtitle: subtitle,
          description: description,
          totalSize: totalSize,
          qty: qty,
          updatedAt: Date.now(),
        },
        ...(newIdsNeeded > 0 && {
          $push: {
            ids: { $each: newIds },
          },
        }),
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
  const {
    title,
    subtitle,
    totalSize,
    numBathRooms,
    bedRooms,
    bedroomStudio,
    qty,
    livingRooms,
    singleBedRoom,
    singleLivingRoom,
  } = req.body
  if (
    !subtitle ||
    !numBathRooms ||
    !totalSize ||
    !bedRooms ||
    !qty ||
    !livingRooms
  ) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  try {
    const getBookableUnitWholePlace = await dbBookableUnitTypes.findOne({
      _id: bookableUnitId,
      category: 'Whole-Place',
    })
    if (!getBookableUnitWholePlace) {
      console.log('Bookable unit not found')
      return res.json(response.error({ message: 'Bookable unit not found' }))
    }

    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })
    const findUnitInProperty =
      getProperty?.bookableUnits.includes(bookableUnitId)
    if (!findUnitInProperty) {
      console.log('Bookable unit not found in property')
      return res.json(
        response.error({ message: 'Bookable unit not found in property' })
      )
    }

    // Step 1: Retrieve the current document
    const currentWholePlace = await dbBookableUnitTypes.findOne(
      { _id: bookableUnitId, category: 'Whole-Place', deletedAt: null },
      { ids: 1 } // Only retrieve the ids field
    )

    if (!currentWholePlace) {
      // Handle case where the document is not found
      return res.status(404).json({ error: 'Whole place not found' })
    }

    // Step 2: Calculate the number of new ObjectIds needed
    const currentIdsCount = currentWholePlace.ids.length
    const newIdsNeeded = qty - currentIdsCount

    let newIds: mongoose.Types.ObjectId[] = []
    if (newIdsNeeded > 0) {
      newIds = Array.from(
        { length: newIdsNeeded },
        () => new mongoose.Types.ObjectId()
      )
    }

    // Step 3: Update data
    const updateWholePlaceBasicInfo =
      await dbBookableUnitTypes.findOneAndUpdate(
        { _id: bookableUnitId, category: 'Whole-Place', deletedAt: null },
        {
          $set: {
            title: title,
            subtitle: subtitle,
            totalSize: totalSize,
            numBedRooms: 0,
            numBathRooms: numBathRooms,
            bedRooms: bedRooms,
            bedroomStudio: bedroomStudio,
            livingRooms: livingRooms,
            singleBedRoom: singleBedRoom,
            singleLivingRoom: singleLivingRoom,
            qty: qty,
            updatedAt: Date.now(),
          },
          ...(newIdsNeeded > 0 && {
            $push: {
              ids: { $each: newIds },
            },
          }),
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
    console.log(err)
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

import { ResponseService } from '@/common/service/response'
import { dbBookableUnitTypes, dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
//Add whole place
export const addWholePlaceUnit = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId

  const newBookableUnitType = new dbBookableUnitTypes({
    category: 'Whole-Place',
    title: '',
    numBedRooms: 0,
    numBathRooms: 0,
    bedConfigs: null,
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

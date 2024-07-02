import { REQUIRED_VALUE_EMPTY } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_BookableUnitType, T_UnitPrice } from '@repo/contract'
import { dbBookableUnitTypes, dbProperties, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const updateUnitPrice = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const unitPrices: T_UnitPrice[] = req.body
  console.log(unitPrices)
  const getProperty = await dbProperties

    .findOne({ _id: propertyId, offerBy: userId, deletedAt: null })
    .populate({
      path: 'bookableUnits',
      populate: {
        path: 'unitPrice',
        model: 'UnitPrice',
      },
    })
  if (!getProperty) {
    return res.json(response.error({ message: 'This property not exist' }))
  }

  if (!unitPrices || !Array.isArray(unitPrices)) {
    return res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY + ' or invalid data format',
      })
    )
  }

  const unitPriceWithId = unitPrices.filter((item) => '_id' in item)
  const unitPriceWithoutId = unitPrices.filter((item) => !('_id' in item))

  if (unitPriceWithId.length > 0) {
    unitPriceWithId.forEach(async (item) => {
      await dbUnitPrices.findByIdAndUpdate(
        item._id,
        {
          $set: {
            baseRate: item.baseRate,
            baseRateMaxCapacity: item.baseRateMaxcapacity,
            maximumCapacity: item.maximumCapacity,
            pricePerAdditionalPerson: item.pricePerAdditionalPerson,
            discountedMonthlyRate: item.discountMonthlyRate,
            discountedWeeklyRate: item.discountedWeekLyRate,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    })
  }

  if (unitPriceWithoutId.length > 0) {
    getProperty.bookableUnits.forEach(async (item, index) => {
      const newUnitPrice = new dbUnitPrices({
        baseRate: unitPriceWithoutId[index]?.baseRate,
        baseRateMaxCapacity: unitPrices[index]?.baseRateMaxcapacity,
        maximumCapacity: unitPriceWithoutId[index]?.maximumCapacity,
        pricePerAdditionalPerson:
          unitPriceWithoutId[index]?.pricePerAdditionalPerson,
        discountedMonthlyRate: unitPriceWithoutId[index]?.discountMonthlyRate,
        discountedWeeklyRate: unitPriceWithoutId[index]?.discountedWeekLyRate,
        createdAt: Date.now(),
        updatedAt: null,
        deletedAt: null,
      })

      if (
        unitPriceWithoutId[index] &&
        //@ts-ignore
        !getProperty?.bookableUnits[index]?.unitPrice
      ) {
        await newUnitPrice.save()
        await dbBookableUnitTypes.findByIdAndUpdate(
          item._id,
          {
            $set: {
              unitPrice: newUnitPrice._id,
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )
      }
    })
  }

  res.json(
    response.success({
      item: unitPrices,
      message: 'Unit Prices successfully updated',
    })
  )
}

export const getUnitPrice = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const getProperty = await dbProperties
    .findOne({ _id: propertyId, deletedAt: null })
    .populate({
      path: 'bookableUnits',
      populate: {
        path: 'unitPrice',
        model: 'UnitPrice',
      },
    })
  if (!getProperty) {
    return res.json(response.error({ message: 'This property not exist' }))
  }

  const bookableUnits = getProperty.bookableUnits

  if (bookableUnits.length === 0) {
    return res.json(
      response.error({
        message: 'Bookable unit not found for this property',
      })
    )
  }
  const units = bookableUnits.map((item: T_BookableUnitType) => ({
    _id: item?._id,
    unitName: item?.title,
    unitPrice: item.unitPrice,
  }))

  res.json(response.success({ items: units, allItemCount: units.length }))
}

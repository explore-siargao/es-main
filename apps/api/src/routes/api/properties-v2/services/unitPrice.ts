import { ResponseService } from '@/common/service/response'
import { T_BookableUnitType, T_UnitPrice } from '@repo/contract'
import { dbBookableUnitTypes, dbProperties, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateUnitPrice = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const unitPrice: T_UnitPrice = req.body.unitPrice

  try {
    // Fetch the property and its bookable units
    const getProperty = await dbProperties
      .findOne({ _id: propertyId, offerBy: userId, deletedAt: null })
      .populate({
        path: 'bookableUnits',
        populate: {
          path: 'unitPrice',
          model: 'UnitPrices',
        },
      })

    if (!getProperty) {
      return res.json(
        response.error({ message: 'This property does not exist' })
      )
    }

    if (!unitPrice) {
      return res.json(
        response.error({
          message: 'Required value is empty or invalid data format',
        })
      )
    }

    let updatedUnitPrice
    if (unitPrice._id) {
      // Update existing unit price
      updatedUnitPrice = await dbUnitPrices.findByIdAndUpdate(
        unitPrice._id,
        {
          $set: {
            baseRate: unitPrice.baseRate,
            baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
            maximumCapacity: unitPrice.maximumCapacity,
            pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
            discountedWeeklyRate: unitPrice.discountedWeekLyRate,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    } else {
      // Create a new unit price
      updatedUnitPrice = new dbUnitPrices({
        baseRate: unitPrice.baseRate,
        baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
        maximumCapacity: unitPrice.maximumCapacity,
        pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
        discountedWeeklyRate: unitPrice.discountedWeekLyRate,
        createdAt: Date.now(),
        updatedAt: null,
        deletedAt: null,
      })

      await updatedUnitPrice.save()
    }

    // Find the specific unit within the property using the unitId
    const specificUnit = getProperty.bookableUnits.find(
      (unit) => unit._id.toString() === unitPrice._id?.toString()
    )

    if (specificUnit) {
      await dbBookableUnitTypes.findByIdAndUpdate(
        specificUnit._id,
        {
          $set: {
            unitPrice: updatedUnitPrice?._id,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    } else {
      return res.json(response.error({ message: 'Unit not found' }))
    }

    res.json(
      response.success({
        item: updatedUnitPrice,
        message: 'Unit Price successfully updated',
      })
    )
  } catch (error) {
    console.error('Error updating unit price:', error)
    res.status(500).json(
      response.error({
        message: 'An error occurred while updating the unit price',
      })
    )
  }
}
export const getUnitPrice = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const getProperty = await dbProperties
    .findOne({ _id: propertyId, deletedAt: null })
    .populate({
      path: 'bookableUnits',
      populate: {
        path: 'unitPrice',
        model: 'UnitPrices',
      },
    })

  if (!getProperty) {
    return res.json(response.error({ message: 'This property does not exist' }))
  }

  const bookableUnits = getProperty.bookableUnits

  if (bookableUnits.length === 0) {
    return res.json(
      response.error({
        message: 'Bookable unit not found for this property',
      })
    )
  }

  const units = bookableUnits.map((item: T_BookableUnitType) => {
    const unitPrice = item.unitPrice

    return {
      _id: item?._id,
      unitName: item?.title,
      unitPrice: {
        _id: unitPrice?._id,
        baseRate: unitPrice?.baseRate ?? 0,
        baseRateMaxCapacity: unitPrice?.baseRateMaxCapacity ?? 1,
        maximumCapacity: unitPrice?.maximumCapacity ?? 1,
        pricePerAdditionalPerson: unitPrice?.pricePerAdditionalPerson ?? 0.0,
        discountedMonthlyRate: unitPrice?.discountMonthlyRate ?? 0,
        discountedWeekLyRate: unitPrice?.discountedWeekLyRate ?? 0,
      },
    }
  })

  res.json(response.success({ items: units, allItemCount: units.length }))
}

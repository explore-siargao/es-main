import { REQUIRED_VALUE_EMPTY } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_BookableUnitType } from '@repo/contract'
import { dbBookableUnitTypes, dbProperties, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateUnitPrice = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const unitPrice = req.body.unitPrice
  const bookableUnitId = req.body._id
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
    res.json(response.error({ message: 'This property does not exist' }))
  } else {
    if (!unitPrice) {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY + ' or invalid data format',
        })
      )
    } else {
      if (unitPrice._id) {
        await dbUnitPrices.findByIdAndUpdate(
          unitPrice._id,
          {
            $set: {
              baseRate: unitPrice.baseRate,
              baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
              maximumCapacity: unitPrice.maximumCapacity,
              pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
              discountedWeeklyRate: unitPrice.discountedWeeklyRate,
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )
      } else {
        const newUnitPrice = new dbUnitPrices({
          baseRate: unitPrice.baseRate,
          baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
          maximumCapacity: unitPrice.maximumCapacity,
          pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
          discountedWeeklyRate: unitPrice.discountedWeeklyRate,
          createdAt: Date.now(),
          updatedAt: null,
          deletedAt: null,
        })

        await newUnitPrice.save()

        const bookableUnit = await dbBookableUnitTypes.findById(bookableUnitId)
        if (!bookableUnit?.unitPrice) {
          await dbBookableUnitTypes.findByIdAndUpdate(
            bookableUnitId,
            {
              $set: {
                unitPrice: newUnitPrice._id,
                updatedAt: Date.now(),
              },
            },
            { new: true }
          )
        }
      }

      res.json(
        response.success({
          item: unitPrice,
          message: 'Unit Price successfully updated',
        })
      )
    }
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
    res.json(response.error({ message: 'This property does not exist' }))
  } else {
    const bookableUnits = getProperty?.bookableUnits || []

    if (bookableUnits.length === 0) {
      res.json(
        response.error({
          message: 'Bookable unit not found for this property',
        })
      )
    } else {
      const units = bookableUnits.map((item: T_BookableUnitType) => {
        const unitPrice = item.unitPrice

        return {
          _id: item?._id,
          unitName: item?.title,
          unitNameForBed: item?.subtitle,
          qty: item?.qty,
          unitPrice: {
            _id: unitPrice?._id,
            baseRate: unitPrice?.baseRate ?? 0,
            baseRateMaxCapacity: unitPrice?.baseRateMaxCapacity ?? 1,
            maximumCapacity: unitPrice?.maximumCapacity ?? 1,
            pricePerAdditionalPerson:
              unitPrice?.pricePerAdditionalPerson ?? 0.0,
            discountedMonthlyRate: unitPrice?.discountMonthlyRate ?? 0,
            discountedWeeklyRate: unitPrice?.discountedWeeklyRate ?? 0,
          },
        }
      })

      res.json(response.success({ items: units, allItemCount: units.length }))
    }
  }
}

import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { T_UnitPrice } from '@repo/contract'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()
export const getUnitPrice = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const bookableUnitId = Number(req.params.bookableUnitId)
  const getProperty = properties.find(
    (item) =>
      item.id === propertyId &&
      item.BookableUnit.some((item) => item.id === bookableUnitId)
  )
  if (!getProperty) {
    return res.json(response.error({ message: 'This property not exist' }))
  }

  const bookableUnit = getProperty.BookableUnit

  if (!bookableUnit) {
    return res.json(
      response.error({
        message: 'Bookable unit not found for this property',
      })
    )
  }
  const bookableUnits = bookableUnit.map((item) => ({
    id: item.BookableUnitType.id,
    unitName: item.BookableUnitType.name,
    unitPrice: item.BookableUnitType.unitPrice,
  }))

  res.json(response.success({ items: bookableUnits }))
}

export const updateUnitPrice = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const bookableUnitId = Number(req.params.bookableUnitId)
  const unitPrices: T_UnitPrice[] = req.body.unitPrices
  const getProperty = properties.find(
    (item) => item.id === propertyId && item.hostId === userId
  )
  if (!getProperty) {
    return res.json(response.error({ message: 'This property not exist' }))
  }

  const bookableUnit: any = getProperty.BookableUnit.find(
    (unit) => unit.id === bookableUnitId
  )

  if (!bookableUnit) {
    return res.json(
      response.error({
        message: 'Bookable unit not found for this property',
      })
    )
  }
  if (!unitPrices) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  if (getProperty.hostId !== userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  unitPrices?.forEach((item, index) => {
    if (item._id === bookableUnit.unitPrice._id) {
      bookableUnit.BookableUnitType.unitPrice.baseRate = item?.baseRate
      //@ts-ignore
      bookableUnit.BookableUnitType.unitPrice.baseRateMaxcapacity =
        item?.baseRateMaxcapacity
      //@ts-ignore
      bookableUnit.BookableUnitType.unitPrice.discountMonthlyRate =
        item?.discountMonthlyRate
      //@ts-ignore
      bookableUnit.BookableUnitType.unitPrice.discountedWeekLyRate =
        item?.discountedWeekLyRate
      //@ts-ignore
      bookableUnit.BookableUnitType.unitPrice.maximumCapacity =
        item?.maximumCapacity
      //@ts-ignore
      bookableUnit.BookableUnitType.unitPrice.pricePerAdditionalPerson =
        item?.pricePerAdditionalPerson
    }
  })
  res.json(
    response.success({
      item: unitPrices,
      message: 'Unit Prices successfully updated',
    })
  )
}

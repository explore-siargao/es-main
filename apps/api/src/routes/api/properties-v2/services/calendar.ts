import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties, dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const get = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const category = req.params.category
  //@ts-expect-error
  const [startDate, endDate] = req.params.dateRange.split(',')

  try {
    const property = await dbProperties
      .findById(propertyId)
      .populate({
        path: 'bookableUnits',
        populate: {
          path: 'unitPrice amenities photos bedConfigs',
          select: 'baseRate bedType name',
        },
      })
      .exec()

    if (!property) {
      return res.json(response.error({ message: 'Property not found' }))
    }

    const filteredUnits = property.bookableUnits.filter(
      //@ts-expect-error
      (unit) => unit.category === category
    )

    let items = []

    for (const unit of filteredUnits) {
      const reservations = await dbReservations
        .find({
          unitId: unit._id,
          //@ts-expect-error
          startDate: { $gte: new Date(startDate) },
          //@ts-expect-error
          endDate: { $lte: new Date(endDate) },
        })
        .populate('guest', 'name')
        .exec()

      const reservationsMap = reservations.map((reservation) => ({
        //@ts-expect-error
        name: reservation.guest.name,
        start_date: reservation.startDate,
        end_date: reservation.endDate,
        guest_count: reservation.guestCount,
      }))

      //@ts-expect-error
      for (let i = 1; i <= unit.qty; i++) {
        items.push({
          //@ts-expect-error
          name: unit.title,
          //@ts-expect-error
          price: unit.unitPrice.baseRate,
          //@ts-expect-error
          abbr: `${unit.title} ${i}`,
          status: reservationsMap.length > 0 ? 'occupied' : 'available',
          reservations: reservationsMap.sort(
            //@ts-expect-error
            (a, b) => new Date(a.start_date) - new Date(b.start_date)
          ),
        })
      }
    }

    const groupedItems = items.reduce((acc, item) => {
      const categoryKey =
        category === 'room'
          ? 'rooms'
          : category === 'bed'
            ? 'beds'
            : 'whole-places'
      //@ts-expect-error
      const existingCategory = acc.find((group) => group.name === item.name)
      if (existingCategory) {
        //@ts-expect-error
        existingCategory[categoryKey].push(item)
      } else {
        //@ts-expect-error
        acc.push({
          name: item.name,
          price: item.price,
          [categoryKey]: [item],
        })
      }
      return acc
    }, [])

    return res.json(response.success({ items: groupedItems }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

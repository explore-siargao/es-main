import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ResponseService } from '@/common/service/response'
import {
  dbBookableUnitTypes,
  dbProperties,
  dbReservations,
  dbUnitPrices,
} from '@repo/database'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'

const response = new ResponseService()

// Define types
type Guest = {
  _id: mongoose.Types.ObjectId
  firstName: string
  lastName: string
}

type Reservation = {
  id: String
  category?: string
  unit?: string
  name: string // Ensure this is typed as Guest
  startDate: Date
  endDate: Date
  guestCount: number
  notes?: String
  status: String
}

export type Room = {
  abbr: string
  status: string
  reservations: Reservation[]
}

export type WholePlace = {
  abbr: string
  status: string
  reservations: Reservation[]
}

export type Bed = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Item = {
  name: string
  price: string
  rooms: Room[]
}

const STATUS_DISPLAY = ['Out of service', 'Blocked dates']

// Function to check for date overlap
const hasDateConflict = (
  existingReservations: Reservation[],
  newReservation: Reservation
) => {
  return existingReservations.some((reservation) => {
    return (
      (newReservation.startDate >= reservation.startDate &&
        newReservation.startDate <= reservation.endDate) ||
      (newReservation.endDate >= reservation.startDate &&
        newReservation.endDate <= reservation.endDate) ||
      (newReservation.startDate <= reservation.startDate &&
        newReservation.endDate >= reservation.endDate)
    )
  })
}

export const getPropertyCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)
  try {
    const bedProperties = await dbProperties
      .find({
        offerBy: res.locals.user.id,
      })
      .populate('bookableUnits')

    const roomIds: string[] = []
    const wholePlaceIds: string[] = []
    const bedIds: string[] = []

    bedProperties.forEach((property: any) => {
      property.bookableUnits.forEach((unit: any) => {
        if (unit.category === 'Room') {
          roomIds.push(...unit.ids)
        } else if (unit.category === 'Whole-Place') {
          wholePlaceIds.push(...unit.ids)
        } else if (unit.category === 'Bed') {
          bedIds.push(...unit.ids)
        }
      })
    })

    // Fetch reservations for each category
    const [roomReservations, wholePlaceReservations, bedReservations] =
      await Promise.all([
        dbReservations
          .find({
            unitId: { $in: roomIds.map((room: any) => room?._id) }, // Extracting _id from each object
            $or: [
              { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
            ],
          })
          .populate('guest'),
        dbReservations
          .find({
            unitId: {
              $in: wholePlaceIds.map((wholePlace: any) => wholePlace?._id),
            }, // Extracting _id from each object
            $or: [
              { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
            ],
          })
          .populate('guest'),

        dbReservations
          .find({
            unitId: { $in: bedIds.map((bed: any) => bed?._id) },
            $or: [
              { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
            ],
          })
          .populate('guest'),
      ])

    const formatUnits = (
      units: any[],
      reservations: any[],
      idField: string,
      propertyName: string
    ) =>
      units.map((unit: any) => {
        const formattedItems = unit.ids.map((idObj: any) => {
          return {
            id: idObj._id,
            abbr: idObj.name,
            status: 'available',
            reservations: [],
          }
        })

        reservations.forEach((reservation: any) => {
          if (reservation.status !== 'Cancelled') {
            const guest = reservation.guest
            let reservationStatus = reservation.status
            if (
              (reservationStatus === 'Confirmed' ||
                reservationStatus === 'Blocked-Dates' ||
                reservationStatus === 'Checked-In') &&
              currentDate >= reservation.startDate &&
              currentDate <= reservation.endDate
            ) {
              reservationStatus = 'Checked-In' // Update the status to 'Checked-In'
            } else if (
              (reservationStatus === 'Confirmed' ||
                reservationStatus === 'Blocked-Dates' ||
                reservationStatus === 'Checked-In' ||
                reservationStatus === 'Checked-Out') &&
              currentDate > reservation.endDate
            ) {
              reservationStatus = 'Checked-Out' // Update the status to 'Checked-Out'
            }
            const reservationItem: Reservation = {
              id: reservation._id,
              category: unit.category,
              name: STATUS_DISPLAY.includes(reservation.status)
                ? reservation.status
                : guest
                  ? `${guest.firstName} ${guest.lastName}`
                  : reservation.guestName || 'Unknown',
              startDate: reservation.startDate ?? new Date(),
              endDate: reservation.endDate ?? new Date(),
              guestCount: reservation.guestCount ?? 0,
              notes: reservation.notes ?? '',
              status: reservationStatus,
            }

            for (let i = 0; i < formattedItems.length; i++) {
              const item = formattedItems[i]

              if (item) {
                const currentReservations = item.reservations ?? []

                if (!hasDateConflict(currentReservations, reservationItem)) {
                  item.reservations.push(reservationItem)
                  item.status = 'occupied'
                  break
                }
              }
            }
          }
        })

        return {
          id: unit._id,
          name: unit.title || 'Unknown',
          price: unit.pricing?.dayRate ?? 0,
          pricePerDates: unit.pricePerDates,
          [propertyName]: formattedItems,
        }
      })

    const groupedByProperty: any = {}

    bedProperties.forEach((property: any) => {
      const bookableUnits = []

      bookableUnits.push(
        ...formatUnits(
          property.bookableUnits.filter(
            (unit: any) => unit?.category === 'Whole-Place'
          ),
          wholePlaceReservations,
          'wholePlaceId',
          'wholePlaces'
        )
      )

      bookableUnits.push(
        ...formatUnits(
          property.bookableUnits.filter(
            (unit: any) => unit?.category === 'Room'
          ),
          roomReservations,
          'roomId',
          'rooms'
        )
      )

      bookableUnits.push(
        ...formatUnits(
          property.bookableUnits.filter(
            (unit: any) => unit?.category === 'Bed'
          ),
          bedReservations,
          'bedId',
          'beds'
        )
      )

      groupedByProperty[property.title] = bookableUnits
    })

    const items = Object.keys(groupedByProperty).map((propertyTitle) => ({
      propertyTitle,
      bookableUnitTypes: groupedByProperty[propertyTitle],
    }))

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Property calendar fetched successfully.',
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

export const editUnitChildName = async (req: Request, res: Response) => {
  const { id, name } = req.body
  try {
    const updateUnitName = await dbBookableUnitTypes.findOneAndUpdate(
      { 'ids._id': id },
      { $set: { 'ids.$.name': name } },
      { new: true }
    )
    if (!updateUnitName) {
      return res.json(response.error({ message: 'Unit not found' }))
    }
    return res.json(
      response.success({
        item: updateUnitName,
        message: 'Successfully changed unit name',
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

export const addUnitPricePerDates = async (req: Request, res: Response) => {
  const unitId = req.params.unitId
  const {
    fromDate,
    toDate,
    baseRate,
    baseRateMaxCapacity,
    maximumCapacity,
    pricePerAdditionalPerson,
  } = req.body

  try {
    const getUnit = await dbBookableUnitTypes.findOne({
      _id: unitId,
      deletedAt: null,
    })

    if (!getUnit) {
      return res.json(
        response.error({ message: 'Bookable unit not exist on our system' })
      )
    }

    if (
      !fromDate ||
      !toDate ||
      !baseRate ||
      !maximumCapacity ||
      !baseRateMaxCapacity ||
      !pricePerAdditionalPerson
    ) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }

    const newFromDate = new Date(fromDate)
    const newToDate = new Date(toDate)

    const isConflict = getUnit.pricePerDates.some((dateRange: any) => {
      const existingFromDate = new Date(dateRange.fromDate)
      const existingToDate = new Date(dateRange.toDate)
      return newFromDate <= existingToDate && newToDate >= existingFromDate
    })

    if (isConflict) {
      return res.json(
        response.error({
          message: 'The date range conflicts with existing price periods.',
        })
      )
    }

    const newUnitPrice = new dbUnitPrices({
      baseRate: baseRate,
      baseRateMaxCapacity: baseRateMaxCapacity,
      maximumCapacity: maximumCapacity,
      pricePerAdditionalPerson: pricePerAdditionalPerson,
    })

    await newUnitPrice.save()
    const pricePerDates = {
      fromDate: fromDate,
      toDate: toDate,
      price: newUnitPrice._id,
    }
    await dbBookableUnitTypes.findByIdAndUpdate(
      unitId,
      {
        $push: {
          pricePerDates: pricePerDates,
        },
      },
      { new: true }
    )
    return res.json(
      response.success({
        item: pricePerDates,
        message: 'Price for specific dates successfully setted',
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

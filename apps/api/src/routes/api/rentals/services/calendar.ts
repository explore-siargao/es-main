import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { dbRentalRates, dbRentals, dbReservations } from '@repo/database'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { convertPrice } from '@/common/helpers/convert-price'
import { T_Rental_Price } from '@repo/contract-2/rental'

const response = new ResponseService()

type Reservation = {
  id: string
  name: string // Ensure this is typed as Guest
  startDate: Date
  endDate: Date
  guestCount: number
  status: string
  notes?: string
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

export const getCarCalendar = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)
  try {
    const carRentals = await dbRentals
      .find({ category: 'Car', host: res.locals.user.id })
      .populate('pricing')
      .populate({
        path: 'pricePerDates',
        populate: {
          path: 'price',
        },
      })

    if (!carRentals.length) {
      res.json(
        response.success({
          items: [],
          message: 'No car rentals found.',
        })
      )
    } else {
      const allRentalIds = carRentals.flatMap((rental) =>
        rental?.qtyIds.map((idObj) => idObj._id)
      )

      const reservations = await dbReservations
        .find({
          'rentalIds.qtyIdsId': { $in: allRentalIds },
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
              $and: [
                { status: { $ne: 'Cancelled' } },
                { status: { $ne: 'For-Payment' } },
              ],
            },
          ],
        })
        .populate({
          path: 'guest',
          populate: {
            path: 'guest',
          },
        })

      const reservationMap: Record<string, Reservation[]> = {}
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest
        let reservationStatus = reservation.status
        if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates') &&
          currentDate >= reservation.startDate &&
          currentDate <= reservation.endDate
        ) {
          reservationStatus = 'Checked-In' // Update the status to 'Checked-In'
        } else if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates' ||
            reservationStatus === 'Checked-In') &&
          currentDate > reservation.endDate
        ) {
          reservationStatus = 'Checked-Out' // Update the status to 'Checked-Out'
        }
        const reservationItem: Reservation = {
          id: reservation._id,
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.guest.firstName} ${guest.guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservationStatus,
          notes: reservation.notes,
        }

        if (!reservationMap[reservation.rentalIds.qtyIdsId.toString()]) {
          reservationMap[reservation.rentalIds.qtyIdsId.toString()] = []
        }
        reservationMap[reservation.rentalIds.qtyIdsId.toString()]?.push(
          reservationItem
        )
      })

      const items = carRentals.map((rental) => {
        const cars = rental?.qtyIds.map((idObj) => {
          const carReservations = reservationMap[idObj._id.toString()] || []

          const isOccupied = carReservations.length > 0

          return {
            id: idObj._id,
            name: idObj.name ? idObj.name : 'Unknown',
            status: isOccupied ? 'occupied' : 'available',
            reservations: carReservations,
          }
        })

        return {
          id: rental?._id,
          name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`,
          price:
            rental?.pricing && typeof rental.pricing === 'object'
              ? convertPrice(
                  (rental?.pricing as unknown as T_Rental_Price)?.dayRate,
                  preferredCurrency,
                  conversionRates
                )
              : 0,
          pricePerDates: rental?.pricePerDates.map((priceDate) => ({
            fromDate: priceDate.fromDate,
            toDate: priceDate.toDate,
            price:
              priceDate?.price && typeof priceDate?.price === 'object'
                ? {
                    //@ts-ignore
                    ...priceDate.price._doc,
                    dayRate: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.dayRate,
                      preferredCurrency,
                      conversionRates
                    ),
                    requiredDeposit: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.requiredDeposit,
                      preferredCurrency,
                      conversionRates
                    ),
                    adminBookingCharge:
                      //@ts-ignore
                      !priceDate.price._doc.adminBookingCharge
                        ? convertPrice(
                            //@ts-ignore
                            priceDate.price._doc.adminBookingCharge,
                            preferredCurrency,
                            conversionRates
                          )
                        : 0,
                  }
                : 0,
          })),
          cars: cars.filter((car) => car.name !== 'Unknown'),
        }
      })

      res.json(
        response.success({
          items,
          allItemCount: items.length,
          message: 'Cars calendar fetched successfully.',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    )
  }
}

export const getBikeCalendar = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)
  try {
    const bicycleRentals = await dbRentals
      .find({ category: 'Bicycle', host: res.locals.user.id })
      .populate('pricing')
      .populate({
        path: 'pricePerDates',
        populate: {
          path: 'price',
        },
      })

    if (!bicycleRentals.length) {
      res.json(
        response.success({
          items: [],
          message: 'No bicycle rentals found.',
        })
      )
    } else {
      const allRentalIds = bicycleRentals.flatMap((rental) =>
        rental?.qtyIds.map((idObj) => idObj._id)
      )

      const reservations = await dbReservations
        .find({
          'rentalIds.qtyIdsId': { $in: allRentalIds },
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
              $and: [
                { status: { $ne: 'Cancelled' } },
                { status: { $ne: 'For-Payment' } },
              ],
            },
          ],
        })
        .populate({
          path: 'guest',
          populate: {
            path: 'guest',
          },
        })

      const reservationMap: Record<string, Reservation[]> = {}
      reservations.forEach((reservation: any) => {
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
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.guest.firstName} ${guest.guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservationStatus,
          notes: reservation.notes,
        }

        if (!reservationMap[reservation.rentalIds.qtyIdsId.toString()]) {
          reservationMap[reservation.rentalIds.qtyIdsId.toString()] = []
        }
        reservationMap[reservation.rentalIds.qtyIdsId.toString()]?.push(
          reservationItem
        )
      })

      const items = bicycleRentals.map((rental) => {
        const bicycles = rental?.qtyIds.map((idObj) => {
          const bicycleReservations = reservationMap[idObj._id.toString()] || []

          const isOccupied = bicycleReservations.length > 0

          return {
            id: idObj._id,
            name: idObj.name ? idObj.name : 'Unknown',
            status: isOccupied ? 'occupied' : 'available',
            reservations: bicycleReservations,
          }
        })

        return {
          id: rental?._id,
          name: rental?.make ?? 'Unknown',
          //@ts-ignore
          price:
            rental?.pricing && typeof rental.pricing === 'object'
              ? convertPrice(
                  (rental?.pricing as unknown as T_Rental_Price)?.dayRate,
                  preferredCurrency,
                  conversionRates
                )
              : 0,

          pricePerDates: rental?.pricePerDates.map((priceDate) => ({
            fromDate: priceDate.fromDate,
            toDate: priceDate.toDate,
            price:
              priceDate?.price && typeof priceDate?.price === 'object'
                ? {
                    //@ts-ignore
                    ...priceDate.price._doc,
                    dayRate: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.dayRate,
                      preferredCurrency,
                      conversionRates
                    ),
                    requiredDeposit: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.requiredDeposit,
                      preferredCurrency,
                      conversionRates
                    ),
                    adminBookingCharge:
                      //@ts-ignore
                      !priceDate.price._doc.adminBookingCharge
                        ? convertPrice(
                            //@ts-ignore
                            priceDate.price._doc.adminBookingCharge,
                            preferredCurrency,
                            conversionRates
                          )
                        : 0,
                  }
                : 0,
          })),
          bicycles: bicycles.filter((bike) => bike.name !== 'Unknown'),
        }
      })

      res.json(
        response.success({
          items,
          allItemCount: items.length,
          message: 'Bicycle calendar fetched successfully.',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    )
  }
}

export const getMotorcycleCalendar = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)
  try {
    const motorcycleRentals = await dbRentals
      .find({ category: 'Motorbike', host: res.locals.user.id })
      .populate('pricing')
      .populate({
        path: 'pricePerDates',
        populate: {
          path: 'price',
        },
      })

    if (!motorcycleRentals.length) {
      res.json(
        response.success({
          items: [],
          message: 'No motorcycle rentals found.',
        })
      )
    } else {
      const allRentalIds = motorcycleRentals.flatMap((rental) =>
        rental?.qtyIds.map((idObj) => idObj._id)
      )

      const reservations = await dbReservations
        .find({
          'rentalIds.qtyIdsId': { $in: allRentalIds },
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
              $and: [
                { status: { $ne: 'Cancelled' } },
                { status: { $ne: 'For-Payment' } },
              ],
            },
          ],
        })
        .populate({
          path: 'guest',
          populate: {
            path: 'guest',
          },
        })

      const reservationMap: Record<string, Reservation[]> = {}
      reservations.forEach((reservation: any) => {
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
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.guest.firstName} ${guest.guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservationStatus,
          notes: reservation.notes,
        }

        if (!reservationMap[reservation.rentalIds.qtyIdsId.toString()]) {
          reservationMap[reservation.rentalIds.qtyIdsId.toString()] = []
        }
        reservationMap[reservation.rentalIds.qtyIdsId.toString()]?.push(
          reservationItem
        )
      })

      const items = motorcycleRentals.map((rental) => {
        const motorcycles = rental?.qtyIds.map((idObj) => {
          const motorcycleReservations =
            reservationMap[idObj._id.toString()] || []
          const isOccupied = motorcycleReservations.length > 0

          return {
            id: idObj._id,
            name: idObj.name ? idObj.name : 'Unknown',
            status: isOccupied ? 'occupied' : 'available',
            reservations: motorcycleReservations,
          }
        })

        return {
          id: rental?._id,
          name: rental
            ? `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`
            : 'Unknown',
          //@ts-ignore
          //@ts-ignore
          price:
            rental?.pricing && typeof rental.pricing === 'object'
              ? convertPrice(
                  (rental?.pricing as unknown as T_Rental_Price)?.dayRate,
                  preferredCurrency,
                  conversionRates
                )
              : 0,

          pricePerDates: rental?.pricePerDates.map((priceDate) => ({
            fromDate: priceDate.fromDate,
            toDate: priceDate.toDate,
            price:
              priceDate?.price && typeof priceDate?.price === 'object'
                ? {
                    //@ts-ignore
                    ...priceDate.price._doc,
                    dayRate: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.dayRate,
                      preferredCurrency,
                      conversionRates
                    ),
                    requiredDeposit: convertPrice(
                      //@ts-ignore
                      priceDate.price._doc.requiredDeposit,
                      preferredCurrency,
                      conversionRates
                    ),
                    adminBookingCharge:
                      //@ts-ignore
                      !priceDate.price._doc.adminBookingCharge
                        ? convertPrice(
                            //@ts-ignore
                            priceDate.price._doc.adminBookingCharge,
                            preferredCurrency,
                            conversionRates
                          )
                        : 0,
                  }
                : 0,
          })),
          motorcycles: motorcycles.filter((motor) => motor.name !== 'Unknown'),
        }
      })

      res.json(
        response.success({
          items,
          allItemCount: items.length,
          message: 'Motorcycle calendar fetched successfully.',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    )
  }
}

export const editChildName = async (req: Request, res: Response) => {
  const { id, name } = req.body
  try {
    const updateVehicle = await dbRentals.findOneAndUpdate(
      { 'qtyIds._id': id },
      { $set: { 'qtyIds.$.name': name } },
      { new: true }
    )
    if (!updateVehicle) {
      res.json(response.error({ message: 'Rental vehicle not found' }))
    } else {
      res.json(
        response.success({
          item: updateVehicle,
          message: 'Successfully changed rental vehicle name',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addRentalPricePerDates = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const { fromDate, toDate, dayRate } = req.body
  try {
    const getRental = await dbRentals
      .findOne({
        _id: rentalId,
        deletedAt: null,
      })
      .populate('pricing')
    if (!getRental) {
      res.json(response.error({ message: 'Rental not found on our system' }))
    } else {
      if (!fromDate || !toDate || !dayRate) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        // Parse incoming dates for comparison
        const newFromDate = new Date(fromDate)
        const newToDate = new Date(toDate)

        // Check for overlapping date ranges
        const isConflict = getRental?.pricePerDates.some((dateRange: any) => {
          const existingFromDate = new Date(dateRange.fromDate)
          const existingToDate = new Date(dateRange.toDate)

          // Check if the new range overlaps with any existing ranges
          return newFromDate <= existingToDate && newToDate >= existingFromDate
        })

        if (isConflict) {
          res.json(
            response.error({
              message: 'The date range conflicts with existing price periods.',
            })
          )
        } else {
          const newRentalRates = new dbRentalRates({
            dayRate: dayRate,
            //@ts-ignore
            requiredDeposit: getRental.pricing?.requiredDeposit,
            adminBookingCharge: null,
            createdAt: Date.now(),
            deletedAt: null,
          })
          await newRentalRates.save()

          const newPricePerDates = {
            fromDate: newFromDate,
            toDate: newToDate,
            price: newRentalRates._id,
          }

          await dbRentals.findByIdAndUpdate(
            rentalId,
            {
              $push: {
                pricePerDates: newPricePerDates,
              },
            },
            { new: true }
          )

          res.json(
            response.success({
              item: newRentalRates,
              message: 'Price for specific dates successfully setted',
            })
          )
        }
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const editRentalNote = async (req: Request, res: Response) => {
  const { rentalId, note } = req.body
  if (!rentalId || !note) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const updateRentalNote = await dbRentals.findByIdAndUpdate(
        rentalId,
        {
          $set: {
            rentalNote: note,
          },
        },
        { new: true }
      )
      if (updateRentalNote) {
        res.json(
          response.success({
            item: updateRentalNote,
            message: 'Rental note successfully updated',
          })
        )
      } else {
        res.json(response.error({ message: 'Rental not found' }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
}

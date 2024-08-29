import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ResponseService } from '@/common/service/response'
import { dbProperties, dbRentals, dbReservations } from '@repo/database'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

// Define types
type Guest = {
  _id: mongoose.Types.ObjectId
  firstName: string
  lastName: string
}

type Reservation = {
  name: string // Ensure this is typed as Guest
  startDate: Date
  endDate: Date
  guestCount: number
}

type Bicycle = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Car = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Item = {
  name: string
  price: string
  bicycles: Bicycle[]
}

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
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)

  try {
    // Retrieve all car rentals by host
    const carRentals = await dbRentals
      .find({ category: 'Car', host: res.locals.user.id })
      .populate('pricing')

    if (!carRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No car rentals found.',
        })
      )
    }

    // Extract all rental IDs from the `ids` array in car rentals
    const allRentalIds = carRentals.flatMap((rental) =>
      rental.ids.map((idObj) => idObj._id)
    )

    // Find reservations that overlap with the given date range and match the rental IDs
    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest')

    // Structure the data in the specified format
    const items = carRentals.map((rental) => {
      const cars = rental.ids.map((idObj) => {
        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: 'available',
          reservations: [],
        }
      })

      // Distribute reservations across cars
      reservations.forEach((reservation: any) => {
        if (reservation.guest) {
          const reservationItem: Reservation = {
            name: `${reservation.guest.firstName} ${reservation.guest.lastName}`,
            startDate: reservation.startDate ?? new Date(),
            endDate: reservation.endDate ?? new Date(),
            guestCount: reservation.guestCount ?? 0,
          }

          for (let i = 0; i < cars.length; i++) {
            const car = cars[i]

            if (car) {
              const currentReservations = car.reservations ?? []

              if (!hasDateConflict(currentReservations, reservationItem)) {
                //@ts-ignore
                car.reservations.push(reservationItem)
                car.status = 'occupied'
                break // Exit the loop after assigning
              }
            }
          }
        }
      })

      return {
        name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`,
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0,
        cars: cars.filter((car) => car.abbr !== 'Unknown'),
      }
    })

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Cars calendar fetched successfully.',
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    )
  }
}

export const getBikeCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  try {
    //Retrieve all bicycle rentals by host
    const bicycleRentals = await dbRentals
      .find({ category: 'Bicycle', host: res.locals.user.id })
      .populate('pricing')

    if (!bicycleRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No bicycle rentals found.',
        })
      )
    }

    // Extract all ids from bicycle rentals
    const allRentalIds = bicycleRentals.flatMap((rental) => rental.ids)

    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest') // Ensure guest field is populated

    //Structure the data in the specified format
    const items: any = bicycleRentals.map((rental) => {
      const bicycles: Bicycle[] = rental.ids.map((idObj) => {
        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: 'available',
          reservations: [],
        }
      })

      //Distribute reservations across bicycles
      reservations.forEach((reservation: any) => {
        if (reservation.guest) {
          const reservationItem: Reservation = {
            name:
              reservation?.guest.firstName + ' ' + reservation?.guest.lastName,
            startDate: reservation.startDate ?? new Date(),
            endDate: reservation.endDate ?? new Date(),
            guestCount: reservation.guestCount ?? 0,
          }

          for (let i = 0; i < bicycles.length; i++) {
            const bicycle = bicycles[i] // Store the current bicycle in a local variable

            // Ensure the bicycle is not undefined
            if (bicycle) {
              const currentReservations = bicycle.reservations ?? [] // Ensure it's an array

              if (!hasDateConflict(currentReservations, reservationItem)) {
                bicycle.reservations.push(reservationItem) // Access the reservations array
                bicycle.status = 'occupied' // Update the status
                break // Exit the loop after assigning
              }
            }
          }
        }
      })

      return {
        name: rental.make ?? 'Unknown', // Ensure name is always a string
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0, // Ensure price is always a string
        bicycles: bicycles.filter((bike) => bike.abbr !== 'Unknown'),
      }
    })

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Bicycle calendar fetched successfully.',
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    )
  }
}

export const getMotorcycleCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  try {
    //Retrieve all motorcycle rentals by host
    const motorcycleRentals = await dbRentals
      .find({ category: 'Motorbike', host: res.locals.user.id })
      .populate('pricing')
      .populate('pricing')

    if (!motorcycleRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No motorcycle rentals found.',
        })
      )
    }

    // Extract all ids from motorcycle rentals
    const allRentalIds = motorcycleRentals.flatMap((rental) => rental.ids)

    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest') // Ensure guest field is populated

    //Structure the data in the specified format
    const items: any = motorcycleRentals.map((rental) => {
      const motorcycles: Bicycle[] = rental.ids.map((idObj) => {
        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: 'available',
          reservations: [],
        }
      })

      //Distribute reservations across motorcycle
      reservations.forEach((reservation: any) => {
        if (reservation.guest) {
          const reservationItem: Reservation = {
            name:
              reservation?.guest.firstName + ' ' + reservation?.guest.lastName,
            startDate: reservation.startDate ?? new Date(),
            endDate: reservation.endDate ?? new Date(),
            guestCount: reservation.guestCount ?? 0,
          }

          for (let i = 0; i < motorcycles.length; i++) {
            const motorcycle = motorcycles[i] // Store the current bicycle in a local variable

            // Ensure the bicycle is not undefined
            if (motorcycle) {
              const currentReservations = motorcycle.reservations ?? [] // Ensure it's an array

              if (!hasDateConflict(currentReservations, reservationItem)) {
                motorcycle.reservations.push(reservationItem) // Access the reservations array
                motorcycle.status = 'occupied' // Update the status
                break // Exit the loop after assigning
              }
            }
          }
        }
      })

      return {
        name:
          rental.year +
            ' ' +
            rental.make +
            ' ' +
            rental.modelBadge +
            ' ' +
            `${rental.transmission === 'Automatic' ? 'AT' : 'MT'}` ?? 'Unknown', // Ensure name is always a string
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0, // Ensure price is always a string
        motorcycles: motorcycles.filter((motor) => motor.abbr !== 'Unknown'),
      }
    })

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Bicycle calendar fetched successfully.',
      })
    )
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
      { 'ids._id': id },
      { $set: { 'ids.$.name': name } },
      { new: true }
    )
    if (!updateVehicle) {
      return res.json(response.error({ message: 'Rental vehicle not found' }))
    }
    return res.json(
      response.success({
        item: updateVehicle,
        message: 'Successfully changed rental vehicle name',
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

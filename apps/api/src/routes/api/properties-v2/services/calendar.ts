import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ResponseService } from '@/common/service/response'
import { dbProperties, dbReservations } from '@repo/database'
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

type Room = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Bed = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Item = {
  name: string
  price: string
  rooms: Room[]
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

export const getRoomCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)

  try {
    // Retrieve all properties of the specified types by the host
    const roomProperties = await dbProperties
      .find({
        type: { $in: ['Hostel', 'Hotel', 'Homestay', 'Resort'] },
        offerBy: res.locals.user.id,
      })
      .populate('bookableUnits')

    // Flatten the bookableUnits and filter only those with category "Room"
    const filteredUnits = roomProperties.flatMap((property: any) =>
      property.bookableUnits.filter((unit: any) => unit?.category === 'Room')
    )

    if (!filteredUnits.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No room units found.',
        })
      )
    }

    // Extract all ids from bicycle rentals
    const allRoomIds = filteredUnits.flatMap((room) => room.ids)

    const reservations = await dbReservations
      .find({
        roomId: { $in: allRoomIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest') // Ensure guest field is populated

    //Structure the data in the specified format
    const items: any = filteredUnits.map((room) => {
      const rooms: Room[] = room.ids.map((id: string, index: number) => {
        const abbr = `${room.title} ${index + 1}`
        return {
          abbr,
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

          for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i] // Store the current bicycle in a local variable

            // Ensure the car is not undefined
            if (room) {
              const currentReservations = room.reservations ?? [] // Ensure it's an array

              if (!hasDateConflict(currentReservations, reservationItem)) {
                room.reservations.push(reservationItem) // Access the reservations array
                room.status = 'occupied' // Update the status
                break // Exit the loop after assigning
              }
            }
          }
        }
      })

      return {
        name: room.title === '' ? 'Unknown' : `${room.title}`,
        // Ensure name is always a string
        //@ts-ignore
        price: room.pricing?.dayRate ?? 0, // Ensure price is always a string
        rooms,
      }
    })

    const removedUnknown = items.filter((item: any) => item.name !== 'Unknown')

    res.json(
      response.success({
        items: removedUnknown,
        allItemCount: items.length,
        message: 'Room calendar fetched successfully.',
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

export const getBedCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)

  try {
    // Retrieve all properties of the specified types by the host
    const bedProperties = await dbProperties
      .find({
        type: { $in: ['Hostel', 'Resort', 'Homestay'] },
        offerBy: res.locals.user.id,
      })
      .populate('bookableUnits')

    // Flatten the bookableUnits and filter only those with category "Room"
    const filteredUnits = bedProperties.flatMap((property: any) =>
      property.bookableUnits.filter((unit: any) => unit?.category === 'Bed')
    )

    if (!filteredUnits.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No bed units found.',
        })
      )
    }

    // Extract all ids from bicycle rentals
    const allBedIds = filteredUnits.flatMap((bed) => bed.ids)

    const reservations = await dbReservations
      .find({
        bedId: { $in: allBedIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest') // Ensure guest field is populated

    //Structure the data in the specified format
    const items: any = filteredUnits.map((bed) => {
      const beds: Bed[] = bed.ids.map((id: string, index: number) => {
        const abbr = `${bed.title} ${index + 1}`
        return {
          abbr,
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

          for (let i = 0; i < beds.length; i++) {
            const bed = beds[i] // Store the current bicycle in a local variable

            // Ensure the car is not undefined
            if (bed) {
              const currentReservations = bed.reservations ?? [] // Ensure it's an array

              if (!hasDateConflict(currentReservations, reservationItem)) {
                bed.reservations.push(reservationItem) // Access the reservations array
                bed.status = 'occupied' // Update the status
                break // Exit the loop after assigning
              }
            }
          }
        }
      })

      return {
        name: bed.title === '' ? 'Unknown' : `${bed.title}`,
        // Ensure name is always a string
        //@ts-ignore
        price: bed.pricing?.dayRate ?? 0, // Ensure price is always a string
        beds,
      }
    })

    const removedUnknown = items.filter((item: any) => item.name !== 'Unknown')

    res.json(
      response.success({
        items: removedUnknown,
        allItemCount: items.length,
        message: 'Room calendar fetched successfully.',
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

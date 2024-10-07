import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
const response = new ResponseService()

type Reservation = {
  id: string
  name: string
  startDate: Date
  endDate: Date
  guestCount: number
  status: string
  notes?: string
}

interface Session {
  _id: string
  startTime?: string | null
  endTime?: string | null
}

interface Schedule {
  monday: Session[]
  tuesday: Session[]
  wednesday: Session[]
  thursday: Session[]
  friday: Session[]
  saturday: Session[]
  sunday: Session[]
}

const STATUS_DISPLAY = ['Out of service', 'Blocked dates']

export const getPrivateActivityCalendar = async (
  req: Request,
  res: Response
) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)

  try {
    // Fetch private activities where the experienceType is 'private' and host matches the current user
    const activities = await dbActivities.find({
      experienceType: 'private',
      host: res.locals.user.id,
    })

    if (!activities.length) {
      res.json(
        response.success({
          items: [],
          message: 'No private activities found.',
        })
      )
    } else {
      // Flatten all activity schedule sessions and get their _id values

      const getAllIdsFromParent = (parentSchedule: any[]) => {
        const allIds: mongoose.Types.ObjectId[] = [] // Explicitly type as ObjectId array

        // Loop through each parent object
        parentSchedule.forEach((parent) => {
          const { schedule } = parent // Extract the schedule from the parent item

          // Loop through each day in the schedule
          for (const day in schedule) {
            const daySchedule = schedule[day]
            // Check if the day's schedule is an array before calling forEach
            if (Array.isArray(daySchedule)) {
              daySchedule.forEach(
                (session: { _id: string | mongoose.Types.ObjectId }) => {
                  // Check if _id is already an ObjectId or a string
                  const id =
                    typeof session._id === 'string'
                      ? new mongoose.Types.ObjectId(session._id) // Convert string to ObjectId
                      : session._id // Already an ObjectId, use it directly

                  allIds.push(id) // Collect the ObjectId
                }
              )
            }
          }
        })

        return allIds
      }
      const ids = getAllIdsFromParent(activities)
      // Fetch reservations for sessions that fall within the specified date range

      const reservations = await dbReservations
        .find({
          activityId: { $in: ids },
          $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
        })
        .populate('guest')

      // Build a map for reservations by session (activityId)
      const reservationMap: Record<string, Reservation[]> = {}
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest || reservation.guestName
        let reservationStatus = reservation.status

        // Update status based on date
        if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates') &&
          currentDate >= reservation.startDate &&
          currentDate <= reservation.endDate
        ) {
          reservationStatus = 'Checked-In'
        } else if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates' ||
            reservationStatus === 'Checked-In') &&
          currentDate > reservation.endDate
        ) {
          reservationStatus = 'Checked-Out'
        }

        const reservationItem: Reservation = {
          id: reservation._id,
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : reservation.guest
              ? `${guest.firstName} ${guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservationStatus,
          notes: reservation.notes,
        }

        if (!reservationMap[reservation.activityId.toString()]) {
          reservationMap[reservation.activityId.toString()] = []
        }
        //@ts-ignore
        reservationMap[reservation.activityId.toString()].push(reservationItem)
      })
      const items = activities.map((activity) => {
        const privateActivities: {
          name: string
          startTime?: string
          endTime?: string
          status: string
          id: string
        }[] = []

        for (const day in activity.schedule) {
          const daySchedule = activity.schedule[day as keyof Schedule]
          if (Array.isArray(daySchedule)) {
            // Flatten and provide default values
            privateActivities.push(
              ...daySchedule.map((session) => {
                const activityReservations =
                  reservationMap[session._id.toString()] || []

                const isOccupied = activityReservations.length > 0
                return {
                  id: session._id.toString(), // Ensure _id is a string
                  name: `${day} : ${session.startTime || '00:00'} - ${session.endTime || '00:00'}`,
                  status: isOccupied ? 'occupied' : 'available',
                  reservations: activityReservations,
                }
              })
            )
          }
        }

        return {
          id: activity._id,
          name: activity.title || 'Unknown name',
          price: activity.pricePerSlot,
          pricePerDates: activity?.pricePerDates.map((priceDate) => ({
            fromDate: priceDate.fromDate,
            toDate: priceDate.toDate,
            price: priceDate?.price,
          })),
          privateActivities: privateActivities,
        }
      })

      // Respond with the processed activity calendar
      res.json(
        response.success({
          //@ts-ignore
          items: items.filter((item) => item.privateActivities.length > 0),
          allItemCount: items.length,
          message: 'Private activities calendar fetched successfully.',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getJoinerActivityCalendar = async (
  req: Request,
  res: Response
) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  const currentDate = new Date()
  currentDate.setUTCHours(0, 0, 0, 0)

  try {
    // Fetch private activities where the experienceType is 'private' and host matches the current user
    const activities = await dbActivities.find({
      experienceType: 'joiner',
      host: res.locals.user.id,
    })

    if (!activities.length) {
      res.json(
        response.success({
          items: [],
          message: 'No private activities found.',
        })
      )
    } else {
      // Flatten all activity schedule sessions and get their _id values

      const getAllIdsFromParent = (parentSchedule: any[]) => {
        const allIds: mongoose.Types.ObjectId[] = [] // Explicitly type as ObjectId array

        // Loop through each parent object
        parentSchedule.forEach((parent) => {
          const { schedule } = parent // Extract the schedule from the parent item

          // Loop through each day in the schedule
          for (const day in schedule) {
            const daySchedule = schedule[day]
            // Check if the day's schedule is an array before calling forEach
            if (Array.isArray(daySchedule)) {
              daySchedule.forEach(
                (session: { _id: string | mongoose.Types.ObjectId }) => {
                  // Check if _id is already an ObjectId or a string
                  const id =
                    typeof session._id === 'string'
                      ? new mongoose.Types.ObjectId(session._id) // Convert string to ObjectId
                      : session._id // Already an ObjectId, use it directly

                  allIds.push(id) // Collect the ObjectId
                }
              )
            }
          }
        })

        return allIds
      }
      const ids = getAllIdsFromParent(activities)
      // Fetch reservations for sessions that fall within the specified date range

      const reservations = await dbReservations
        .find({
          activityId: { $in: ids },
          $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
        })
        .populate('guest')

      // Build a map for reservations by session (activityId)
      const reservationMap: Record<string, Reservation[]> = {}
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest || reservation.guestName
        let reservationStatus = reservation.status

        // Update status based on date
        if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates') &&
          currentDate >= reservation.startDate &&
          currentDate <= reservation.endDate
        ) {
          reservationStatus = 'Checked-In'
        } else if (
          (reservationStatus === 'Confirmed' ||
            reservationStatus === 'Blocked-Dates' ||
            reservationStatus === 'Checked-In') &&
          currentDate > reservation.endDate
        ) {
          reservationStatus = 'Checked-Out'
        }

        const reservationItem: Reservation = {
          id: reservation._id,
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : reservation.guest
              ? `${guest.firstName} ${guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservationStatus,
          notes: reservation.notes,
        }

        if (!reservationMap[reservation.activityId.toString()]) {
          reservationMap[reservation.activityId.toString()] = []
        }
        //@ts-ignore
        reservationMap[reservation.activityId.toString()].push(reservationItem)
      })
      const items = activities.map((activity) => {
        const joinerActivities: {
          name: string
          startTime?: string
          endTime?: string
          status: string
          id: string
        }[] = []

        for (const day in activity.schedule) {
          const daySchedule = activity.schedule[day as keyof Schedule]
          if (Array.isArray(daySchedule)) {
            // Flatten and provide default values
            joinerActivities.push(
              ...daySchedule.map((session) => {
                const activityReservations =
                  reservationMap[session._id.toString()] || []

                const isOccupied = activityReservations.length > 0
                return {
                  id: session._id.toString(), // Ensure _id is a string
                  name: `${day} : ${session.startTime || '00:00'} - ${session.endTime || '00:00'}`,
                  status: isOccupied ? 'occupied' : 'available',
                  reservations: activityReservations,
                }
              })
            )
          }
        }

        return {
          id: activity._id,
          name: activity.title || 'Unknown name',
          price: activity.pricePerSlot,
          pricePerDates: activity?.pricePerDates.map((priceDate) => ({
            fromDate: priceDate.fromDate,
            toDate: priceDate.toDate,
            price: priceDate?.price,
          })),
          joinerActivities: joinerActivities,
        }
      })

      // Respond with the processed activity calendar
      res.json(
        response.success({
          //@ts-ignore
          items,
          allItemCount: items.length,
          message: 'Joiner activities calendar fetched successfully.',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addActivityPricePerDates = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const { fromDate, toDate, price } = req.body
  try {
    const getActivity = await dbActivities.findOne({
      _id: activityId,
      deletedAt: null,
    })
    if (!getActivity) {
      res.json(response.error({ message: 'Activity not found on our system' }))
    } else {
      if (!fromDate || !toDate || !price) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        const newFromDate = new Date(fromDate)
        const newToDate = new Date(toDate)

        const isConflict = getActivity?.pricePerDates.some((dateRange: any) => {
          const existingFromDate = new Date(dateRange.fromDate)
          const existingToDate = new Date(dateRange.toDate)
          return newFromDate <= existingToDate && newToDate >= existingFromDate
        })

        if (isConflict) {
          res.json(
            response.error({
              message: 'The date range conflicts with existing price periods.',
            })
          )
        } else {
          const newPricePerDates = {
            fromDate: newFromDate,
            toDate: newToDate,
            price: price,
          }

          await dbActivities.findByIdAndUpdate(
            activityId,
            {
              $push: {
                pricePerDates: newPricePerDates,
              },
            },
            { new: true }
          )

          res.json(
            response.success({
              item: newPricePerDates,
              message: 'Price for specific dates successfully set',
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

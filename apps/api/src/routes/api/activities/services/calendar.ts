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
  _id: string // Assuming _id can be either type
  startTime: string
  endTime: string
  ids?: { _id?: string; name: string }[]
}

interface DaySchedule {
  slots?: Session[]
  _id: mongoose.Types.ObjectId
}

interface Schedule {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

interface ParentSchedule {
  schedule: Record<string, DaySchedule> // Object with keys as day names and values as DaySchedule
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
      host: res.locals.user.id,
      $or: [{ experienceType: 'private' }, { experienceType: 'Private' }],
    })

    if (!activities.length) {
      res.json(
        response.success({
          items: [],
          message: 'No private activities found.',
        })
      )
    } else {
      const getAllSlotIds = (dataArray: any[]) => {
        const allSlotsIds: any[] = [] // Declare the array to hold all slot IDs

        dataArray.forEach((data) => {
          // Check if the current item has a schedule property
          const schedule = data.schedule

          // Ensure the schedule exists before trying to access it
          if (schedule) {
            for (const day in schedule) {
              // Check if the day has slots and the slots array has elements
              if (schedule[day]?.slots?.length > 0) {
                schedule[day].slots.forEach((slot: any) => {
                  allSlotsIds.push(slot._id) // Push to the array
                })
              }
            }
          }
        })

        return allSlotsIds // Return the collected IDs
      }

      const ids = getAllSlotIds(activities)
      // Fetch reservations for sessions that fall within the specified date range
      const reservations = await dbReservations
        .find({
          'activityIds.timeSlotId': { $in: ids },
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

        if (!reservationMap[reservation.activityIds.timeSlotId.toString()]) {
          reservationMap[reservation.activityIds.timeSlotId.toString()] = []
        }
        //@ts-ignore
        reservationMap[reservation.activityIds.timeSlotId.toString()].push(
          reservationItem
        )
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
          if (Array.isArray(daySchedule.slots)) {
            // Flatten and provide default values
            privateActivities.push(
              ...daySchedule.slots.map((session) => {
                const activityReservations =
                  reservationMap[session._id.toString()] || []

                const isOccupied = activityReservations.length > 0
                return {
                  id: session._id.toString(), // Ensure _id is a string
                  name: `${day.toUpperCase().slice(0, 3)} : ${session.startTime || '00:00'} - ${session.endTime || '00:00'}`,
                  note: session.note ? session.note : '',
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
      host: res.locals.user.id,
      $or: [{ experienceType: 'joiner' }, { experienceType: 'Joiner' }],
    })

    if (!activities.length) {
      res.json(
        response.success({
          items: [],
          message: 'No private activities found.',
        })
      )
    } else {
      const getAllSlotIds = (dataArray: any[]) => {
        const allSlotsIds: any[] = [] // Declare the array to hold all slot IDs

        dataArray.forEach((data) => {
          // Check if the current item has a schedule property
          const schedule = data.schedule

          // Ensure the schedule exists before trying to access it
          if (schedule) {
            for (const day in schedule) {
              // Check if the day has slots and the slots array has elements
              if (schedule[day]?.slots?.length > 0) {
                schedule[day].slots.forEach((slot: any) => {
                  slot.slotIdsId.forEach((idObj: any) => {
                    allSlotsIds.push(idObj._id) // Push to the array
                  })
                })
              }
            }
          }
        })

        return allSlotsIds // Return the collected IDs
      }

      const ids = getAllSlotIds(activities)
      // Fetch reservations for sessions that fall within the specified date range
      const reservations = await dbReservations
        .find({
          'activityIds.slotIdsId': { $in: ids },
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

        if (!reservationMap[reservation.activityIds.slotIdsId.toString()]) {
          reservationMap[reservation.activityIds.slotIdsId.toString()] = []
        }
        //@ts-ignore
        reservationMap[reservation.activityIds.slotIdsId.toString()].push(
          reservationItem
        )
      })
      const items = activities.map((activity) => {
        const joinerActivities: {
          name: string
          startTime?: string
          endTime?: string
          id: string
          slots: any[]
        }[] = []

        for (const day in activity.schedule) {
          const daySchedule = activity.schedule[day as keyof Schedule]
          if (Array.isArray(daySchedule.slots)) {
            // Flatten and provide default values
            joinerActivities.push(
              ...daySchedule.slots.map((session) => {
                const slotsItems = session.slotIdsId?.map((idObj) => {
                  const slotReservations =
                    reservationMap[idObj._id.toString()] || []
                  const isOccupied = slotReservations.length > 0
                  return {
                    id: idObj._id,
                    name: idObj.name ? idObj.name : 'Unknown',
                    status: isOccupied ? 'occupied' : 'available',
                    reservations: slotReservations,
                  }
                })
                return {
                  id: session._id.toString(), // Ensure _id is a string
                  name: `${day.toUpperCase().slice(0, 3)} : ${session.startTime || '00:00'} - ${session.endTime || '00:00'}`,
                  price: activity.pricePerPerson,
                  pricePerDates: activity?.pricePerDates.map((priceDate) => ({
                    fromDate: priceDate.fromDate,
                    toDate: priceDate.toDate,
                    price: priceDate?.price,
                  })),
                  slots: Array.isArray(slotsItems) ? slotsItems : [],
                }
              })
            )
          }
        }

        return {
          id: activity._id,
          name: activity.title || 'Unknown name',
          joinerActivities: joinerActivities,
        }
      })

      // Respond with the processed activity calendar
      res.json(
        response.success({
          //@ts-ignore
          items: items.filter((item) => item.joinerActivities.length > 0),
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

export const editPrivateActivitySlotNote = async (
  req: Request,
  res: Response
) => {
  const { id, note } = req.body

  try {
    if (!id || !note) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ]
      const activity = await dbActivities.findOne({
        $or: daysOfWeek.map((day) => ({
          [`schedule.${day}.slots._id`]: id,
        })),
      })

      if (activity) {
        // Loop through the days to find and update the slot
        daysOfWeek.forEach((day) => {
          //@ts-ignore
          const slots = activity?.schedule[day]?.slots
          const slotToUpdate = slots.find(
            (slot: { _id: string; note: string }) => slot._id.toString() === id
          )
          if (slotToUpdate) {
            slotToUpdate.note = note // Update the note
          }
        })
        const updatedActivity = await activity.save()
        res.json(
          response.success({
            item: updatedActivity,
            message: 'Slot note successfully updated',
          })
        )
      } else {
        res.json(response.error({ message: 'No slots found' }))
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

export const editJoinerActivitySlotName = async (
  req: Request,
  res: Response
) => {
  const { id, name } = req.body

  try {
    if (!id || !name) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ]
      const activity = await dbActivities.findOne({
        $or: daysOfWeek.map((day) => ({
          [`schedule.${day}.slots.slotIdsId._id`]: id,
        })),
      })
      if (activity) {
        // Loop through the days to find and update the slot
        daysOfWeek.forEach((day) => {
          //@ts-ignore
          const slots = activity?.schedule[day]?.slots
          if (slots) {
            // Find the slot that matches the given ID and update its name
            const slotToUpdate = slots.find((slot: any) =>
              slot.slotIdsId.some(
                (slotIdObj: any) => slotIdObj._id.toString() === id
              )
            )

            if (slotToUpdate) {
              // Update the slot's name
              slotToUpdate.slotIdsId.forEach((slotIdObj: any) => {
                if (slotIdObj._id.toString() === id) {
                  slotIdObj.name = name // Update the name
                }
              })
            }
          }
        })
        const updatedActivity = await activity.save()
        res.json(
          response.success({
            item: updatedActivity,
            message: 'Slot note successfully updated',
          })
        )
      } else {
        res.json(response.error({ message: 'No slots found' }))
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

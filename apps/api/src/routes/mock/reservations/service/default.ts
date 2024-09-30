import { Request, Response } from 'express'
import { reservations } from './jsons/reservations'
import { ResponseService } from '@/common/service/response'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'
import { format } from 'date-fns'

const response = new ResponseService()

export const getReservationsByGuest = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const guestId = req.params.guestId

  if (guestId !== userId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const filterReservations = reservations.filter((item) => {
    return guestId === item.guest._id
  })

  res.json(
    response.success({
      items: filterReservations,
      allItemCount: filterReservations.length,
    })
  )
}

export const getReservationsByHost = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const statusFilter = req.query.status
  const listingTypeFilter = req.query.category
  const yearFilter = req.query.year
  const month = req.query.month || ''

  const monthFilter = month === 'All' ? '' : month

  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const filterReservations = reservations.filter((item) => {
    const startDate = new Date(item.startDate)
    const startDateMonth = format(startDate, 'LLLL')
    const dateCondition =
      (yearFilter &&
        monthFilter &&
        String(startDate.getFullYear()) === yearFilter &&
        startDateMonth === monthFilter) ||
      (yearFilter &&
        !monthFilter &&
        String(startDate.getFullYear()) === yearFilter)
    return (
      item.host._id === String(hostId) &&
      item.listingType === listingTypeFilter &&
      item.status === statusFilter &&
      dateCondition
    )
  })

  res.json(
    response.success({
      items: filterReservations,
      allItemCount: filterReservations.length,
    })
  )
}

export const getReservationsById = async (req: Request, res: Response) => {
  const reservationId = req.params.reservationId

  const filterReservations = reservations.find((item) => {
    return reservationId === item._id
  })

  res.json(
    response.success({
      item: filterReservations,
    })
  )
}

export const addReservation = async (req: Request, res: Response) => {
  const userId = Number(res.locals.user?.id)
  const { propertyId, startDate, endDate } = req.body

  if (!propertyId || !startDate || !endDate) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  res.json(
    response.success({
      item: reservations,
      message: 'New reservation has been successfully added.',
    })
  )
}

export const updateReservation = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const reservationId = req.params.reservationId

  const { propertyId, startDate, endDate, guestList, bookedUnits } = req.body
  const findReservation = reservations.findIndex(
    (item) => item._id === reservationId
  )

  if (findReservation === -1) {
    res.json(
      response.error({ message: 'No reservation found or already deleted' })
    )
  }

  const updatedReservation = {
    ...reservations[findReservation],
    propertyId: propertyId,
    startDate: startDate,
    endDate: endDate,
    guestList: guestList,
    bookedUnits: bookedUnits,
  }
  if (reservations[findReservation]?.guest._id !== userId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  // @ts-ignore
  reservations[findReservation] = updatedReservation
  res.json(
    response.success({
      item: reservations[findReservation],
      message: 'Reservation successfully updated',
    })
  )
}

export const deleteReservation = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const reservationId = req.params.reservationId

  if (!reservationId) {
    res.json(response.error({ message: 'No reservation id provided' }))
  }

  const findReservationIndex = reservations.findIndex(
    (item) => item._id === reservationId
  )
  // @ts-ignore
  const deletedReservation = []

  if (findReservationIndex !== -1) {
    if (reservations[findReservationIndex]?.guest._id !== userId) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    deletedReservation.push(reservations.splice(findReservationIndex, 1)[0])
  }

  if (deletedReservation.length === 0) {
    res.json(
      response.error({ message: 'No reservation found with provided ID' })
    )
  }

  res.json({
    message: 'Reservation deleted successfully',
    items: deletedReservation,
  })
}

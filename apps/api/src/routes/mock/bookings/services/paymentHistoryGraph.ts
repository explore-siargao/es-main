import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getPaymentHistoryGraph = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const dateType = req.params.date
  const completedDate = new Date(dateType as string).toLocaleDateString(
    'en-US',
    { month: '2-digit', day: '2-digit', year: 'numeric' }
  )

  const getCompletedStatus = earnings.filter((item) => {
    const dateYear = new Date(item.date).getFullYear()
    const dateCompleted = new Date(item.date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    const month = new Date(item.date).toLocaleDateString('en-US', {
      month: 'long',
    })
    const year = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
    })
    const monthYear = `${month}-${year}`

    if (dateType === 'all') {
      return item.status === 'Completed'
    } else if (dateType === String(dateYear)) {
      return item.status === 'Completed' && String(dateYear) === dateType
    } else if (completedDate === dateCompleted) {
      return item.status === 'Completed' && completedDate === dateCompleted
    } else if (
      dateType?.toLocaleLowerCase() === monthYear.toLocaleLowerCase()
    ) {
      return (
        item.status === 'Completed' &&
        dateType.toLocaleLowerCase() === monthYear.toLocaleLowerCase()
      )
    }
    return false
  })

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const getCancelledStatus = earnings.filter((item) => {
    const dateYear = new Date(item.date).getFullYear()
    const dateCompleted = new Date(item.date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    const month = new Date(item.date).toLocaleDateString('en-US', {
      month: 'long',
    })
    const year = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
    })
    const monthYear = `${month}-${year}`

    if (dateType === 'all') {
      return item.status === 'Cancelled'
    } else if (dateType === String(dateYear)) {
      return item.status === 'Cancelled' && String(dateYear) === dateType
    } else if (completedDate === dateCompleted) {
      return item.status === 'Cancelled' && completedDate === dateCompleted
    } else if (
      dateType?.toLocaleLowerCase() === monthYear.toLocaleLowerCase()
    ) {
      return (
        item.status === 'Cancelled' &&
        dateType.toLocaleLowerCase() === monthYear.toLocaleLowerCase()
      )
    }
    return false // Return false if none of the conditions are met
  })

  // sums
  const sumOfCompleted = getCompletedStatus.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )
  const sumOfCancelled = getCancelledStatus.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )

  res.json(
    response.success({
      item: {
        completed: sumOfCompleted,
        cancelled: sumOfCancelled,
        total: sumOfCompleted + sumOfCancelled,
      },
    })
  )
}

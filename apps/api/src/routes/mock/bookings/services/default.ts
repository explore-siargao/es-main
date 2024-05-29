import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { toReviews } from './jsons/toReview'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()
export const getBookingsToreviews = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const dateNow = new Date()
  const toReviewsData = toReviews.filter((item) => {
    const today = new Date(item.toDate)
    return dateNow > today
  })

  if (!toReviews.some((item) => item.id === userId)) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  res.json(
    response.success({
      items: toReviewsData,
      allItemCount: toReviewsData.length,
    })
  )
}

export const getToReviewById = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const id = Number(req.params.id)
  const getOne = toReviews.find((item) => item.id === id)
  if (!toReviews.some((item) => item.id === userId)) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  res.json(response.success({ item: getOne, allItemCount: 1 }))
}

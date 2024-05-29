import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { notifications } from './jsons/notifications'

const response = new ResponseService()
export const getNotificationsByHost = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const filterNotifications = notifications
    .filter((notif) => {
      return hostId === notif.listing.hostId
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
  res.json(
    response.success({
      items: filterNotifications,
      allItemCount: filterNotifications.length,
    })
  )
}

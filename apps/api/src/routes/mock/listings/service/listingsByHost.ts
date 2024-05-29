import { Request, Response } from 'express'
import { listingsByHost } from './jsons/listingsByHost'
import { ResponseService } from '@/common/service/response'

const response = new ResponseService()
export const getListingsByHost = async (req: Request, res: Response) => {
  const hostId = Number(res.locals.user.id)
  const filterListings = listingsByHost.filter((listing) => {
    return listing.hostId === hostId
  })
  res.json(
    response.success({
      items: filterListings,
      allItemCount: filterListings.length,
    })
  )
}

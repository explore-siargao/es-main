import { Request, Response } from 'express'
import { prisma } from '@/common/helpers/prismaClient'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()
export const getHostDetailsInListing = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const listingId = Number(req.params.listingId)
  try {
    const getHost = await prisma.user.findFirst({
      where: {
        id: hostId,
        isHost: true,
        deletedAt: null,
      },
      include: {
        guest: true,
      },
    })
    const getListing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        hostedById: hostId,
        deletedAt: null,
      },
      include: {
        review: true,
        houseRules: {
          include: {
            rules: true,
          },
        },
      },
    })
    if (!getHost) {
      return res.json(response.error({ message: 'User Host not found' }))
    }
    if (!getListing) {
      return res.json(response.error({ message: 'No Listing found' }))
    }
    const totalReviews = getListing.review.length
    const returnData = {
      hostName: getHost.guest?.firstName + ' ' + getHost.guest?.lastName,
      hostProfilePic: getHost.profilePicture,
      joinedIn: getHost.createdAt,
      countReviews: totalReviews !== 0 ? totalReviews : 'No reviews yet',
      rules: getListing.houseRules[0],
      responseRate: 100, // no yet formula for resonse rate,
      responseTime: 'with a few hours', // no formula yet for response time
    }
    res.json(
      response.success({
        item: returnData,
        allItemCount: 1,
        message: '',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

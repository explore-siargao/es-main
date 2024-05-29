import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllHouseRules = async (req: Request, res: Response) => {
  try {
    const getAllHouseRules = await prisma.houseRule.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        rules: true,
      },
    })
    if (getAllHouseRules.length !== 0) {
      res.json(
        response.success({
          items: getAllHouseRules,
          allItemCount: getAllHouseRules.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getAllHouseRules,
          allItemCount: getAllHouseRules.length,
          message: 'No House rules data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getAllHouseRulesByListing = async (
  req: Request,
  res: Response
) => {
  const listingId = Number(req.params.listingId)
  try {
    const getListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    })
    if (!getListing) {
      return res.json(
        response.error({ message: 'This listing is not found on our system' })
      )
    }
    const getHouseRulesByListingId = await prisma.houseRule.findFirst({
      where: {
        listingId: listingId,
      },
      include: {
        rules: true,
      },
    })
    if (getHouseRulesByListingId?.rules.length !== 0) {
      res.json(
        response.success({
          item: getHouseRulesByListingId,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          item: getHouseRulesByListingId,
          allItemCount: 1,
          message: 'No House rules data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getHouseRule = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getHouseRuleById = await prisma.houseRule.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        rules: true,
      },
    })
    if (getHouseRuleById) {
      res.json(
        response.success({
          item: getHouseRuleById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          item: getHouseRuleById,
          allItemCount: 0,
          message: 'No House rule data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateHouseRule = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { title } = req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getHouseRule = await prisma.houseRule.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getHouseRule) {
      return res.json(response.error({ message: 'No house rule data found' }))
    }
    if (title) {
      const updateHouseRuleById = await prisma.houseRule.update({
        where: {
          id: id,
        },
        data: {
          title: title,
        },
      })
      res.json(
        response.success({
          item: updateHouseRuleById,
          allItemCount: 1,
          message: 'House rule successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteHouseRule = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getHouseRule = await prisma.houseRule.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getHouseRule) {
      return res.json(
        response.error({
          message: 'House Rule data already deleted or not found',
        })
      )
    }
    const removeHouseRule = await prisma.houseRule.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeHouseRule,
        allItemCount: 1,
        message: 'House Rule successfully deleted',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

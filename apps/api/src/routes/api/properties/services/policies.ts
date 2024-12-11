import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Policy } from '@repo/contract'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getPoliciesByProperty = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  try {
    const property = await dbProperties.findOne({
      _id: propertyId,
      offerBy: userId,
      deletedAt: null,
    })

    if (!property) {
      res.json(response.error({ message: 'Property not found!' }))
    } else {
      const policies = property?.policies

      res.json(response.success({ items: policies }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePolicyByProperty = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const policies: T_Property_Policy[] = req.body.policies
  const getProperty = await dbProperties.findOne({
    _id: propertyId,
    offerBy: hostId,
    deletedAt: null,
  })
  if (!getProperty) {
    res.json(response.error({ message: 'Property not found' }))
  } else {
    if (!policies || !Array.isArray(policies)) {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY + ' or data format is not valid',
        })
      )
    } else {
      try {
        const truePolicies = policies.filter(
          (policy) => policy.isSelected === true
        )
        const newPolicies = await dbProperties.findByIdAndUpdate(propertyId, {
          $set: {
            policies: truePolicies,
          },
          $addToSet:{
            finishedSections:'policies'
          }
        })
        res.json(
          response.success({
            item: newPolicies,
            message: 'Property policies successfullu updated',
          })
        )
      } catch (err: any) {
        res.json(
          response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
          })
        )
      }
    }
  }
}

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Policy } from '@repo/contract'
import { dbPolicies, dbProperties } from '@repo/database'
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
      return res.json(response.error({ message: 'Property not found!' }))
    }
    const policies = property.policies

    return res.json(response.success({ items: policies }))
  } catch (err: any) {
    return res.json(
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
    return res.json(response.error({ message: 'Property not found' }))
  }

  if (!policies || !Array.isArray(policies)) {
    return res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY + ' or data format is not valid',
      })
    )
  }

  const policiesWithoutId = policies.filter((item) => item._id === null)
  const policiesWithId = policies.filter((item) => item._id !== null)

  if (policiesWithoutId.length > 0) {
    policies.forEach(async (item) => {
      if (!item._id) {
        const newPolicies = new dbPolicies({
          index: item.index,
          category: item.category,
          policy: item.policy,
          reason: item.reason,
          isSelected: item.isSelected,
          createdAt: Date.now(),
          updatedAt: null,
          deletedAt: null,
        })

        await newPolicies.save()
        await dbProperties.findByIdAndUpdate(
          propertyId,
          {
            $push: {
              policies: newPolicies._id,
            },
          },
          { new: true }
        )
      }
    })
  }

  if (policiesWithId.length > 0) {
    policiesWithId.forEach(async (item) => {
      if (item._id) {
        await dbPolicies.findByIdAndUpdate(
          item._id,
          {
            $set: {
              index: item.index,
              category: item.category,
              policy: item.policy,
              reason: item.reason,
              isSelected: item.isSelected,
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )
      }
    })
  }

  await dbProperties.findByIdAndUpdate(
    propertyId,
    {
      $set: {
        finishedSections: [
          'type',
          'basicInfo',
          'location',
          'facilities',
          'units',
          'photos',
          'pricing',
          'policies',
        ],
        updatedAt: Date.now(),
      },
    },
    { new: true }
  )

  res.json(
    response.success({
      items: policies,
      message: 'Property policies successfully updated',
    })
  )
}

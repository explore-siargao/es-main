import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Policy, Z_Property_Policy } from '@repo/contract'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updatePolicyByProperty = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const updatedPolicies: T_Property_Policy = req.body.policies
  try {
    if (!Array.isArray(updatedPolicies)) {
      return res.json(
        response.error({ message: 'Invalid type of data in policies' })
      )
    }
    const updatedAddedPolicies = updatedPolicies.filter(
      (updatedPolicy) => updatedPolicy._id || updatedPolicy.isSelected
    )
    const property = await dbProperties.findByIdAndUpdate(
      { _id: propertyId },
      {
        $push: {
          policies: updatedAddedPolicies,
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
        },
        $set: {
          updatedAt: Date.now(),
        },
      },
      { new: true }
    )
    if (!property) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    res.json(
      response.success({
        item: property.policies,
        message: 'Policies successfully updated',
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

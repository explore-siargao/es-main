import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { ResponseService } from '@/common/service/response'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { T_Property_Policy } from '@repo/contract'

const response = new ResponseService()

export const getPoliciesByProperty = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  try {
    const propertyId = Number(req.params.propertyId)
    const property = properties.find((item) => item.id === propertyId)

    if (!isHost || !property?.hostId === userId) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (!property) {
      return res.json(response.error({ message: 'Property not found!' }))
    }

    const policies = property.Policies.map((item) => ({
      id: item.id,
      category: item.category,
      policy: item.policy,
      reason: item.reason,
      propertyId: item.propertyId,
      isSelected: item.isSelected,
    }))

    return res.json(response.success({ item: policies }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePolicyByProperty = async (req: Request, res: Response) => {
  const userId = res.locals.user?.index
  const isHost = res.locals.user.isHost
  const propertyId = Number(req.params.propertyId)
  const updatedPolicies: T_Property_Policy[] = req.body.policies

  if (!Array.isArray(updatedPolicies)) {
    return res.json(
      response.error({ message: 'Invalid type of data in policies' })
    )
  }

  const property = properties.find((item) => item.id === propertyId)

  if (!isHost || !property?.hostId === userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  if (!property) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  const updatedAddedPolicies = updatedPolicies.filter(
    (updatedPolicy) => updatedPolicy.id || updatedPolicy.isSelected
  )

  //@ts-ignore
  property.Policies = updatedAddedPolicies
  property.finishedSections =
    '["type", "basicInfo", "location", "facilities", "units", "photos", "pricing", "policies"]'
  res.json(
    response.success({
      item: property.Policies,
      message: 'Policies successfully updated',
    })
  )
}

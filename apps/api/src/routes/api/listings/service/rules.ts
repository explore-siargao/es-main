import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_Rule } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllRules = async (req: Request, res: Response) => {
  try {
    const rules = await prisma.rule.findMany({
      where: {
        deletedAt: null,
      },
    })
    if (rules.length !== 0) {
      res.json(
        response.success({
          items: rules,
          allItemCount: rules.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: rules,
          allItemCount: rules.length,
          message: 'No rules data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getRulesByHouseRule = async (req: Request, res: Response) => {
  const houseRuleId = Number(req.params.houseRuleId)
  try {
    const getHouseRule = await prisma.houseRule.findUnique({
      where: {
        id: houseRuleId,
      },
    })
    if (!getHouseRule) {
      return res.json(response.error({ message: 'House rule not found' }))
    }
    const getRulesByHouseRuleId = await prisma.rule.findMany({
      where: {
        houseRuleId: houseRuleId,
      },
      include: {
        houseRule: true,
      },
    })
    res.json(
      response.success({
        items: getRulesByHouseRuleId,
        allItemCount: getRulesByHouseRuleId.length,
        message: '',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getRulesBySafetyProperty = async (req: Request, res: Response) => {
  const safetyPropertyId = Number(req.params.safetyPropertyId)
  try {
    const getSafetyProperty = await prisma.safetyProperty.findUnique({
      where: {
        id: safetyPropertyId,
      },
    })
    if (!getSafetyProperty) {
      return res.json(response.error({ message: 'Safety Property not found' }))
    }
    const getRulesBysafetyPropertyId = await prisma.rule.findMany({
      where: {
        safePropertyId: safetyPropertyId,
      },
      include: {
        safetyProperty: true,
      },
    })
    res.json(
      response.success({
        items: getRulesBysafetyPropertyId,
        allItemCount: getRulesBysafetyPropertyId.length,
        message: '',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getRulesByCancellationPolicy = async (
  req: Request,
  res: Response
) => {
  const cancelPolicyId = Number(req.params.cancelPolicyId)
  try {
    const getCancellationPolicy = await prisma.cancellationPolicy.findUnique({
      where: {
        id: cancelPolicyId,
      },
    })
    if (!getCancellationPolicy) {
      return res.json(
        response.error({ message: 'Cancellation Policy not found' })
      )
    }
    const getRulesByCancellationPolicy = await prisma.rule.findMany({
      where: {
        cancellationPolicyId: cancelPolicyId,
      },
      include: {
        cancallationPolicy: true,
      },
    })
    res.json(
      response.success({
        items: getRulesByCancellationPolicy,
        allItemCount: getRulesByCancellationPolicy.length,
        message: '',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

const addRule = async (req: Request, res: Response, ruleType: string) => {
  const userId = Number(req.params.userId)
  const { title, listingId, icon, rule, description } = req.body
  const inputIsValid = Z_Rule.safeParse(req.body)

  if (!inputIsValid.success) {
    return res.json(
      response.error({ message: JSON.parse(inputIsValid.error.message) })
    )
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const existingHouseRule = await prisma.houseRule.findFirst({
      where: {
        title: title,
        listingId: listingId,
      },
    })

    let houseRuleId

    if (existingHouseRule) {
      houseRuleId = existingHouseRule.id
    } else {
      const newHouseRule = await prisma.houseRule.create({
        data: {
          title: title,
          listingId: listingId,
        },
      })

      houseRuleId = newHouseRule.id
    }

    const associationField =
      ruleType === 'safetyProperty' ? 'safePropertyId' : 'houseRuleId'

    const newRule = await prisma.rule.create({
      data: {
        icon: icon,
        rule: rule,
        description: description,
        [associationField]: houseRuleId,
      },
    })

    res.json(
      response.success({
        item: newRule,
        allItemCount: 1,
        message: 'Rule successfully added',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addSafetypropertyRule = async (req: Request, res: Response) => {
  await addRule(req, res, 'safetyProperty')
}

export const addHouseRule = async (req: Request, res: Response) => {
  await addRule(req, res, 'houseRule')
}

export const addCancellationPolicy = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { title, listingId, icon, rule, description, cancelationDueDate } =
    req.body
  const inputIsValid = Z_Rule.safeParse(req.body)
  if (!inputIsValid.success) {
    return res.json(
      response.error({ message: JSON.parse(inputIsValid.error.message) })
    )
  }
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    const newCancellationPolicy = await prisma.cancellationPolicy.create({
      data: {
        title: title,
        listingId: listingId,
        cancelationDueDate: cancelationDueDate,
      },
    })
    const newRule = await prisma.rule.create({
      data: {
        icon: icon,
        rule: rule,
        description: description,
        cancellationPolicyId: newCancellationPolicy.id,
      },
    })
    res.json(
      response.success({
        item: newRule,
        allItemCount: 1,
        message: 'Rule successfully added',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateRule = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const ruleId = Number(req.params.ruleId)
  const { icon, rule, description } = req.body
  if (icon || rule || description) {
    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      const getRule = await prisma.rule.findUnique({
        where: {
          id: ruleId,
        },
      })
      if (!getUser) {
        return res.json(response.error({ message: USER_NOT_EXIST }))
      }
      if (!getRule) {
        return res.json(response.error({ message: 'Rule not found' }))
      }
      const updateRule = await prisma.rule.update({
        where: {
          id: ruleId,
        },
        data: {
          icon: icon,
          rule: rule,
          description: description,
        },
      })
      res.json(
        response.success({
          item: updateRule,
          allItemCount: 1,
          message: 'Rule successfully updated',
        })
      )
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const deleteRule = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const ruleId = Number(req.params.ruleId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getRule = await prisma.rule.findUnique({
      where: {
        id: ruleId,
      },
    })
    if (!getUser) {
      return res.json(
        response.error({
          message: USER_NOT_EXIST,
        })
      )
    }
    if (!getRule) {
      return res.json(
        response.error({
          message: 'Rule not found or already deleted',
        })
      )
    }
    const removeRule = await prisma.rule.delete({
      where: {
        id: ruleId,
      },
    })
    res.json(
      response.success({
        item: removeRule,
        allItemCount: 1,
        message: 'Rule sucessfully deleted',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

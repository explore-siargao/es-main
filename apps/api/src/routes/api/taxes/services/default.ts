import { ResponseService } from '@/common/service/response'
import { prisma } from '@/common/helpers/prismaClient'
import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_Taxes } from '@repo/contract'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getVat = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  try {
    const getTaxesByUserId = await prisma.tax.findFirst({
      where: {
        userId: userId,
      },
    })

    if (getTaxesByUserId) {
      res.json(response.success({ item: getTaxesByUserId }))
    } else {
      res.json(response.error({ message: 'No VAT records found' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addUpdateVat = async (req: Request, res: Response) => {
  const {
    countryRegion,
    vatId,
    nameOnRegistration,
    addressLine1,
    addressLine2,
    city,
    provinceRegion,
    zipPostalCode,
    userId,
  } = req.body
  const vat = {
    countryRegion,
    vatId,
    nameOnRegistration,
    addressLine1,
    addressLine2,
    city,
    provinceRegion,
    zipPostalCode,
    userId,
  }
  const validateInputs = Z_Taxes.safeParse(vat)
  if (validateInputs.success) {
    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      if (getUser) {
        const getVat = await prisma.tax.findUnique({
          where: {
            userId: userId,
          },
        })
        if (!getVat) {
          const newTaxes = await prisma.tax.create({
            data: vat,
          })
          res.json(
            response.success({
              item: newTaxes,
              message: 'VAT successfully created',
            })
          )
        } else {
          const updateVat = await prisma.tax.update({
            where: {
              userId: userId,
            },
            data: vat,
          })
          res.json(
            response.success({
              item: updateVat,
              message: 'VAT successfully updated',
            })
          )
        }
      } else {
        res.json(response.error({ message: USER_NOT_EXIST }))
      }
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Taxes } from '@repo/contract'
import { dbTaxes, dbUsers } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const addUpdateVat = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const {
    countryRegion,
    vatId,
    nameOnRegistration,
    addressLine1,
    addressLine2,
    city,
    provinceRegion,
    zipPostalCode,
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
    user: userId,
  }
  const validateInputs = Z_Taxes.safeParse(vat)
  if (validateInputs.success) {
    try {
      const getUser = await dbUsers.findById(userId)
      if (getUser) {
        const getVat = await dbTaxes.findOne({ user: userId }).populate('user')
        if (!getVat) {
          const newVat = new dbTaxes(vat)
          await newVat.save()
          res.json(
            response.success({
              item: newVat,
              message: 'VAT successfully created',
            })
          )
        } else {
          const updateVat = await dbTaxes.findOneAndUpdate(
            { user: userId },
            { ...vat, updatedAt: new Date() },
            { new: true }
          )
          res.json(
            response.success({
              item: updateVat,
              message: 'VAT successfully updated',
            })
          )
        }
      } else {
        res.json(
          response.error({
            message: USER_NOT_EXIST,
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const getVat = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const getTaxesByUserId = await dbTaxes.findOne({
      user: userId,
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

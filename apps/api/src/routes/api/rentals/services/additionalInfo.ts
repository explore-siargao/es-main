import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  T_Rental_Additional_Info,
  Z_Rental_Additional_Info,
} from '@repo/contract'
import { dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const updateAdditionalInfo = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const { policies, daysCanCancel }: T_Rental_Additional_Info = req.body
  if (!policies || !daysCanCancel) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const validAdditionalInfo = Z_Rental_Additional_Info.safeParse(req.body)
      const validRental = await dbRentals.findOne({
        _id: rentalId,
        deletedAt: null,
      })
      if (!validRental) {
        res.json(
          response.error({ message: 'Invalid rental or already deleted' })
        )
      } else {
        if (validAdditionalInfo.success) {
          const updateAddInfo = await dbRentals.findByIdAndUpdate(
            rentalId,
            {
              $set: {
                policies: policies,
                daysCanCancel: daysCanCancel,
              },
            },
            { new: true }
          )

          res.json(
            response.success({
              item: updateAddInfo,
              message: 'Rental Additional Info successfully updated',
            })
          )
        } else {
          console.error(JSON.parse(validAdditionalInfo.error.message))
          res.json(response.error({ message: 'Invalid payload' }))
        }
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
}
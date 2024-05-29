import {
    UNKNOWN_ERROR_OCCURRED,
  } from '@/common/constants'
  import { ResponseService } from '@/common/service/response'
import { dbRentalRates } from '@repo/database'
  import { Request, Response } from 'express'

  const response = new ResponseService()

export const getRentalRates = async (req: Request, res: Response) => {
    const rentalId = req.params.rentalId

    console.log("id: ", rentalId)
    try {
      const getRental = await dbRentalRates.findOne({ _id: rentalId })

        console.log("Get rental", getRental)
      if (!getRental) {
        return res.json(response.error({ message: 'rental not found' }))
      }
      
      res.json(response.success({ item: getRental }))
    } catch (err: any) { 
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
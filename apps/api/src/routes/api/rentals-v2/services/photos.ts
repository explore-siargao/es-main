import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import {
    dbRentals,
  } from '@repo/database'

const response = new ResponseService()

export const getRentalPhotos = async (req: Request, res: Response) => {
    const hostId = res.locals.user?.id
    try {
      const id = req.params.rentalId
      const rental = await dbRentals.findOne(
        { host: hostId, _id: id }
      ).populate('photos')
    
      if (!rental) {
        return res.json(
          response.error({
            message: 'Rental Photos with the given ID not found!',
          })
        )
      } 
      
      const rentalData = {
        id: rental._id,
        photos: rental.photos,
      }
  
      return res.json(
        response.success({
          item: rentalData,
        })
      )
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
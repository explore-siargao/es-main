import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbRentalAddOns, dbRentals } from '@repo/database'
import { T_Rental_AddOns, Z_Rental_AddOns } from '@repo/contract'

const response = new ResponseService()

export const getCalendarRentals = async (req: Request, res: Response) => {
    const hostId = res.locals.user?.id;
    const category = req.params.category;
    const fromDate = req.params.fromDate;
    const toDate = req.params.toDate;
     
    let getCalendarRentals; 
    try {
      if (category && hostId) {
        getCalendarRentals = await dbRentals
          .find({
            category: category,
            host: hostId, 
          })
      } 


   
      res.json(response.success({ item: getCalendarRentals }));
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : 'UNKNOWN_ERROR_OCCURRED',
        })
      );
    }
  };

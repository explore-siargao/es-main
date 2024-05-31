import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/service/response";
import { dbRentals } from "@repo/database";
import { Request, Response } from "express";

const response = new ResponseService()
export const getRentalLocation = async(req:Request, res:Response)=>{
    const hostId = res.locals.user?.id
    const id = req.params.rentalId
    try {
      const getRental = await dbRentals.findOne({
       host: hostId,
       _id:id
    }).populate("location")
      if (!getRental) {
        return res.json(response.error({ message: 'Rental location not found!' }))
      }
      const rentalLocation = getRental?.location
      res.json(response.success({ item: rentalLocation }))
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    } 
}
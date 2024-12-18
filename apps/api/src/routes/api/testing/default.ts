import crypto from "crypto"; // Library for HMAC
import { REQUIRED_VALUE_EMPTY, UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/service/response";
import {dbTesting} from "@repo/database"
import { Request, Response } from "express";
import { HMACService } from "@repo/services";
import { format, differenceInSeconds } from "date-fns";

const response = new ResponseService();
const hmacService = new HMACService()

export const addTesting = async (req: Request, res: Response) => {
  const { firstName, lastName, expirationDate, hmac } = req.body; // Accept HMAC in request

  try {
    if (!firstName || !lastName || !hmac || !expirationDate) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
    }else{
    // 1. Recreate the HMAC with the received data
    const recreatedHMAC = hmacService.generateHMAC({firstName, lastName});
    // 2. Compare the received HMAC with the recreated one
    if (hmac !== recreatedHMAC) {
       res.json(response.error({ message: "Invalid HMAC. Data tampered." }));
    }else{
    // 3. Check if time of request is expired
    const currentDate = new Date()
    const utcDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const expiredDate = format(expirationDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const computedTime = differenceInSeconds(utcDate,expiredDate)
    if(computedTime >30){
      res.json(response.error({message:"Request expired"}))
    }else{
    // 4. Save data to database if HMAC is valid
    const newTesting = new dbTesting({ firstName, lastName });
    await newTesting.save();

    res.json(response.success({ item: newTesting, message: "Successfully added" }));
    }
  }
}
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }

};

import { REQUIRED_VALUE_EMPTY, UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/service/response";
import { dbTesting } from "@repo/database";
import { Request, Response } from "express";
import crypto from "crypto"
const response = new ResponseService()
export const addTesting = async(req:Request, res:Response)=>{
    const {firstName, lastName} = req.body
    try {
        if(!firstName || !lastName){
            res.json(response.error({message:REQUIRED_VALUE_EMPTY}))
        }else{
            const newTesting = new dbTesting({
                firstName,lastName
            })
            await newTesting.save()
            res.json(response.success({item:newTesting, message:"Successfully added"}))
        }
    } catch (err:any) {
        res.json(response.error({message:err.message? err.message : UNKNOWN_ERROR_OCCURRED}))
    }
}
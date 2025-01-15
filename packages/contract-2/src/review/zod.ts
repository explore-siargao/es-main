import {z} from "zod"
import { Z_Address } from "../address-location"
const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Reviewer = z.object({
    _id:z.union([z.string(), objectIdSchema]).optional(),
    email:z.string().email(),
    guest:z.object({
        _id:z.union([z.string(), objectIdSchema]).optional(),
        firstName:z.string(),
        middleName:z.string().optional(),
        lastName:z.string(),
        address:Z_Address 
    })
})

export const Z_Review = z.object({
    _id:z.union([z.string(), objectIdSchema]).optional(),
    reviewerId:z.union([z.string(), objectIdSchema]).optional(),
    cleanlinessRates:z.number(),
    accuracyRates:z.number(),
    checkInRates:z.number(),
    communicationRates:z.number(),
    locationRates:z.number().optional().nullable(),
    valueRates:z.number(),
    comment:z.string(),
    totalRates:z.number(),
    createdAt:z.union([z.string(), z.date()]),
    reviewer:Z_Reviewer
})

export const Z_Add_Review = z.object({
    cleanlinessRates:z.number(),
    accuracyRates:z.number(),
    checkInRates:z.number(),
    communicationRates:z.number(),
    valueRates:z.number(),
    locationRates:z.number(),
    comment:z.string(),
    bookableUnitId:z.union([z.string(), objectIdSchema]).optional().nullable(),
})

export const Z_Reviews = z.array(Z_Review)
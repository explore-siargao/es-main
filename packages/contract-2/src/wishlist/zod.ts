import { z } from "zod"
import { E_Listing_Category } from "./enum"
import { Z_Photo } from "../photos"
import { E_Rental_Category } from "../rentals"
import { Z_Location } from "../address-location"
import { Z_Rental_Price } from "../rentals"
import { E_Experience_Types } from "../activity"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Add_Wishlist = z.object({
  category: z.nativeEnum(E_Listing_Category),
  listingId: z.union([z.string(), objectIdSchema]),
})

export const Z_Property_Wishlist = z.object({
  listingId:z.union([z.string(),objectIdSchema]),
  type:z.string(),
  location:z.object({
    city:z.string(),
    longitude:z.number(),
    latitude:z.number()
  }),
  title:z.string(),
  photos:z.array(z.object({key:z.string()})),
  average:z.number(),
  reviewsCount:z.number(),
  price:z.number()
})

export const Z_Rental_Wishlist = z.object({
  listingId:z.union([z.string(),objectIdSchema]),
  category:z.nativeEnum(E_Rental_Category),
  make:z.string(),
  modelBadge:z.string(),
  year:z.string(),
  location:Z_Location,
  pricing:Z_Rental_Price,
  photos:z.array(Z_Photo),
  reviewsCount:z.number(),
  average:z.number(),
  transmission:z.string(),
  fuel:z.string()
})

export const Z_Activity_Wishlist = z.object({
  listingId:z.union([z.string(),objectIdSchema]),
  title:z.string(),
  activityType:z.array(z.string()),
  meetingPoint:Z_Location,
  experienceType:z.nativeEnum(E_Experience_Types),
  photos:z.array(Z_Photo),
  pricePerPerson:z.number(),
  pricePerSlot:z.number(),
  average:z.number(),
  reviewsCount:z.number(),
})



export const Z_Wishlists = z.array(z.union([Z_Property_Wishlist,Z_Activity_Wishlist,Z_Rental_Wishlist]))

import { z } from "zod"
import { E_Listing_Category } from "./enum"
import { Z_Photo } from "../photos"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Add_Wishlist = z.object({
    category: z.nativeEnum(E_Listing_Category),
    listingId: z.union([z.string(),objectIdSchema])
})

export const Z_Wishlist = z.object({
    _id: z.union([z.string(), objectIdSchema]),
    category:z.nativeEnum(E_Listing_Category),
    listingId:z.union([z.string(), objectIdSchema]),
    userId:z.union([z.string(), objectIdSchema]),
    createdAt:z.union([z.string(),z.date()]).optional().nullable(),
    updatedAt:z.union([z.string(),z.date()]).optional().nullable(),
    deletedAt:z.union([z.string(),z.date()]).optional().nullable(),
    listing:z.object({
        _id:z.union([z.string(), objectIdSchema]),
        title:z.string(),
        subTitle:z.string(),
        subTitle2:z.string().optional().nullable(),
        price:z.number(),
        photos:z.array(Z_Photo)
    })
})

export const Z_Wishlists = z.array(Z_Wishlist)
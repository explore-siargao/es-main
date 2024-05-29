import { z } from "zod"
export const Z_Listing = z.object({
  id: z.number().optional(),
  imageUrls: z
    .array(
      z.object({
        fileKey: z.string(),
        url: z.string().optional(),
        alt: z.string(),
      })
    )
    .optional(),
  title: z.string(),
  category: z.enum(["Accomodation", "Rentals", "Activity"]),
  descriptionId: z.number().optional(),
  address: z.string(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  fee: z.number().optional(),
  cleaningFee: z.number().optional(),
  serviceFee: z.number().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  countGuest: z.number().optional(),
  isNight: z.boolean().optional(),
  guests: z.number().optional(),
  bedRooms: z.number().optional(),
  beds: z.number().optional(),
  bathRooms: z.number().optional(),
  hostedById: z.number().int().optional(),
  basicAboutPlaceId: z.number().optional(),
  listingPriceId: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

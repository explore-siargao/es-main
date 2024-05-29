import { z } from "zod"

export const Z_ListingPlaceOffer = z.object({
  id: z.number().optional(),
  listingId: z.number(),
  placeOfferId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

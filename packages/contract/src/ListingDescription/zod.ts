import { z } from "zod"

export const Z_ListingDescription = z.object({
  id: z.number().optional(),
  listingId: z.number().optional(),
  generalDescription: z.string(),
  aboutSpace: z.string().optional(),
  aboutGuestAccess: z.string().optional(),
  otherThingsNote: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

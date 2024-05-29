import { z } from "zod"

export const Z_ListingHighlight = z.object({
  id: z.number().optional(),
  listingId: z.number(),
  highlightId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

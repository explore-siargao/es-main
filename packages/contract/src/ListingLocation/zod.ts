import { z } from "zod"

export const Z_Listing_Location = z.object({
  streetAddress: z.string(),
  barangay: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  howToGetThere: z.string(),
})

import { string, z } from "zod"

export const Z_Activity_Segment = z.object({
  _id: z.string().optional(),
  index: z.number(),
  activities: z.array(z.string()),
  durationHour: z.number(),
  durationMinute: z.number(),
  location: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  optional: z.boolean(),
  hasAdditionalFee: z.boolean(),
  transfer: z.string().nullable().optional(),
})

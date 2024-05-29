import z from "zod"

export const Z_Itineraries = z.object({
  id: z.number().optional(),
  type: z.boolean().optional(),
  activities: z.string().optional(),
  activityPlace: z.string().optional(),
  durationHour: z.number().optional(),
  durationMinute: z.number().optional(),
  isOptional: z.boolean().optional(),
  isRequiredAdditionalFee: z.boolean().optional(),
  additionalFee: z.number().optional(),
  vehicleType: z.string().optional(),
  destinationNumber: z.number().optional(),
  activityId: z.number().optional(),
})

export const Z_AddItineraries = z.object({
  id: z.number().optional().nullable(),
  type: z.boolean().optional().nullable(),
  activities: z.string().optional().nullable(),
  activityPlace: z.string().optional().nullable(),
  durationHour: z.number().optional().nullable(),
  durationMinute: z.number().optional().nullable(),
  isOptional: z.boolean().optional().nullable(),
  isRequiredAdditionalFee: z.boolean().optional().nullable(),
  additionalFee: z.number().optional().nullable(),
  vehicleType: z.string().optional().nullable(),
  destinationNumber: z.number().optional().nullable(),
  activityId: z.number().optional().nullable(),
})

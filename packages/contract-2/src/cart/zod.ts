import { z } from "zod"

export const Z_Cart = z
  .object({
    id: z.string().optional(),
    userId: z.string().optional(),
    propertyIds: z
      .object({
        propertyId: z.string(),
        unitId: z.string(),
      })
      .optional(),
    rentalIds: z
      .object({
        rentalId: z.string(),
        qtyIdsId: z.string(),
      })
      .optional(),
    activityIds: z
      .object({
        activityId: z.string(),
        dayId: z.string(),
        timeSlotId: z.string(),
        slotIdsId: z.string().optional(),
      })
      .optional(),
    price: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    createdAt: z.date().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),
  })
  .refine((data) => data.propertyIds || data.rentalIds || data.activityIds, {
    message:
      "At least one of propertyIds, rentalIds, or activityIds must be provided.",
    path: ["propertyIds", "rentalIds", "activityIds"],
  })

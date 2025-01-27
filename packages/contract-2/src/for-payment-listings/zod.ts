import { Z_CardInfo } from "@repo/contract"
import { z } from "zod"

export const Z_Add_For_Payment = z.object({
  id: z.string().optional(),
  userId: z.string(),
  propertyIds: z
    .object({
      propertyId: z.string(),
      unitId: z.string(),
    })
    .optional()
    .nullable(),

  rentalIds: z
    .object({
      rentalId: z.string(),
      qtyIdsId: z.string(),
    })
    .optional()
    .nullable(),

  activityIds: z
    .object({
      activityId: z.string(),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),

  guestCount: z.number(),
  price: z.number().optional(),
  hostComission: z.number().optional(),
  guestComission: z.number().optional(),
  startDate: z.union([z.date(),z.string()]),
  endDate: z.union([z.date(),z.string()]),
  status: z.string().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Update_For_Payment = z.object({
  _id: z.string().optional(),
  guestCount: z.number().optional(),
  price: z.number().optional(),
  hostComission: z.number(),
  guestComission: z.number(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  contacts: z
    .array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        email: z.string().email(),
      })
    )
    .optional(),
  updatedAt: z.date().optional(),
})

export const Z_Manual_Card_Payment = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  propertyIds: z
    .object({
      propertyId: z.string(),
      unitId: z.string(),
    })
    .optional()
    .nullable(),

  rentalIds: z
    .object({
      rentalId: z.string(),
      qtyIdsId: z.string(),
    })
    .optional()
    .nullable(),

  activityIds: z
    .object({
      activityId: z.string(),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),

  guestCount: z.number(),
  price: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
  cardInfo: Z_CardInfo,
})

export const Z_Linked_Card_Payment = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  propertyIds: z
    .object({
      propertyId: z.string(),
      unitId: z.string(),
    })
    .optional()
    .nullable(),

  rentalIds: z
    .object({
      rentalId: z.string(),
      qtyIdsId: z.string(),
    })
    .optional()
    .nullable(),

  activityIds: z
    .object({
      activityId: z.string(),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),

  guestCount: z.number(),
  price: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
  cvv: z.string(),
})

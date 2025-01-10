import { Z_Update_Activity_Additional_Info } from "@repo/contract"
import { z } from "zod"
import { E_ReservationStatus, UserRole } from "./enum"
import { Z_Bookable_Unit, Z_Property } from "../property"
import { Z_Activity } from "../activity"
import { Z_Rental } from "../rentals"
import { Z_Guest } from "../guest"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_ReservationCalendar = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  guestCount: z.number(),
  status: z.nativeEnum(E_ReservationStatus),
  notes: z.string().nullable(),
})

export const Z_Add_Reservation = z.object({
  _id: z.string().optional(),
  rentalIds: z
    .object({
      rentalId: z.string(),
      qtyIdsId: z.string(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  propertyIds: z
    .object({
      unitId: z.string(),
      propertyId: z.string(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  activityIds: z
    .object({
      activityId: z.string(),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string().optional(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  startDate: z.string(),
  endDate: z.string(),
  guestName: z.string().optional().nullable(),
  guest: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  paymentMethod: z.string().optional().nullable(),
  xendItPaymentMethodId: z.string().optional().nullable(),
  xendItPaymentRequestId: z.string().optional().nullable(),
  xendItPaymentReferenceId: z.string().optional().nullable(),
  guestCount: z.number(),
  status: z.nativeEnum(E_ReservationStatus),
  hostHavePenalty: z.boolean().optional(),
  cancelledBy: z.nativeEnum(UserRole).optional().nullable(),
  cancellationDate: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  deletedAt: z.string().optional().nullable(),
})

export const Z_Add_Reservations = z.array(Z_Add_Reservation)

export const Z_Reservation = z.object({
  _id:objectIdSchema,
  propertyIds:z.object({
    _id: objectIdSchema,
    unitId:Z_Bookable_Unit,
    propertyId:Z_Property
  }).nullable().optional(),
  
  activityIds:z.object({
    _id:objectIdSchema,
    activityId:Z_Activity,
    dayId:objectIdSchema,
    timeSlotId:objectIdSchema,
    slotIdsId:objectIdSchema.optional(),
  }).nullable().optional(),

  rentalIds:z.object({
    _id:objectIdSchema,
    rentalId:Z_Rental,
    qtyIdsId:objectIdSchema,
  }).nullable().optional(),
  startDate:z.union([z.string(),z.date()]),
  endDate:z.union([z.string(),z.date()]),
  guestName:z.string().optional().nullable(),
  paymentMethod:z.string().optional().nullable(),
  xendItPaymentMethodId:z.string().optional().nullable(),
  xendItPaymentRequestId:z.string().optional().nullable(),
  xendItPaymentReferenceId:z.string().optional().nullable(),
  guestCount:z.number(),
  status:z.nativeEnum(E_ReservationStatus),
  hostHavePenalty:z.boolean().optional(),
  cancelledBy:z.nativeEnum(UserRole).optional().nullable(),
  cancellationDate:z.union([z.string(),z.date()]).optional().nullable(),
  cartId:objectIdSchema.optional().nullable(),
  forPaymenttId:objectIdSchema.optional().nullable(),
  createdAt:z.union([z.string(),z.date()]).optional().nullable(),
  userId:z.object({
    _id:objectIdSchema,
    email:z.string().email(),
    role:z.string(),
    isHost:z.boolean(),
    deactivated:z.boolean(),
    guest:Z_Guest,
    profilePicture:z.string().optional(),
    updatedAt:z.union([z.string(),z.date()]).optional().nullable()
  }).optional().nullable(),
  price:z.number().optional(),
  guestComission:z.number().optional(),
  hostComission:z.number().optional(),
  contacts:z.array(z.object({
    _id:objectIdSchema,
    firstName:z.string(),
    lastName:z.string(),
    phoneNumber:z.string(),
    email:z.string().email(),

  })).optional()
})

export const Z_Reservations = z.array(Z_Reservation)

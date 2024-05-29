import z from "zod"

export const Z_ReservationListing = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  listingId: z.number(),
  reservationDate: z.string(),
  currentFee: z.number(),
  totalFee: z.number(),
  guestCount: z.number(),
  status: z.enum(["Approved", "Pending", "Declined", "Refund"]).optional(),
  isNight: z.boolean(),
  paymentMethodId: z.number(),
  messageToHost: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

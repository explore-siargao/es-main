import { string, z } from "zod"

export const Z_Activity_Slot = z.object({
  _id: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  note: z.string(),
  slotIdsId: z.array(
    z
      .object({
        _id: z.string().optional(),
        name: z.string(),
      })
      .nullable()
      .optional()
  ),
})

export const Z_Activity_Day = z.object({
  _id: z.string().optional(),
  slots: z.array(Z_Activity_Slot).nullable().optional(),
})

export const Z_Activity_Schedule = z.object({
  _id: z.string().optional(),
  monday: Z_Activity_Day.nullable().optional(),
  tuesday: Z_Activity_Day.nullable().optional(),
  wednesday: Z_Activity_Day.nullable().optional(),
  thursday: Z_Activity_Day.nullable().optional(),
  friday: Z_Activity_Day.nullable().optional(),
  saturday: Z_Activity_Day.nullable().optional(),
  sunday: Z_Activity_Day.nullable().optional(),
})

import { z } from "zod"
import { E_Status } from "./enum"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && String(val).length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => String(val))

const Z_User = z.union([
  z.object({
    _id: z.union([z.string(), objectIdSchema]),
    guest: z.object({
      _id: z.union([z.string(), objectIdSchema]),
      firstName: z.string(),
      middleName: z.string().optional().nullable(),
      lastName: z.string(),
    }),
  }),
  z.string(),
  objectIdSchema,
])

export const Z_Add_Host_Approval = z.object({
  businessType: z.string(),
  companyName: z.string(),
  brn: z.string(),
  registeredAddress: z.string(),
  photocopyBusinessPermit: z.object({
    fileKey: z.string(),
    createdAt: z.date(),
  }),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  deletedAt: z.union([z.string(), z.date()]).optional(),
})

export const Z_Host_Approval = z.object({
  _id: z.union([z.string(), objectIdSchema]).optional(),
  userId: Z_User,
  businessType: z.string(),
  companyName: z.string(),
  brn: z.string(),
  registeredAddress: z.string(),
  photocopyBusinessPermit: z.object({
    fileKey: z.string(),
    createdAt: z.union([z.string(), z.date()]),
    _id: z.union([z.string(), objectIdSchema]).optional(),
  }),
  status: z.nativeEnum(E_Status),
  approvedBy: Z_User.nullable(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  deletedAt: z.union([z.string(), z.date()]).optional(),
})

export const Z_Host_Approvals = z.array(Z_Host_Approval)

export const Z_Update_Host_Approval = z.object({
  id: z.union([z.string(), objectIdSchema]),
  businessType: z.string().optional(),
  companyName: z.string().optional(),
  brn: z.string().optional(),
  registeredAddress: z.string().optional(),
  photocopyBusinessPermit: z
    .object({
      fileKey: z.string(),
      createdAt: z.date(),
    })

    .optional(),
})

export const Z_Approve_Reject_Host_Approval = z.object({
  id: z.union([z.string(), objectIdSchema]),
  status: z.nativeEnum(E_Status),
})

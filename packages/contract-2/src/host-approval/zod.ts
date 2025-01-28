import {z} from "zod"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

  export const Z_Add_Host_Approval = z.object({
    businessType:z.string(),
    companyName:z.string(),
    brn:z.string(),
    registeredAddress:z.string(),
    photocopyBusinessPermit: z.array(z.object({
        fileKey: z.string(),
        createdAt: z.date()
    })),
    createdAt: z.union([z.string(), z.date()]).optional(),
  })
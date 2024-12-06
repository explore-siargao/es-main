import { z } from "zod"

const objectIdSchema = z
.any()
.refine(
    (val) => typeof val === "object" && val.toString().length === 24,
    { message: "Invalid ObjectId" }
)
.transform((val) => val.toString());

export const Z_Photo = z.object({
  _id: objectIdSchema.optional(),
  bookableUnitId: objectIdSchema.nullable().optional(),
  propertyId: objectIdSchema.nullable().optional(),
  rentalId: objectIdSchema.nullable().optional(),
  activityId: objectIdSchema.nullable().optional(),
  key: z.string(),
  thumbKey: z.string(),
  isMain: z.boolean(),
  description: z.string(),
  tags: z.string(),
  createdAt: z.union([z.string(),z.date()]).optional(),
  updatedAt: z.union([z.string(),z.date()]).nullable().optional(),
  deletedAt: z.union([z.string(),z.date()]).nullable().optional(),
})

import { z } from "zod"

export const Z_BackendResponse = z.object({
  // DO NOT ADD ANYTHING TO THIS OBJECT
  // THIS IS A FIXED SCHEMA
  error: z.boolean(),
  message: z.nullable(z.union([z.string(), z.any().array()])).optional(),
  item: z.record(z.any()).nullable().optional(),
  items: z.array(z.record(z.any())).nullable().optional(),
  pageItemCount: z.number().optional(),
  allItemCount: z.number().optional(),
  status: z.number().optional(),
  currPage: z.number().optional(),
  action: z
    .object({
      type: z.string(),
      description: z.string().optional(),
      link: z.string().optional(),
    })
    .optional(),
})

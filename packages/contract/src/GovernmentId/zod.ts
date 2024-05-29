import { z } from "zod"
import { E_GovernmentId } from "./enum"

export const Z_GovernmentId = z.object({
  fileKey: z.string(),
  type: z.nativeEnum(E_GovernmentId),
  createdAt: z.date(),
})

export const Z_AddGovernmentId = z.object({
  type: z.nativeEnum(E_GovernmentId),
})

import { z } from "zod"
import { Z_AddGovernmentId, Z_GovernmentId } from "./zod"

export type T_GovernmentId = z.infer<typeof Z_GovernmentId>
export type T_AddGovernmentId = z.infer<typeof Z_AddGovernmentId>

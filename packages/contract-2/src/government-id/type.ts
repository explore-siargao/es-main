import z from "zod"
import { Z_GovernmentId } from "./zod"

export type T_GovernmentId = z.infer<typeof Z_GovernmentId>

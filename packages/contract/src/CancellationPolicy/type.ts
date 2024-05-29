import { z } from "zod"
import { Z_CancellationPolicy } from "./zod"

export type T_CancellationPolicy = z.infer<typeof Z_CancellationPolicy>

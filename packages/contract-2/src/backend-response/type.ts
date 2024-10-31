import { z } from "zod"
import { Z_Backend_Response } from "./zod"

export type T_Backend_Response = z.infer<typeof Z_Backend_Response>

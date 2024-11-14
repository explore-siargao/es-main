import z from "zod"
import { Z_Host } from "./zod"

export type T_Host = z.infer<typeof Z_Host>

import z from "zod"
import { Z_Property_Policy } from "./zod"

export type T_Property_Policy = z.infer<typeof Z_Property_Policy>

import { z } from "zod"
import { Z_Guest } from "./zod"

export type T_Guest = z.infer<typeof Z_Guest>

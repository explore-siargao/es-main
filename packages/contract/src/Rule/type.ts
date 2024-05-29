import { z } from "zod"
import { Z_Rule } from "./zod"

export type T_Rule = z.infer<typeof Z_Rule>

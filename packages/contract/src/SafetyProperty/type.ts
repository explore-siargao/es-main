import { z } from "zod"
import { Z_SafetyProperty } from "./zod"

export type T_SafetyProperty = z.infer<typeof Z_SafetyProperty>

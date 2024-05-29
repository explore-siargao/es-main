import { z } from "zod"
import { Z_Feature } from "./zod"

export type T_Feature = z.infer<typeof Z_Feature>

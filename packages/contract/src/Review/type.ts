import { z } from "zod"
import { Z_Review } from "./zod"

export type T_Review = z.infer<typeof Z_Review>

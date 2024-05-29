import { z } from "zod"
import { Z_HouseRule } from "./zod"

export type T_HouseRule = z.infer<typeof Z_HouseRule>

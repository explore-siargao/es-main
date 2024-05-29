import z from "zod"
import { Z_UnitPrice } from "./zod"

export type T_UnitPrice = z.infer<typeof Z_UnitPrice>

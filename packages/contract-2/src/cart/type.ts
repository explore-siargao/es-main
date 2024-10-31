import z from "zod"
import { Z_Carts } from "./zod"

export type T_Carts = z.infer<typeof Z_Carts>

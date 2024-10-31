import z from "zod"
import { Z_Cart } from "./zod"

export type T_Cart = z.infer<typeof Z_Cart>

import z from "zod"
import { Z_Cart, Z_UpdateCart } from "./zod"

export type T_Cart = z.infer<typeof Z_Cart>
export type T_UpdateCart = z.infer<typeof Z_UpdateCart>

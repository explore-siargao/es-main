import z from "zod"
import { Z_AddCart, Z_UpdateCart, Z_CartItem, Z_Add_CartItems } from "./zod"

export type T_AddCart = z.infer<typeof Z_AddCart>
export type T_CartItem = z.infer<typeof Z_CartItem>
export type T_Add_CartItems = z.infer<typeof Z_Add_CartItems>
export type T_UpdateCart = z.infer<typeof Z_UpdateCart>

import z from "zod"
import { Z_AddCart, Z_UpdateCart, Z_CartItem } from "./zod"

export type T_Add_To_Cart = z.infer<typeof Z_AddCart>
export type T_Cart_Item = z.infer<typeof Z_CartItem>
export type T_Update_Cart = z.infer<typeof Z_UpdateCart>

import z from "zod"
import { Z_Add_To_Cart, Z_Cart_Item, Z_Update_Cart } from "./zod"

export type T_Add_To_Cart = z.infer<typeof Z_Add_To_Cart>
export type T_Cart_Item = z.infer<typeof Z_Cart_Item>
export type T_Update_Cart = z.infer<typeof Z_Update_Cart>

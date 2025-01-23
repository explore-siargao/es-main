import { z } from "zod"
import { Z_Add_Wishlist, Z_Wishlist, Z_Wishlists } from "./zod"

export type T_Add_Wishlist = z.infer<typeof Z_Add_Wishlist>
export type T_Wishlist = z.infer<typeof Z_Wishlist>
export type T_Wishlists = z.infer<typeof Z_Wishlists>

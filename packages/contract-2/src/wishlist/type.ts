import { z } from "zod"
import {
  Z_Add_Wishlist,
  Z_Activity_Wishlist,
  Z_Property_Wishlist,
  Z_Rental_Wishlist,
  Z_Wishlists,
} from "./zod"

export type T_Add_Wishlist = z.infer<typeof Z_Add_Wishlist>
export type T_Wishlists = z.infer<typeof Z_Wishlists>
export type T_Property_Wishlist = z.infer<typeof Z_Property_Wishlist>
export type T_Rental_Wishlist = z.infer<typeof Z_Rental_Wishlist>
export type T_Activity_Wishlist = z.infer<typeof Z_Activity_Wishlist>

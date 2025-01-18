import z from "zod"
import { Z_Review, Z_Reviewer, Z_Reviews, Z_Add_Review } from "./zod"

export type T_Review = z.infer<typeof Z_Review>
export type T_Reviewer = z.infer<typeof Z_Reviewer>
export type T_Reviews = z.infer<typeof Z_Reviews>
export type T_Add_Review = z.infer<typeof Z_Add_Review>

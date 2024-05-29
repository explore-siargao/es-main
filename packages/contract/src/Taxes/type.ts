import z from "zod"
import { Z_Taxes } from "./zod"

export type T_Taxes = z.infer<typeof Z_Taxes>

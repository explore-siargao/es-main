import z from "zod"
import { Z_Address, Z_Location } from "./zod"

export type T_Address = z.infer<typeof Z_Address>
export type T_Location = z.infer<typeof Z_Location>

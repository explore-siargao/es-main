import { z } from "zod"
import { Z_AddUpdateAddress, Z_Address, Z_UpdatePropertyAddress } from "./zod"

export type T_Address = z.infer<typeof Z_Address>
export type T_AddUpdateAddress = z.infer<typeof Z_AddUpdateAddress>
export type T_UpdatePropertyAddress = z.infer<typeof Z_UpdatePropertyAddress>

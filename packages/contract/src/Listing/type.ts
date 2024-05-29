import { z } from "zod"
import { Z_Listing } from "./zod"

export type T_Listing = z.infer<typeof Z_Listing>

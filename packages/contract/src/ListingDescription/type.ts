import { z } from "zod"
import { Z_ListingDescription } from "./zod"

export type T_ListingDescription = z.infer<typeof Z_ListingDescription>

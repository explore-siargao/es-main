import { z } from "zod"
import { Z_ListingPrice } from "./zod"

export type T_ListingPrice = z.infer<typeof Z_ListingPrice>

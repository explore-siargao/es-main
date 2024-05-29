import { z } from "zod"
import { Z_ListingHighlight } from "./zod"

export type T_ListingHighlight = z.infer<typeof Z_ListingHighlight>

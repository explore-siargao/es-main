import { z } from "zod"
import { Z_Listing_Location } from "./zod"

export type T_Listing_Location = z.infer<typeof Z_Listing_Location>

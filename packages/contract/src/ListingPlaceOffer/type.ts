import { z } from "zod"
import { Z_ListingPlaceOffer } from "./zod"

export type T_ListingPlaceOffer = z.infer<typeof Z_ListingPlaceOffer>

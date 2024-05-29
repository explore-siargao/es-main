import { z } from "zod"
import { Z_PlaceOffers } from "./zod"

export type T_PlaceOffers = z.infer<typeof Z_PlaceOffers>

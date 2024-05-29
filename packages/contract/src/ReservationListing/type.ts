import { z } from "zod"
import { Z_ReservationListing } from "./zod"

export type T_ReservationListing = z.infer<typeof Z_ReservationListing>

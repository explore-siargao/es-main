import { z } from "zod"
import { Z_Reservation } from "./zod"

export type T_Reservation = z.infer<typeof Z_Reservation>

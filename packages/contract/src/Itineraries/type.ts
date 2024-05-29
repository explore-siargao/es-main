import { z } from "zod"
import { Z_Itineraries, Z_AddItineraries } from "./zod"

export type T_Itineraries = z.infer<typeof Z_Itineraries>
export type T_AddItineraries = z.infer<typeof Z_AddItineraries>

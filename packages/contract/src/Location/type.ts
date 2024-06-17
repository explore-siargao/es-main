import { z } from "zod"
import { Z_Location } from "./zod"

export type T_Location = z.infer<typeof Z_Location>

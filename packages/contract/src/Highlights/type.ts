import { z } from "zod"
import { Z_Highlights } from "./zod"

export type T_Highlights = z.infer<typeof Z_Highlights>

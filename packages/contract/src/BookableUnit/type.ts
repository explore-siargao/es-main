import { z } from "zod"
import { Z_BookableUnit } from "./zod"

export type T_BookableUnit = z.infer<typeof Z_BookableUnit>

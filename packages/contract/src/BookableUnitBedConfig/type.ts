import { z } from "zod"
import { Z_BookableUnitBedConfig } from "./zod"

export type T_BookableUnitBedConfig = z.infer<typeof Z_BookableUnitBedConfig>

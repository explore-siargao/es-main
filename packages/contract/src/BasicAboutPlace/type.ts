import { z } from "zod"
import { Z_BasicAboutPlace } from "./zod"

export type T_BasicAboutPlace = z.infer<typeof Z_BasicAboutPlace>

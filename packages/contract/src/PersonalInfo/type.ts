import { z } from "zod"
import { Z_PersonalInfo } from "./zod"

export type T_PersonalInfo = z.infer<typeof Z_PersonalInfo>

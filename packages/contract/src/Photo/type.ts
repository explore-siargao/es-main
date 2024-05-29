import { z } from "zod"
import { Z_Photo } from "./zod"

export type T_Photo = z.infer<typeof Z_Photo>

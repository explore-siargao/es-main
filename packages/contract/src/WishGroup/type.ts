import { z } from "zod"
import { Z_WishGroup } from "./zod"

export type T_WishGroup = z.infer<typeof Z_WishGroup>

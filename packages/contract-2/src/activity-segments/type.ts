import z from "zod"
import { Z_Activity_Segment } from "./zod"

export type T_Activity_Segment = z.infer<typeof Z_Activity_Segment>

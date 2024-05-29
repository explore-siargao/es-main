import { z } from "zod"
import { Z_ReportUser } from "./zod"

export type T_ReportUser = z.infer<typeof Z_ReportUser>

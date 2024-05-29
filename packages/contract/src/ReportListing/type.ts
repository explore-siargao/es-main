import { z } from "zod"
import { Z_ReportListing } from "./zod"

export type T_ReportListing = z.infer<typeof Z_ReportListing>

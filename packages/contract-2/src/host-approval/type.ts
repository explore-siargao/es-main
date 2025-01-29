import { Z_Add_Host_Approval, Z_Host_Approval } from "./zod"
import { z } from "zod"
export type T_Add_Host_Approval = z.infer<typeof Z_Add_Host_Approval>
export type T_Host_Approval = z.infer<typeof Z_Host_Approval>

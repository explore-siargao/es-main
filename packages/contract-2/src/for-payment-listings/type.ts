import z from "zod"
import { Z_Add_For_Payment,Z_Update_For_Payment,Z_Manual_Card_Payment,Z_Linked_Card_Payment} from "./zod"

export type T_Add_For_Payment = z.infer<typeof Z_Add_For_Payment>
export type T_Update_For_Payment = z.infer<typeof Z_Update_For_Payment>
export type T_Manual_Card_Payment = z.infer<typeof Z_Manual_Card_Payment>
export type T_Linked_Card_Payment = z.infer<typeof Z_Linked_Card_Payment>
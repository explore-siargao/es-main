import { z } from "zod"
import { Z_AddTransaction, Z_Transaction } from "./zod"

export type T_Transaction = z.infer<typeof Z_Transaction>
export type T_AddTransaction = z.infer<typeof Z_AddTransaction>

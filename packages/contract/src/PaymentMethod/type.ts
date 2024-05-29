import { z } from "zod"
import { Z_AddPaymentMethod, Z_PaymentMethod, Z_CardInfo } from "./zod"

export type T_PaymentMethod = z.infer<typeof Z_PaymentMethod>
export type T_AddPaymentMethod = z.infer<typeof Z_AddPaymentMethod>
export type T_CardInfo = z.infer<typeof Z_CardInfo>

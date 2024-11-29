import { z } from "zod"
import { Z_User, Z_UserRegister, Z_Auth_User } from "./zod"

export type T_User = z.infer<typeof Z_User>
export type T_UserRegister = z.infer<typeof Z_UserRegister>
export type T_Auth_User = z.infer<typeof Z_Auth_User>

import { z } from "zod"
import { Z_AddEmergencyContact, Z_EmergencyContact } from "./zod"

export type T_EmergencyContact = z.infer<typeof Z_EmergencyContact>
export type T_AddEmergencyContact = z.infer<typeof Z_AddEmergencyContact>

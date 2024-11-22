import z from "zod"
import {
  Z_Car,
  Z_CarReservation,
  Z_Bike,
  Z_BikeReservation,
  Z_Motor,
  Z_MotorReservation,
} from "./zod"

export type T_Car = z.infer<typeof Z_Car>
export type T_CarReservation = z.infer<typeof Z_CarReservation>
export type T_Bike = z.infer<typeof Z_Bike>
export type T_BikeReservation = z.infer<typeof Z_BikeReservation>
export type T_Motor = z.infer<typeof Z_Motor>
export type T_MotorReservation = z.infer<typeof Z_MotorReservation>

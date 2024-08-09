export interface Reservation {
  name: string
  startDate: string
  endDate: string
  guestCount: number
}

export interface SelectedReservation {
  motorcycles: string
  reservation: Reservation
}

export interface MotorCycle {
  abbr: string
  status: string
  reservations: Reservation[]
}

export interface Category {
  name: string
  price: string
  motorcycles: MotorCycle[]
}

export interface SampleData {
  items: Category[]
}

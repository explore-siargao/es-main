export interface Reservation {
  name: string
  startDate: string
  endDate: string
  guestCount: number
}

export interface Booking {
  name: string
  start_date: string
  end_date: string
  guest_count: number
}

export interface SelectedReservation {
  room?: string
  motorcycles?: string
  reservation?: Reservation
  booking?: Booking
}

export interface Room {
  abbr: string
  status: string
  bookings?: Booking[]
}

export interface MotorCycle {
  abbr: string
  status: string
  reservations: Reservation[]
}

export interface Category {
  name: string
  price: string
  rooms?: Room[]
  motorcycles?: MotorCycle[]
}

export interface SampleData {
  items?: Category[]
  categories?: Category[]
}

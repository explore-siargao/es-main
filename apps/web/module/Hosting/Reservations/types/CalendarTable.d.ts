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
  rooms?: string
  motorcycles?: string
  bicyles?: string
  cars?: string
  reservation?: Reservation
  booking?: Booking
}

export interface Room {
  abbr: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface WholePlace {
  abbr: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface Rental {
  abbr: string
  status: string
  reservations: Reservation[]
}

export interface Category {
  name: string
  price: string
  rooms?: Room[]
  wholePlaces?:WholePlace[]
  motorcycles?: Rental[]
  bicycles?: Rental[]
  cars?: Rental[]
}

export interface SampleData {
  items?: Category[]
  categories?: Category[]
}

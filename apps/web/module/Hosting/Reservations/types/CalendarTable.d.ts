export interface Reservation {
  name: string
  status: string
  startDate: string
  endDate: string
  guestCount: number
  id: string
  notes: string | null
}

export interface Booking {
  name: string
  start_date: string
  end_date: string
  guest_count: number
  status: string
}

export interface SelectedReservation {
  room?: string
  rooms?: string
  beds?: string
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

export interface Bed {
  abbr: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface Rental {
  id: string
  abbr: string
  status: string
  reservations: Reservation[]
}

export interface Category {
  name: string
  price: string
  rooms?: Room[]
  wholePlaces?: WholePlace[]
  beds?: Bed[]
  motorcycles?: Rental[]
  bicycles?: Rental[]
  cars?: Rental[]
}

export interface SampleData {
  items?: Category[]
  categories?: Category[]
}

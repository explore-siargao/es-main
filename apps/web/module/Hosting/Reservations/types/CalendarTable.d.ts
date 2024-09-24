export interface Reservation {
  category?: string
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
  unit?: string
  room?: string
  rooms?: string
  beds?: string
  motorcycles?: string
  bicyles?: string
  cars?: string
  wholePlace?: string
  reservation?: Reservation
  booking?: Booking
}

export interface Room {
  id: string
  abbr: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface WholePlace {
  id: string
  abbr: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface Bed {
  id: string
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
  id: string
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

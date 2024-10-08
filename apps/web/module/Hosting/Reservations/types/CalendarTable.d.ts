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
  activities?: string
  wholePlace?: string
  reservation?: Reservation
  booking?: Booking
}

export interface Room {
  id: string
  name: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface WholePlace {
  id: string
  name: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface Bed {
  id: string
  name: string
  status: string
  reservations: Reservation[]
  bookings: Booking[]
}

export interface Rental {
  id: string
  name: string
  status: string
  reservations: Reservation[]
}

export interface Category {
  id: string
  name: string
  price: string
  pricePerDates?: any[]
  rooms?: Room[]
  wholePlaces?: WholePlace[]
  beds?: Bed[]
  motorcycles?: Rental[]
  bicycles?: Rental[]
  cars?: Rental[]
  privateActivities?: Rental[]
  joinerActivities?: Rental[]
  bookableUnitTypes: BookableUnitType[]
}

export interface SampleData {
  items?: Category[]
  categories?: Category[]
}

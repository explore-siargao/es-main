export interface Booking {
  name: string
  start_date: string
  end_date: string
  guest_count: number
}

export interface SelectedReservation {
  room: string
  booking: Booking
}

export interface Room {
  abbr: string
  status: string
  bookings: Booking[]
}

export interface Category {
  name: string
  price: string
  rooms: Room[]
}

export interface SampleData {
  categories: Category[]
}

export enum ReservationStatus {
  Confirmed = "Confirmed",
  NotConfirmed = "Not-Confirmed",
  Cancelled = "Cancelled",
  CheckedIn = "Checked-In",
  CheckedOut = "Checked-Out",
  NoShow = "No-Show",
  BlockedDates = "Blocked-Dates",
  OutofServiceDates = "Out-of-Service-Dates",
  ForPayment = "For-Payment",
}

export enum UserRole {
  Host = "Host",
  Guest = "Guest",
}

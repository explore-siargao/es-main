import React from "react"

// This is the shape and type of bookings data
export interface IBookingsData {
  id: number
  listingId: number
  Listing: {
    title: string
    imageKey: string
    address: string
  }
  fromDate: string
  toDate: string
  guestCount: number
  totalFee: number
  transactionId: number
  Transaction: {
    status: string
  }
  createdAt: string
}

// This is the shape and type of listings data
export interface IListingsData {
  id: number
  hostId: number
  title: string
  address: string
  imageKey: string
  status: string
  actions: React.ReactNode
}

// This is the shape and type of paymentHistoryBookingsData
export interface PaymentHistoryBookingsData {
  listing: {
    imageKey: string
    id: number
    title: string
    address: string
  }
  user: {
    id: number
    firstName: string
    lastName: string
  }
  dateFrom: string
  dateTo: string
  earning: number
  status: string
  date: string
}

export interface IBedAndRoomsData {
  imageKey: string
  name: string
  description: string
  qty: number
  type: string
  actions: React.ReactNode
}

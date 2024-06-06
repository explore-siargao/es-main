export const data = [
  {
    category: "Property",
    name: "Mountain top house",
    month: "All",
    year: "2024",
    views: 2000,
    newBookings: 160,
    bookingRate: 5,
    listItems: [
      { item: "Item 1", cost: 100},
      { item: "Item 2", cost: 50},
      { item: "Item 3", cost: 75},
      { item: "Item 4", cost: 50},
      { item: "Item 5", cost: 25 },
      { item: "Item 6", cost: 30 },
      { item: "Item 7", cost: 90 },
      { item: "Item 8", cost: 25 },
      { item: "Item 9", cost: 40 },
      { item: "Item 10", cost: 80 }
    ],
    serviceFee: [
      { service: "Service 1", cost: 100, afterVat: 88, deductions: 3},
      { service: "Service 2", cost: 50, afterVat: 44, deductions: 5},
      { service: "Service 3", cost: 75, afterVat: 66, deductions: 20},
      { service: "Service 4", cost: 50, afterVat: 44, deductions: 5},
      { service: "Service 5", cost: 25, afterVat: 22, deductions: 10 },
      { service: "Service 6", cost: 30, afterVat: 26.4, deductions: 0 },
      { service: "Service 7", cost: 90, afterVat: 79.2, deductions: 4 },
      { service: "Service 8", cost: 25, afterVat: 22, deductions: 2 },
      { service: "Service 9", cost: 40, afterVat: 35.2, deductions: 1 },
      { service: "Service 10", cost: 80, afterVat: 70.4, deductions: 8 }
    ],
    viewsData: [
      { date: "Jan", count: 20 },
      { date: "Feb", count: 3 },
      { date: "Mar", count: 7 },
      { date: "Apr", count: 12 },
      { date: "May", count: 33 },
      { date: "Jun", count: 66 },
      { date: "Jul", count: 28 },
      { date: "Aug", count: 41 },
      { date: "Sep", count: 23 },
      { date: "Oct", count: 15 },
      { date: "Nov", count: 75 },
      { date: "Dec", count: 19 },
    ],
     paymentHistoryData: [
      {
        year: "2023",
        data: [
          { date: "Jan", cancelled: 90000, completed: 1100000 },
          { date: "Feb", cancelled: 6000, completed: 250000 },
          { date: "Mar", cancelled: 8000, completed: 350000 },
          { date: "Apr", cancelled: 15000, completed: 450000 },
          { date: "May", cancelled: 4000, completed: 180000 },
          { date: "Jun", cancelled: 20000, completed: 700000 },
          { date: "Jul", cancelled: 10000, completed: 300000 },
          { date: "Aug", cancelled: 13000, completed: 400000 },
          { date: "Sep", cancelled: 11000, completed: 320000 },
          { date: "Oct", cancelled: 0, completed: 0 },
          { date: "Nov", cancelled: 0, completed: 0 },
          { date: "Dec", cancelled: 0, completed: 0 }
        ]
      },
      {
        year: "2024",
        data: [
          { date: "Jan", cancelled: 85000, completed: 1000000 },
          { date: "Feb", cancelled: 5000, completed: 200000 },
          { date: "Mar", cancelled: 7000, completed: 300000 },
          { date: "Apr", cancelled: 12000, completed: 400000 },
          { date: "May", cancelled: 3000, completed: 150000 },
          { date: "Jun", cancelled: 15000, completed: 600000 },
          { date: "Jul", cancelled: 8000, completed: 250000 },
          { date: "Aug", cancelled: 11000, completed: 350000 },
          { date: "Sep", cancelled: 9000, completed: 270000 },
          { date: "Oct", cancelled: 6000, completed: 180000 },
          { date: "Nov", cancelled: 25000, completed: 900000 },
          { date: "Dec", cancelled: 10000, completed: 320000 }
        ]
      }
    ],
    specificMonth: {
      month: "May",
      data: [
        { date: "1", count: 0 },
        { date: "2", count: 0 },
        { date: "3", count: 0 },
        { date: "4", count: 0 },
        { date: "5", count: 0 },
        { date: "6", count: 0 },
        { date: "7", count: 0 },
        { date: "8", count: 0 },
        { date: "9", count: 0 },
        { date: "10", count: 0 },
        { date: "11", count: 0 },
        { date: "12", count: 0 },
        { date: "13", count: 0 }, 
        { date: "14", count: 0 },
        { date: "15", count: 0 },
        { date: "16", count: 0 },
        { date: "17", count: 0 },
        { date: "18", count: 0 },
     
      ],
    },
    listing: "Mountain top house",
    cancelled: 6500000,
    completed: 7500000,
  },
  {
    category: "Property",
    listing: "Word of Life",
    paymentHistoryData: [
      {
        year: "2023",
        data: [
          { date: "Jan", cancelled: 60000, completed: 1300000 },
          { date: "Feb", cancelled: 3000, completed: 400000 },
          { date: "Mar", cancelled: 10000, completed: 200000 },
          { date: "Apr", cancelled: 20000, completed: 500000 },
          { date: "May", cancelled: 5000, completed: 220000 },
          { date: "Jun", cancelled: 25000, completed: 800000 },
          { date: "Jul", cancelled: 15000, completed: 600000 },
          { date: "Aug", cancelled: 18000, completed: 700000 },
          { date: "Sep", cancelled: 13000, completed: 450000 },
          { date: "Oct", cancelled: 0, completed: 0 },
          { date: "Nov", cancelled: 0, completed: 0 },
          { date: "Dec", cancelled: 0, completed: 0 }
        ]
      },
      {
        year: "2024",
        data: [
          { date: "Jan", cancelled: 55000, completed: 900000 },
          { date: "Feb", cancelled: 2500, completed: 150000 },
          { date: "Mar", cancelled: 4000, completed: 250000 },
          { date: "Apr", cancelled: 10000, completed: 300000 },
          { date: "May", cancelled: 2000, completed: 100000 },
          { date: "Jun", cancelled: 10000, completed: 400000 },
          { date: "Jul", cancelled: 6000, completed: 200000 },
          { date: "Aug", cancelled: 8000, completed: 280000 },
          { date: "Sep", cancelled: 7000, completed: 210000 },
          { date: "Oct", cancelled: 3000, completed: 70000 },
          { date: "Nov", cancelled: 12000, completed: 600000 },
          { date: "Dec", cancelled: 5000, completed: 180000 }
        ]
      }
    ],
    cancelled: 85000,
    completed: 1000000,
  },
  {
    category: "Property",
    listing: "Bianca Hotel",
    cancelled: 20000,
    completed: 225000,
  },
  {
    category: "Rental",
    listing: "Mountain top house",
    cancelled: 400000,
    completed: 800000,
  },
  {
    category: "Rental",
    listing: "Word of Life",
    cancelled: 750000,
    completed: 1000000,
  },
  {
    category: "Rental",
    listing: "Bianca Hotel",
    cancelled: 80000,
    completed: 225000,
  },
]

export const DUMMY_RESERVATIONS = [
  {
    Guest: {
      firstName: "Juan",
      lastName: "Dela Cruz",
    },
    status: "Upcoming",
    type: "Property",
    Listing: {
      name: "Word of Life",
      imageKey: "1.jpg",
      type: "Villa",
    },
    dateRange: "May 20 - May 27",
  },
  {
    Guest: {
      firstName: "John",
      lastName: "Doe",
    },
    status: "Upcoming",
    type: "Rental",
    Listing: {
      name: "2024 Kia Sorrento AT",
      imageKey: "sorrento1.jpg",
    },
    dateRange: "May 21 - May 23",
  },
]

export const DUMMY_RESERVATIONS_COMPLETED = [
  {
    Guest: {
      firstName: "Juan",
      lastName: "Ferrer",
    },
    status: "Completed",
    type: "Property",
    Listing: {
      name: "Word of Life",
      imageKey: "1.jpg",
      type: "Villa",
    },
    dateRange: "March 20 - March 27",
  },
  {
    Guest: {
      firstName: "Jane",
      lastName: "Doe",
    },
    status: "Completed",
    type: "Rental",
    Listing: {
      name: "2024 Kia Sorrento AT",
      imageKey: "sorrento1.jpg",
    },
    dateRange: "March 21 - March 23",
  },
]

export const DUMMY_RESERVATIONS_CANCELED = [
  {
    Guest: {
      firstName: "Mark",
      lastName: "Dela Cruz",
    },
    status: "Canceled",
    type: "Property",
    Listing: {
      name: "Word of Life",
      imageKey: "1.jpg",
      type: "Villa",
    },
    dateRange: "March 20 - March 27",
  },
  {
    Guest: {
      firstName: "Josefina",
      lastName: "Doe",
    },
    status: "Canceled",
    type: "Rental",
    Listing: {
      name: "2024 Kia Sorrento AT",
      imageKey: "sorrento1.jpg",
    },
    dateRange: "March 21 - March 23",
  },
]

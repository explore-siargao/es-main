const notifTypeEnum = {
  BOOKING: 'Booking',
  ADDED_REVIEW: 'AddedReview',
}

export const notifications = [
  {
    id: 1,
    name: 'Piolo Garcia',
    profilePicture: '1.jpg',
    listing: {
      hostId: 1,
      title: 'Amazing Views in Mabitac, Laguna',
    },
    type: notifTypeEnum.ADDED_REVIEW,
    days: 5,
    createdAt: '2024-02-29 23:09:08.728',
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    profilePicture: '1.jpg',
    listing: {
      hostId: 2,
      title: 'Cozy Cottage in the Woods',
    },
    days: 5,
    type: notifTypeEnum.ADDED_REVIEW,
    createdAt: '2024-03-01 10:15:00.000',
  },
  {
    id: 3,
    name: 'John Smith',
    profilePicture: '1.jpg',
    listing: {
      hostId: 1,
      title: 'Seaside Villa in Malibu',
    },
    type: notifTypeEnum.BOOKING,
    createdAt: '2024-02-02 14:30:00.000',
    days: 5,
  },
  {
    id: 4,
    name: 'Sophia Lee',
    profilePicture: '1.jpg',
    listing: {
      hostId: 2,
      title: 'Luxury Apartment in Downtown',
    },
    type: notifTypeEnum.ADDED_REVIEW,
    days: 5,
    createdAt: '2024-03-03 16:45:00.000',
  },
  {
    id: 5,
    name: 'Michael Johnson',
    profilePicture: '1.jpg',
    listing: {
      hostId: 1,
      title: 'Mountain Retreat in Aspen',
    },
    type: notifTypeEnum.BOOKING,
    days: 5,
    createdAt: '2024-02-04 09:00:00.000',
  },
  {
    id: 6,
    name: 'Emma Wilson',
    profilePicture: '1.jpg',
    listing: {
      hostId: 2,
      title: 'Riverside Cabin in Yosemite',
    },
    type: notifTypeEnum.ADDED_REVIEW,
    days: 5,
    createdAt: '2024-03-05 11:15:00.000',
  },
  {
    id: 7,
    name: 'Lucas Brown',
    profilePicture: '1.jpg',
    listing: {
      hostId: 1,
      title: 'Charming Bungalow in Bali',
    },
    type: notifTypeEnum.BOOKING,
    days: 5,
    createdAt: '2024-01-04 12:30:00.000',
  },
  {
    id: 8,
    name: 'Olivia Thompson',
    profilePicture: '1.jpg',
    listing: {
      hostId: 2,
      title: 'Ski Chalet in Whistler',
    },
    type: notifTypeEnum.ADDED_REVIEW,
    days: 5,
    createdAt: '2024-02-07 15:45:00.000',
  },
  {
    id: 9,
    name: 'Benjamin Davis',
    profilePicture: '1.jpg',
    listing: {
      hostId: 1,
      title: 'Desert Oasis in Arizona',
    },
    type: notifTypeEnum.ADDED_REVIEW,
    days: 5,
    createdAt: '2024-03-01 6:00:00.000',
  },
  {
    id: 10,
    name: 'Isabella Martinez',
    profilePicture: '1.jpg',
    listing: {
      hostId: 2,
      title: 'Historic Mansion in New Orleans',
    },
    type: notifTypeEnum.BOOKING,
    days: 5,
    createdAt: '2024-02-09 18:15:00.000',
  },
]

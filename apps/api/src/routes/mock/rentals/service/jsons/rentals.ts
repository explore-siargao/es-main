const fuelEnum = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  electric: 'Electric',
}

const transmissionEnum = {
  automatic: 'Automatic',
  semiAutomatic: 'Semi-Automatic',
  manual: 'Manual',
}

const conditionEnum = {
  excellent: 'Excellent',
  good: 'Good',
  average: 'Average',
  poor: 'Poor',
}

const rentalCategoryEnum = {
  car: 'Car',
  motorBike: 'Motorbike',
  bicycle: 'Bicycle',
}

export const rentals = [
  {
    id: 1,
    hostId: 3,
    Host: {
      id: 3,
      firstName: 'John Patrick',
      lastName: 'Madrigal',
    },
    category: rentalCategoryEnum.car,
    make: 'Kia',
    modelBadge: 'Sorento',
    bodyType: 'Hatchback',
    fuel: fuelEnum.diesel,
    transmission: transmissionEnum.automatic,
    year: '2024',
    Photos: [
      {
        id: 1,
        thumbKey: 'sorrento1.jpg',
        key: 'sorrento1.jpg',
        description: 'Front view',
        tag: '#car',
      },
      {
        id: 2,
        thumbKey: 'sorrento1.jpg',
        key: 'sorrento1.jpg',
        description: 'Rear view',
        tag: '#car',
      },
      {
        id: 3,
        thumbKey: 'sorrento3.jpg',
        key: 'sorrento3.jpg',
        description: 'Rear view',
        tag: '#car',
      },
      {
        id: 4,
        thumbKey: 'sorrento5.jpg',
        key: 'sorrento5.jpeg',
        description: 'Rear view',
        tag: '#car',
      },
      {
        id: 5,
        thumbKey: 'sorrento4.jpg',
        key: 'sorrento4.jpg',
        description: 'Rear view',
        tag: '#car',
      },
    ],
    Location: {
      id: 1,
      street: 'General Luna Road',
      barangay: 'Purok 1',
      city: 'General Luna',
      latitude: 9.781834918610693,
      longitude: 126.15633820548364,
      howToGetThere: '',
    },
    Details: {
      id: 1,
      engineCapacityLiter: 2.7,
      engineCapacityCc: 2700,
      condition: conditionEnum.good,
      exteriorColor: 'White',
      interiorColor: 'Black',
      seatingCapacity: 5,
      weightCapacity: 200.5,
      haveDriverLicense: 'Yes',
      isRegistered: 'Yes',
    },
    AddOns: {
      roofRack: true,
      boardRack: false,
      babySeat: false,
      dashCam: false,
      includesHelmet: false,
      others: '',
    },
    Pricing: {
      id: 1,
      dayRate: 2200,
      requiredDeposit: 5000,
    },
    finishedSections:
      '["basicInfo", "details", "addOns", "photos", "pricing", "location", "summary"]',
    status: 'Pending',
  },
  {
    id: 2,
    hostId: 3,
    Host: {
      id: 3,
      firstName: 'John Patrick',
      lastName: 'Madrigal',
    },
    category: rentalCategoryEnum.motorBike,
    make: 'Honda',
    modelBadge: 'Click',
    bodyType: null,
    fuel: fuelEnum.petrol,
    transmission: transmissionEnum.semiAutomatic,
    year: '2000',
    Photos: [
      {
        id: 1,
        thumbKey: 'honda-click-2.jpg',
        key: 'honda-click-2.jpg',
        description: 'Front view',
        tag: '#motorbike',
      },
    ],
    Location: {
      id: 1,
      street: 'General Luna Road',
      barangay: 'Purok 1',
      city: 'General Luna',
      latitude: 9.781834918610693,
      longitude: 126.15633820548364,
      howToGetThere: '',
    },
    Details: {
      id: 2,
      engineCapacityLiter: 0.125,
      engineCapacityCc: 125,
      condition: conditionEnum.average,
      exteriorColor: 'Gray',
      interiorColor: null,
      seatingCapacity: 3,
      weightCapacity: 100.5,
      haveDriverLicense: 'Yes',
      isRegistered: 'Yes',
    },
    AddOns: {
      roofRack: false,
      boardRack: true,
      babySeat: false,
      dashCam: false,
      includesHelmet: true,
      others: '',
    },
    Pricing: {
      id: 1,
      dayRate: 3500,
      requiredDeposit: 5000,
    },
    finishedSections:
      '["basicInfo", "details", "addOns", "photos", "pricing", "location", "summary"]',
    status: 'Pending',
  },
]

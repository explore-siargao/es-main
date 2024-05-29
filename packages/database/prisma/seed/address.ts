import { prisma } from "./"

export const address = async () => {
  const getPersonalInfos = await prisma.guests.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createAddresses = await prisma.addresses.createMany({
    data: [
      {
        peronalInfoId: getPersonalInfos[0]?.id || 0,
        aptSuite: null,
        streetAddress: "456 Palm Tree Avenue",
        city: "Cloud 9 Siargao Island",
        stateProvince: " Surigao del Norte",
        country: "PH",
        zipCode: 8419,
        rentalsId: 1,
      },
      {
        peronalInfoId: getPersonalInfos[1]?.id || 0,
        aptSuite: null,
        streetAddress: "789 Orchid Street, Barangay Poblacion",
        city: "Makati City",
        stateProvince: "Metro Manila",
        country: "PH",
        zipCode: 1234,
        rentalsId: 2,
      },
      {
        peronalInfoId: getPersonalInfos[2]?.id || 0,
        aptSuite: null,
        streetAddress: "456 Mango Lane, Barangay Lahug",
        city: "Cebu City",
        stateProvince: "Cebu",
        country: "PH",
        zipCode: 6000,
        rentalsId: 3,
      },
      {
        peronalInfoId: getPersonalInfos[3]?.id || 0,
        aptSuite: null,
        streetAddress: "321 Sunflower Avenue, Barangay Baguio Proper",
        city: "Baguio City",
        stateProvince: "Benguet",
        country: "PH",
        zipCode: 2600,
        rentalsId: 4,
      },
      {
        peronalInfoId: getPersonalInfos[4]?.id || 0,
        aptSuite: null,
        streetAddress: "JP rizal street",
        city: "Sta. Cruz",
        stateProvince: "Laguna",
        country: "PH",
        zipCode: 4009,
        rentalsId: 5,
      },
    ],
  })

  console.log({ createAddresses })
}

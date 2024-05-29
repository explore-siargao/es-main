import { prisma } from "./"

export const tax = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })
  const createTaxes = await prisma.tax.createMany({
    data: [
      {
        vatId: "1111",
        userId: getUsers[0]?.id ? getUsers[0].id : 0,
        nameOnRegistration: "test Account",
        addressLine1: "Brgy JP Rizal",
        addressLine2: "Brgy Tres",
        city: "Paete",
        provinceRegion: "Laguna",
        zipPostalCode: "4016",
        countryRegion: "PH",
      },
      {
        vatId: "1112",
        userId: getUsers[1]?.id ? getUsers[1].id : 0,
        nameOnRegistration: "Ramil Kaharian",
        addressLine1: "Brgy JP Rizal",
        addressLine2: "Brgy Tres",
        city: "Paete",
        provinceRegion: "Laguna",
        zipPostalCode: "4016",
        countryRegion: "PH",
      },
      {
        vatId: "1113",
        userId: getUsers[2]?.id ? getUsers[2].id : 0,
        nameOnRegistration: "John Madrigal",
        addressLine1: "Brgy JP Rizal",
        addressLine2: "Brgy Tres",
        city: "Paete",
        provinceRegion: "Laguna",
        zipPostalCode: "4016",
        countryRegion: "PH",
      },
      {
        vatId: "1114",
        userId: getUsers[3]?.id ? getUsers[3].id : 0,
        nameOnRegistration: "Richard",
        addressLine1: "Brgy JP Rizal",
        addressLine2: "Brgy Tres",
        city: "Paete",
        provinceRegion: "Laguna",
        zipPostalCode: "4016",
        countryRegion: "PH",
      },
      {
        vatId: "1115",
        userId: getUsers[4]?.id ? getUsers[4].id : 0,
        nameOnRegistration: "Arjhay",
        addressLine1: "Brgy JP Rizal",
        addressLine2: "Brgy Tres",
        city: "Paete",
        provinceRegion: "Laguna",
        zipPostalCode: "4016",
        countryRegion: "PH",
      },
    ],
  })
  console.log({ createTaxes })
}

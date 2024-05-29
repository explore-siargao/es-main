import { prisma } from "./"

export const placeOffer = async () => {
  const createPlaceOffers = await prisma.placeOffers.createMany({
    data: [
      {
        icon: "Cloud",
        category: "Scenic views",
        title: "City skyline view",
      },
      {
        icon: "Hand",
        category: "Bathroom",
        title: "Hair dryer",
      },
      {
        icon: "Soup",
        category: "Bathroom",
        title: "Cleaning products",
      },
      {
        icon: "Tools",
        category: "Bedroom and laundry",
        title: "Essentials",
      },
      {
        icon: "Hangers",
        category: "Bedroom and laundry",
        title: "Hangers",
      },
      {
        icon: "Book",
        category: "Entertainment",
        title: "Books and reading material",
      },
    ],
  })
  console.log({ createPlaceOffers })
}

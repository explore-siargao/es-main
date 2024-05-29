import { prisma } from "./"

export const basicAboutPlace = async () => {
  const createAboutPlaces = await prisma.basicAboutPlace.createMany({
    data: [
      {
        guests: 8,
        beds: 3,
        bathRooms: 3,
        bedRooms: 3,
      },
      {
        guests: 12,
        beds: 3,
        bathRooms: 3,
        bedRooms: 3,
      },
      {
        guests: 6,
        beds: 3,
        bathRooms: 1,
        bedRooms: 1,
      },
      {
        guests: 10,
        beds: 3,
        bathRooms: 3,
        bedRooms: 3,
      },
      {
        guests: 10,
        beds: 7,
        bathRooms: 1,
        bedRooms: 2,
      },
    ],
  })

  console.log({ createAboutPlaces })
}

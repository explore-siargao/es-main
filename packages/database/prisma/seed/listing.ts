import { prisma } from "./"

export const listing = async () => {
  const getListingPrices = await prisma.listingPrice.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getBasicAboutPlace = await prisma.basicAboutPlace.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createListings = await prisma.listing.createMany({
    data: [
      {
        hostedById: getUsers[0]?.id || 0,
        listingPriceId: getListingPrices[0]?.id || 0,
        images: JSON.stringify([
          {
            fileKey: "1.jpg",
            alt: "image",
          },
          {
            fileKey: "2.jpg",
            alt: "image",
          },
          {
            fileKey: "3.jpg",
            alt: "image",
          },
          {
            fileKey: "4.jpg",
            alt: "image",
          },
          {
            fileKey: "5.jpg",
            alt: "image",
          },
        ]),
        title: "Casa del Mar",
        category: "Accomodation",
        address: "Entire home in Mabini, Philippines",
        latitude: "9.968644911072126",
        longitude: "126.0799420362242",
        whereYoullBe: JSON.stringify({
          description: "Mabini, Calabarzon, Philippines",
          workAround: "",
        }),
        whereYoullSleep: JSON.stringify({
          bedroom: {
            count: 2,
            size: "Double bed",
            icon: "bed",
          },
        }),
        basicAboutPlaceId: getBasicAboutPlace[0]?.id || 0,
      },
      {
        hostedById: getUsers[1]?.id || 0,
        listingPriceId: getListingPrices[1]?.id || 0,
        images: JSON.stringify([
          {
            fileKey: "5.jpg",
            alt: "image",
          },
          {
            fileKey: "4.jpg",
            alt: "image",
          },
          {
            fileKey: "3.jpg",
            alt: "image",
          },
          {
            fileKey: "2.jpg",
            alt: "image",
          },
          {
            fileKey: "1.jpg",
            alt: "image",
          },
        ]),
        title: "Arcadia private resort -beach front property",
        category: "Accomodation",
        address: "Island in Ligpo Island, Philippines",
        latitude: "9.7813",
        longitude: "126.1181",
        whereYoullBe: JSON.stringify({
          description:
            "Ligpo Island, Batangas, Philippines It is very quite, (if we are honest maybe a boat now again) normally we are just listening to birds/wild life and the gentle crash of waves against the shore/beach.",
          workAround: "",
        }),
        whereYoullSleep: JSON.stringify({
          QueenBed: {
            count: 3,
            size: "Large",
            icon: "bed",
          },
        }),
        basicAboutPlaceId: getBasicAboutPlace[1]?.id || 0,
      },
      {
        hostedById: getUsers[1]?.id || 0,
        listingPriceId: getListingPrices[2]?.id || 0,
        images: JSON.stringify([
          {
            fileKey: "2.jpg",
            alt: "image",
          },
          {
            fileKey: "3.jpg",
            alt: "image",
          },
          {
            fileKey: "4.jpg",
            alt: "image",
          },
          {
            fileKey: "5.jpg",
            alt: "image",
          },
          {
            fileKey: "1.jpg",
            alt: "image",
          },
        ]),
        title: "Relaxing Sea Breeze Suite at Pico de Loro",
        category: "Accomodation",
        address: "Entire condo in Nasugbu, Philippines",
        latitude: "9.8592",
        longitude: "126.0623",
        whereYoullBe: JSON.stringify({
          description:
            "Nasugbu, Calabarzon, Philippines Pico De Loro is a private beach residential resort located inside Hamilo Coast, in the municipality of Nasugbu, a scenic coastal town in the province of Batangas.",
          workAround:
            "Getting to Pico de Loro requires a private vehicle as there are no available public transportation nearby. Taking CAVITEX is the fastest way to get to the place. Please drive carefully towards the place as there are a lot of curved roads and it`s not well-lighted at night.",
        }),
        whereYoullSleep: JSON.stringify({
          kingBed: {
            count: 1,
            size: "Large",
            icon: "bed",
          },
          queenBed: {
            count: 1,
            size: "Large",
            icon: "bed",
          },
          singleBed: {
            count: 1,
            size: "Small",
            icon: "bed",
          },
        }),
        basicAboutPlaceId: getBasicAboutPlace[2]?.id || 0,
      },
      {
        hostedById: getUsers[0]?.id || 0,
        listingPriceId: getListingPrices[3]?.id || 0,
        images: JSON.stringify([
          {
            fileKey: "4.jpg",
            alt: "image",
          },
          {
            fileKey: "3.jpg",
            alt: "image",
          },
          {
            fileKey: "2.jpg",
            alt: "image",
          },
          {
            fileKey: "1.jpg",
            alt: "image",
          },
          {
            fileKey: "5.jpg",
            alt: "image",
          },
        ]),
        title: "Simala Beach House",
        category: "Accomodation",
        address: "Entire home in Sibonga, Philippines",
        latitude: "9.7817",
        longitude: "126.1212",
        whereYoullBe: JSON.stringify({
          description:
            "Sibonga, Central Visayas, Philippines The house is conveniently located in close proximity to various attractions and amenities. Seargao Seaview Cafe is just about 5.5 kilometers away, offering a great dining option. Additionally, the famous Miraculous Shrine of Mary in Lindogon, Simala, Cebu, is only 3.4 kilometers away, providing a place for spiritual reflection and visits. For everyday needs, there is a Public Market along the main road, along with bakeries, a 711 convenience store, and a laundromat, ensuring that you have easy access to essential items and services. The main town of Sibonga is approximately 6.3 kilometers away, where you can find further amenities and facilities. If you are looking for a wider range of shopping options and supermarkets, Carcar is located about 18 kilometers from the house. Furthermore, If you wish to visit the Archbishop Teofilo Camomot Shrine in Carcar, it is approximately 19 kilometers away, providing a spiritual site for reflection and devotion. The shrine offers a serene and sacred atmosphere, allowing visitors to engage in prayer and contemplation.",
          workAround:
            "The house's convenient location within walking distance to main road ensures easy access to various modes of public transportation. Whether you prefer buses, tricycles, jeepneys, or motorcycles for hire, you will have plenty of options available to explore the surrounding areas and conveniently travel to different destinations. This accessibility makes it convenient for you to commute and navigate the area with ease.",
        }),
        whereYoullSleep: JSON.stringify({
          kingBed: {
            count: 3,
            size: "Large",
            icon: "bed",
          },
        }),
        basicAboutPlaceId: getBasicAboutPlace[3]?.id || 0,
      },
      {
        hostedById: getUsers[2]?.id || 0,
        listingPriceId: getListingPrices[4]?.id || 0,
        images: JSON.stringify([
          {
            fileKey: "3.jpg",
            alt: "image",
          },
          {
            fileKey: "1.jpg",
            alt: "image",
          },
          {
            fileKey: "2.jpg",
            alt: "image",
          },
          {
            fileKey: "5.jpg",
            alt: "image",
          },
          {
            fileKey: "4.jpg",
            alt: "image",
          },
        ]),
        title: "Amihan Coron -Havement",
        category: "Accomodation",
        address: "Entire rental unit in Coron, Philippines",
        latitude: "9.7533",
        longitude: "126.1586",
        whereYoullBe: JSON.stringify({
          description: "Coron, MIMAROPA, Philippines",
          workAround: "",
        }),
        whereYoullSleep: JSON.stringify({
          kingBed: {
            count: 1,
            size: "Large",
            icon: "bed",
          },
        }),
        basicAboutPlaceId: getBasicAboutPlace[4]?.id || 0,
      },
    ],
  })
  console.log({ createListings })
}

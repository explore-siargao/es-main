import il2 from "../../common/assets/sample/island-2.jpg"
import il3 from "../../common/assets/sample/island-3.jpg"
import il4 from "../../common/assets/sample/island-4.jpg"
import il5 from "../../common/assets/sample/island-5.jpg"
import il6 from "../../common/assets/sample/island-6.jpg"
import il7 from "../../common/assets/sample/island-7.jpg"
import il8 from "../../common/assets/sample/island-8.jpg"
import il9 from "../../common/assets/sample/island-9.jpg"
import { ASSET_ROOT } from "@/common/constants"
import { buildPropertySearchURL } from "@/common/components/SearchBar/helpers"

export const travelStyle = [
  {
    imageKey: "resorts.jpg",
    title: "Resorts",
    url: buildPropertySearchURL({ propertyTypes: "resort" }),
    description: "Resorts in Siargao",
  },
  {
    imageKey: "villas.jpg",
    title: "Villas",
    url: buildPropertySearchURL({ propertyTypes: "villa" }),
  },
  {
    imageKey: "hotels.jpg",
    title: "Hotels",
    url: buildPropertySearchURL({ propertyTypes: "hotel" }),
  },
  {
    imageKey: "hostels.jpg",
    title: "Hostels",
    url: buildPropertySearchURL({ propertyTypes: "hostel" }),
  },
  {
    imageKey: "apartments.jpg",
    title: "Apartments",
    url: buildPropertySearchURL({ propertyTypes: "apartment" }),
  },
  {
    imageKey: "homestay.jpg",
    title: "Homestay",
    url: buildPropertySearchURL({ propertyTypes: "homestay" }),
  },
  {
    imageKey: "houses.jpg",
    title: "Houses",
    url: buildPropertySearchURL({ propertyTypes: "house" }),
  },
  {
    imageKey: "bungalows.jpg",
    title: "Bungalows",
    url: buildPropertySearchURL({ propertyTypes: "bungalow" }),
  },
  {
    imageKey: "cottages.jpg",
    title: "Cottages",
    url: buildPropertySearchURL({ propertyTypes: "cottage" }),
  },
]

export const exploreSiargaoIsland = [
  {
    imageKey: "catangnan-bridge.jpg",
    title: "Catangnan Bridge",
    subTitle: "General Luna",
    url: "/siargao/travel/guides/catangnan-bridge",
  },
  {
    imageKey: "cloud-9.jpg",
    title: "Cloud 9",
    subTitle: "General Luna",
    url: "/siargao/travel/guides/cloud-9",
  },
  {
    imageKey: "coconut-view-deck.jpg",
    title: "Coconut Tree View Deck",
    subTitle: "Dapa",
    url: "/siargao/travel/guides/coconut-view-deck",
  },
  {
    imageKey: "magpupungko.jpg",
    title: "Magpupungko Rock Pools",
    subTitle: "Pilar",
    url: "/siargao/travel/guides/magpupungko-rock-pools",
  },
  {
    imageKey: "sugba-lagoon.jpg",
    title: "Sugba Lagoon",
    subTitle: "Del Carmen",
    url: "/siargao/travel/guides/sugba-lagoon",
  },
  {
    imageKey: "sohoton-cove.jpg",
    title: "Sohoton Cove National Park",
    subTitle: "Socorro",
    url: "/siargao/travel/guides/sohoton-cove",
  },
  {
    imageKey: "tayangban-cave-pool.jpg",
    title: "Tayangban Cave Pool",
    subTitle: "Pilar",
    url: "/siargao/travel/guides/tayangban-cave-pool",
  },
  {
    imageKey: "coconut-road.jpg",
    title: "Coconut Road",
    subTitle: "Dapa",
    url: "/siargao/travel/guides/coconut-road",
  },
]

export const recommendedPlaceToStay = [
  {
    imageKey: "/assets/5.jpg",
    title: "Siargao Seasky Resort",
  },
  {
    imageKey: "/assets/2.jpg",
    title: "Mad Monkey Siargao",
  },
  {
    imageKey: "/assets/3.jpg",
    title: "Patrick's on the Beach",
  },
  {
    imageKey: "/assets/4.jpg",
    title: "Strangers Inn & Bar",
  },
  {
    imageKey: "/assets/4.jpg",
    title: "Kaha Island Stay",
  },
  {
    imageKey: "/assets/2.jpg",
    title: "Beachfront Kubo",
  },
  {
    imageKey: "/assets/1.jpg",
    title: "G Villas Siargao",
  },
  {
    imageKey: "/assets/3.jpg",
    title: "Suyog Life Siargao",
  },
  {
    imageKey: "/assets/2.jpg",
    title: "Bohemian Beach House",
  },
  {
    imageKey: "/assets/3.jpg",
    title: "Siargao Residency",
  },
]

export const somethingToDo = [
  {
    imageKey: il8,
    title: "Sightseeing",
    url: "/search/activities?type=Sightseeing",
  },
  {
    imageKey: il9,
    title: "Walking",
    url: "/search/activities?type=Walking",
  },
  {
    imageKey: il5,
    title: "Sunset view",
    url: "/search/activities?type=Sunset%20view",
  },
  {
    imageKey: il4,
    title: "Sceneries",
    url: "/search/activities?type=Sceneries",
  },
  {
    imageKey: il6,
    title: "Visit",
    url: "/search/activities?type=Visit",
  },
]

export const reliableCars = [
  {
    imageKey: "/assets/10714cec-083b-48b8-9702-45cbb1debd76",
    title: "2021 Suzuki R150 Fi MT",
    url: "/search/rentals?type=Motorbikes",
  },
  {
    imageKey: "/assets/fe65c50d-2cde-46e6-8c9b-58a73c59e768",
    title: "2018 Honda Civic AT",
    url: "/search/rentals?type=Cars",
  },
  {
    imageKey: "/assets/b57d645a-a3bb-4d23-9e9b-d5caa3f0ae69",
    title: "2023 Toyota Wigo G CVT",
    url: "/search/rentals?type=Bicycle",
  },
  {
    imageKey: "/assets/2a820a6a-9baf-4b7c-884a-217f86e7e657",
    title: "2020 CBR500RXZ Honda MT",
    url: "/search/rentals?type=Cars",
  },
  {
    imageKey: "/assets/099843f0-d626-42fb-899e-62c6687614a2",
    title: "2000 CBR500R Honda SAT",
    url: "/search/rentals?type=Cars",
  },
  {
    imageKey: "/assets/10714cec-083b-48b8-9702-45cbb1debd76",
    title: "2020 Suzuki R150 Fi MT",
    url: "/search/rentals?type=Motorbikes",
  },
]

export const groupCardsDummyInspiration = [
  {
    imageKey: il9,
    title: "Boat Trip",
  },
  {
    imageKey: il7,
    title: "Beto Spring",
  },
  {
    imageKey: il3,
    title: "Coconut Tree Lookout",
  },
  {
    imageKey: il2,
    title: "Cloud 9",
  },
  {
    imageKey: il6,
    title: "Alegria Beach",
  },
  {
    imageKey: il5,
    title: "Pacifico Beach",
  },
]

export const dummyCards = [
  {
    imageKey: `${ASSET_ROOT}/1.jpg`,
    title: "Villa Juarez",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Popular Filter",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Balcony",
  },
  {
    imageKey: `${ASSET_ROOT}/1.jpg`,
    title: "Villa Juarez",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Popular Filter",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Balcony",
  },
  {
    imageKey: `${ASSET_ROOT}/1.jpg`,
    title: "Villa Juarez",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Popular Filter",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Beach Front",
  },
  {
    imageKey: `${ASSET_ROOT}/1.jpg`,
    title: "Villa Juarez",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Popular Filter",
    type: "Free WiFi",
  },
  {
    imageKey: `${ASSET_ROOT}/2.jpg`,
    title: "Villa Maria",
    description: "General Luna, Philippines",
    category: "Facilities",
    type: "Beach Front",
  },
]

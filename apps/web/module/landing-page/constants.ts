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
    imageKey: "cloud-9.jpg",
    title: "General Luna",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/general-luna-town-center",
  },
  {
    imageKey: "catangnan-bridge.jpg",
    title: "Catangnan",
    subTitle: "General Luna",
    url: "/siargao/travel/guides/catangnan-general-luna",
  },
  {
    imageKey: "coconut-view-deck.jpg",
    title: "Malinao",
    subTitle: "General Luna",
    url: "/siargao/travel/guides/malinao-general-luna",
  },
  {
    imageKey: "magpupungko.jpg",
    title: "Pacifico",
    subTitle: "San Isidro",
    url: "/siargao/travel/guides/pacifico-san-isidro",
  },
  {
    imageKey: "sugba-lagoon.jpg",
    title: "Sta Fe",
    subTitle: "Del Carmen",
    url: "/siargao/travel/guides/sta-fe-del-carmen",
  },
  {
    imageKey: "sohoton-cove.jpg",
    title: "Pilar",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/pilar-town-centre",
  },
  {
    imageKey: "tayangban-cave-pool.jpg",
    title: "Burgos",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/burgos-town-center",
  },
  {
    imageKey: "coconut-road.jpg",
    title: "Alegria",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/alegria-town-center",
  },
  {
    imageKey: "coconut-road.jpg",
    title: "Del Carmen",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/del-carmen-town-center",
  },
  {
    imageKey: "coconut-road.jpg",
    title: "Socorro",
    subTitle: "Town Centre",
    url: "/siargao/travel/guides/socorro-town-center",
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

// Class name `slider-item` is required from swiper parent tag for this to work
// All sliders from landing page will share this style
export const HOME_SLIDER_CUSTOM_STYLE = `
  .slider-item .swiper {
    position: relative;
  }
  .slider-item .swiper-button-prev,
  .slider-item .swiper-button-next {
    color: black;
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-left: -5px;
    margin-right: -5px;
    transform: translateY(-50%);
    transition: opacity 0.3s ease-in-out;
  }
  .slider-item .swiper-button-next {
    opacity: 1; 
    right: 10px; 
  }
  .slider-item .swiper-button-prev {
    opacity: 0;
    left: 10px; 
  }
  .slider-item .swiper-button-prev.swiper-button-disabled {
    opacity: 0; 
    cursor: default; 
  }
  .slider-item .swiper-button-next:after, 
  .slider-item .swiper-button-prev:after {
    font-size: 15px;
    font-weight: bold;
  }
  .slider-item .swiper-button-prev:not(.swiper-button-disabled) {
    opacity: 1; 
  }
  .slider-item .swiper-button-next:not(.swiper-button-disabled) {
    opacity: 1;
  }
`;

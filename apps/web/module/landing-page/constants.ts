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
`

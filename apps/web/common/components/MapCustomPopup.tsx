import { Popup } from "react-leaflet"
import Image from "@/common/components/ui/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Link from "next/link"
import { LucideHeart, LucideStar, LucideX } from "lucide-react"

type Prop = {
  itemId: number
  price: number
  isNight: boolean
  images: []
  location: string
  rating: string
  onClose: () => void
}

const MapCustomPopup = ({
  itemId,
  price,
  isNight,
  images,
  location,
  rating,
  onClose,
}: Prop) => {
  return (
    <div className="map-custom-popup">
      <style>
        {`
          .map-custom-popup .request-popup .leaflet-popup-content-wrapper {
            border-radius: 6px;
          }
        `}
      </style>
      <Popup className="request-popup">
        <button
          className="bg-white rounded-full z-10 p-1 border border-gray-300 absolute right-1 top-1"
          onClick={onClose}
        >
          <LucideX className="h-4 w-4" />
        </button>
        <Link
          href={process.env.WEB_URL + "/accommodation/" + itemId}
          target="_blank"
        >
          <div className="absolute bg-gray-200 top-0 left-0 right-0 h-[70%] rounded-t-md w-full">
            <Swiper
              navigation
              pagination={{ type: "bullets", clickable: true }}
              modules={[Navigation, Pagination]}
              className="h-full w-full rounded-t-md"
            >
              <style>{`
                .map-custom-popup .swiper-button-prev, .swiper-button-next {
                  color: black;
                  background-color: white;
                  border-radius: 50%; 
                  width: 30px; 
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                .map-custom-popup .swiper-button-next:after, 
                .map-custom-popup .swiper-button-prev:after {
                  font-size: 10px;
                  font-weight: 600;
                }
                .map-custom-popup .swiper-pagination-bullet {
                  background-color: white;
                }
              `}</style>

              {images.map((image, imageIndex) => (
                <SwiperSlide key={imageIndex}>
                  <div className="flex h-full w-full items-center justify-center rounded-t-md">
                    <Image
                      width={300}
                      height={300}
                      // @ts-ignore
                      src={`/assets/${image.fileKey}`}
                      // @ts-ignore
                      alt={image.alt}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="z-10 p-1 absolute right-9 top-[1px]">
              <LucideHeart
                className={`h-6 w-6 text-text-50 active:scale-90 fill-error-500`}
              />
            </div>
          </div>
          <div className="h-[250px] w-44">
            <div className="absolute bottom-0 left-0 right-0 h-[30%] w-full p-2.5">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm text-text-700 w-32 whitespace-nowrap overflow-hidden text-ellipsis">
                  {location}
                </h4>
                <div className="space-x-0.5 flex items-center">
                  <LucideStar className="h-4 w-4 mb-0.5 text-text-700" />
                  <h4 className="text-sm text-text-700">{rating}</h4>
                </div>
              </div>
              <h4 className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                100 kilometers away
              </h4>
              <h4 className="text-sm text-text-700 font-semibold underline whitespace-nowrap overflow-hidden text-ellipsis">
                ₱{price} <span className="font-normal">{isNight}</span>
              </h4>
            </div>
          </div>
        </Link>
      </Popup>
    </div>
  )
}

export default MapCustomPopup

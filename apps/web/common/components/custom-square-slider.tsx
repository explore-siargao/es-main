import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "./ui/image"
import { IMAGE_FALLBACK } from "../constants"
import { useState } from "react"

interface SliderProps {
  images: {
    key: string
    alt: string | undefined
  }[]
}

const CustomSquareSlider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const uniqueId = Math.random().toString(36).substring(2, 9)

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex)
  }

  return (
    <div className={`custom-square-slider relative slider-${uniqueId}`}>
      <Swiper
        navigation={{
          prevEl: `.slider-${uniqueId} .swiper-button-prev`,
          nextEl: `.slider-${uniqueId} .swiper-button-next`,
        }}
        pagination={{ type: "bullets", clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full w-full rounded-xl relative"
        onSlideChange={handleSlideChange}
      >
        <style>{`
          .custom-square-slider .swiper-button-prev,
          .custom-square-slider .swiper-button-next {
            color: black;
            background-color: white;
            border-radius: 50%; 
            width: 30px; 
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            cursor: pointer;
          }
          .custom-square-slider:hover .swiper-button-prev:not(.hidden),
          .custom-square-slider:hover .swiper-button-next:not(.hidden) {
            opacity: 1;
          }
          .custom-square-slider .swiper-button-prev.hidden,
          .custom-square-slider .swiper-button-next.hidden {
            display: none;
          }
          .custom-square-slider .swiper-pagination-bullet {
            background-color: white;
          }
          .custom-square-slider .swiper-button-next:after, 
          .custom-square-slider .swiper-button-prev:after {
            font-size: 10px;
            font-weight: 600;
          }
          .custom-square-slider .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .custom-square-slider .image-wrapper {
            position: relative;
            width: 100%;
            height: 250px; 
            padding-top: 80%; 
          }
          .custom-square-slider .image-wrapper img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
        {images.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image.key}>
              <div className="image-wrapper">
                <Image
                  src={`/assets/${image.key}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  alt={image.alt || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key="error">
            <div className="image-wrapper">
              <Image
                src={IMAGE_FALLBACK}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                alt={"error"}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <div
        className={`swiper-button-prev ${
          currentIndex === 0 ? "hidden" : ""
        } absolute top-1/2 left-2 text-sm z-10`}
      />
      <div
        className={`swiper-button-next ${
          currentIndex === images.length - 1 ? "hidden" : ""
        } absolute top-1/2 right-2 z-10`}
      />
    </div>
  )
}

export default CustomSquareSlider

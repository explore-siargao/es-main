
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "./ui/image"
import { IMAGE_FALLBACK } from "../constants"

interface SliderProps {
  images: {
    fileKey: string
    alt: string
  }[]
}

const CustomSquareSlider = ({ images }: SliderProps) => {
  return (
    <Swiper
      navigation={images.length > 0}
      pagination={{ type: "bullets", clickable: true }}
      modules={[Navigation, Pagination]}
      className="h-full w-full rounded-xl"
    >
      <style>{`
        .swiper-button-prev, .swiper-button-next {
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
        .swiper:hover .swiper-button-prev:not(:disabled), .swiper:hover .swiper-button-next:not(:disabled) {
          opacity: 1;
        }
        .swiper-button-prev.swiper-button-disabled{
          opacity: 0;
        }
        .swiper-button-next:after, 
        .swiper-button-prev:after {
          font-size: 10px;
          font-weight: 600;
        }
        .swiper-pagination-bullet {
          background-color: white;
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 250px; 
          padding-top: 80%; 
        }
        .image-wrapper img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      {images.length > 0 ? images.map((image) => (
        <SwiperSlide key={image.fileKey}>
          <div className="image-wrapper">
            <Image
              src={`/assets/${image.fileKey}`}
              alt={image.alt}
              layout="fill"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      )) : (
        <SwiperSlide key="error">
          <div className="image-wrapper">
            <Image
              src={IMAGE_FALLBACK}
              alt={"error"}
              layout="fill"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      )
    }
    </Swiper>
  )
}

export default CustomSquareSlider

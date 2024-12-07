import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import { useState } from "react"

interface SliderProps {
  images: {
    fileKey?: string
    key?: string
    alt?: string
    url?: string
  }[]
}

interface ImageData {
  image: {
    _id?: string
    alt?: string
    filename?: string
    mimeType?: string
    filesize?: number
    width?: number
    height?: number
    focalX?: number
    focalY?: number
    createdAt?: string
    updatedAt?: string
    url?: string
  }
  id?: string
}

const Slider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateCurrentIndex = (swiper: any) => {
    setCurrentIndex(swiper.realIndex)
  }

  const isOldFormat = (imageData: any): imageData is ImageData => {
    return imageData.image?.url
  }

  return (
    <>
      <Swiper
        navigation
        loop={true}
        pagination={{ type: "bullets", clickable: true }}
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={updateCurrentIndex}
        className="relative h-3/4 w-1/2 my-5 rounded-xl"
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
        `}</style>

        {images?.map((imageData) => (
          <SwiperSlide key={imageData.fileKey}>
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                width={300}
                height={300}
                src={
                  isOldFormat(imageData)
                    ? imageData.image.url
                    : imageData.key
                      ? `/assets/${imageData.key}`
                      : imageData.url
                }
                className="block h-full w-full object-cover"
                alt={
                  isOldFormat(imageData)
                    ? imageData.image.alt || ""
                    : imageData.alt || ""
                }
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-text-950 text-white px-4 py-1 rounded-md z-10 opacity-80">
          {currentIndex + 1}/{images.length}
        </div>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="w-1/2 my-5 rounded-xl"
      >
        {images?.map((imageData) => (
          <SwiperSlide key={imageData.fileKey}>
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                width={300}
                height={300}
                src={
                  isOldFormat(imageData)
                    ? imageData.image.url
                    : imageData.key
                      ? `/assets/${imageData.key}`
                      : imageData.url
                }
                className="block h-44 w-full object-cover"
                alt={
                  isOldFormat(imageData)
                    ? imageData.image.alt || ""
                    : imageData.alt || ""
                }
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider

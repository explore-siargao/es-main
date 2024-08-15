import Image from "next/image"
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
    alt?: string
    url?: string
  }[]
}

const Slider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        navigation
        loop={true}
        pagination={{ type: "bullets", clickable: true }}
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="justify-center h-3/4 w-1/2 items-center my-5 rounded-lg"
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

        {images.map((image) => (
          <SwiperSlide key={image.fileKey ?? image.url}>
            <div className="flex h-full w-full items-center justify-center">
              <img
                width={300}
                height={300}
                src={image.fileKey ? `/assets/${image.fileKey}` :  image.url}
                className="block h-full w-full object-cover"
                alt={image.alt || ""}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
  onSwiper={setThumbsSwiper}
  loop={true}
  spaceBetween={10}
  slidesPerView={4}
  freeMode={true}
  watchSlidesProgress={true}
  modules={[FreeMode, Thumbs]}
  className="justify-center items-center w-1/2 my-5 rounded-lg"
>
  {images.map((image) => (
    <SwiperSlide key={image.fileKey ?? image.url}>
      <div className="flex justify-center items-center">
        <img
          src={image.fileKey ? `/assets/${image.fileKey}` : image.url}
         className="w-full h-40 object-cover rounded-lg"
          alt={image.alt || ""}
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </>
  );
}

export default Slider;

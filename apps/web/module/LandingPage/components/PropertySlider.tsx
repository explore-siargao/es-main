import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import Image from "next/image"
import { Typography } from "@/common/components/ui/Typography"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import Link from "next/link"

interface SliderProps {
  cards: {
    imageKey: string
    cardTitle: string
    url: string
  }[]
}

const PropertySlider = ({ cards }: SliderProps) => {
  return (
    <Swiper
      slidesPerView={4}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        720: { slidesPerView: 3 },
        1080: { slidesPerView: 3 },
        1920: { slidesPerView: 4 },
      }}
    >
      <style>{`
  .swiper {
    position: relative;
  }
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
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-left: -5px;
    margin-right: -5px;
    transform: translateY(-50%);
    transition: opacity 0.3s ease-in-out;
  }
  .swiper-button-next {
  margin-top: 2px;
    opacity: 1; 
    right: 10px; 
  }
  .swiper-button-prev {
  margin-top: 2px;
    opacity: 0;
    left: 10px; 
  }
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0; 
    cursor: default; 
  }
  .swiper-button-next:after, 
  .swiper-button-prev:after {
    font-size: 10px;
    font-weight: 600;
  }
  .swiper-button-prev:not(.swiper-button-disabled) {
    opacity: 1; 
  }
  .swiper-button-next:not(.swiper-button-disabled) {
    opacity: 1;
  }
`}</style>

      {cards.map((card) => (
        <SwiperSlide key={card.cardTitle} className="pl-5 pr-5">
          <div className="mt-4 relative w-full h-56 rounded-xl overflow-hidden shadow-md">
            <Image
              className="cursor-pointer"
              src={card.imageKey}
              alt={card.cardTitle}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mt-4 text-left">
            <Link href={card.url}>
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="text-left"
              >
                {card.cardTitle}
              </Typography>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PropertySlider

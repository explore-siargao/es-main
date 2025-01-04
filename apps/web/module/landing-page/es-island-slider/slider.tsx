import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { StaticImageData } from "next/image"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import Item from "./item"
import { ES_ISLAND_HOME_SLIDER_CUSTOM_STYLE } from "../constants"

interface SliderProps {
  cards: {
    imageKey: StaticImageData | string
    title: string
    subTitle?: string
    url?: string
  }[]
  itemsNumber: number
}

const Slider = ({
  cards,
  itemsNumber,
}: SliderProps) => {
  return (
    <div className="es-island-slider-item">
      <Swiper
        slidesPerView={itemsNumber}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={40}
      >
        <style>{ES_ISLAND_HOME_SLIDER_CUSTOM_STYLE}</style>
        {cards.map((card) => (
          <SwiperSlide key={card.title}>
            <Item
              imageKey={card.imageKey}
              title={card.title}
              subTitle={card.subTitle}
              url={card.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider

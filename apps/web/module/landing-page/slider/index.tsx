import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { StaticImageData } from "next/image"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import Item from "./item"
import { HOME_SLIDER_CUSTOM_STYLE } from "../constants"

interface SliderProps {
  cards: {
    imageKey: StaticImageData | string
    title: string
    subTitle?: string
    url?: string
  }[]
  isGuide: boolean
  itemsNumber: number
  isLastItemFull?: boolean
}

const Slider = ({
  cards,
  isGuide,
  itemsNumber,
  isLastItemFull,
}: SliderProps) => {
  const calculateOffset = (itemsNumber: number) => {
    const containerWidth = 100
    const itemWidth = containerWidth / itemsNumber
    const visiblePartOfLastItem = itemWidth / 2
    return containerWidth - visiblePartOfLastItem
  }

  const slidesPerViewBreakpoints = {
    320: { slidesPerView: isLastItemFull ? 1 : 1.5 },
    640: { slidesPerView: isLastItemFull ? 2 : 2.5 },
    768: {
      slidesPerView: isLastItemFull
        ? itemsNumber > 2
          ? 2
          : itemsNumber
        : itemsNumber - 0.5 > 2
          ? 3.5
          : itemsNumber - 0.5,
    },
    1024: {
      slidesPerView: isLastItemFull
        ? itemsNumber > 3
          ? 3
          : itemsNumber
        : itemsNumber - 0.5 > 2
          ? 3.5
          : itemsNumber - 0.5,
    },
    1280: {
      slidesPerView: isLastItemFull
        ? itemsNumber > 4
          ? 4
          : itemsNumber
        : itemsNumber - 0.5 > 3
          ? 4.5
          : itemsNumber - 0.5,
    },
    1536: { slidesPerView: isLastItemFull ? itemsNumber : itemsNumber - 0.5 },
  }

  return (
    <div className="slider-item">
      <Swiper
        slidesPerView={itemsNumber}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        slidesOffsetAfter={
          isLastItemFull ? itemsNumber : calculateOffset(itemsNumber)
        }
        breakpoints={slidesPerViewBreakpoints}
        spaceBetween={40}
      >
        <style>{HOME_SLIDER_CUSTOM_STYLE}</style>
        {cards.map((card) => (
          <SwiperSlide key={card.title}>
            <Item
              imageKey={card.imageKey}
              title={card.title}
              subTitle={card.subTitle}
              url={card.url}
              isGuide={isGuide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
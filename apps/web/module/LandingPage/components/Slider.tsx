import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { StaticImageData } from "next/image"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { useRouter } from "next/navigation"
import SliderItem from "./SliderItem"

const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

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
  const router = useRouter()

  // may be used if first link approach is not good
  const handleCardClick = (subTitle: string) => {
    const kebabCaseSubPlace = toKebabCase(subTitle)
    router.push(`/locations/${kebabCaseSubPlace}`)
  }

  const calculateOffset = (itemsNumber: number) => {
    const containerWidth = 100 // Assuming container width is 100%
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
    <Swiper
      slidesPerView={itemsNumber} // show half of the last item
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      slidesOffsetAfter={
        isLastItemFull ? itemsNumber : calculateOffset(itemsNumber)
      }
      breakpoints={slidesPerViewBreakpoints}
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
    opacity: 1; 
    right: 10px; 
  }
  .swiper-button-prev {
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
        <SwiperSlide key={card.title} className="pl-5 pr-5">
          <SliderItem
            imageKey={card.imageKey}
            title={card.title}
            subTitle={card.subTitle}
            url={card.url}
            isGuide={isGuide}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider

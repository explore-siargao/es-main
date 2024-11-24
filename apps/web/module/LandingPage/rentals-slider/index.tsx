import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { T_Rental_Filtered } from "@repo/contract-2/search-filters"
import RentalCard from "./card"
import { Typography } from "@/common/components/ui/Typography"

type SliderProps = {
  rentals: T_Rental_Filtered[]
  itemsNumber: number
  isLastItemFull?: boolean
}

const RentalsSlider = ({
  rentals,
  itemsNumber,
  isLastItemFull,
}: SliderProps) => {
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
    <div className="mb-5">
      <div className="mb-8">
        <Typography variant="h2" fontWeight="semibold" className="text-left">
          Reliable cars, motorbikes and more
        </Typography>
        <Typography variant="h4" className="text-left">
          Take the road, let's travel with one of our trusted rental partners.
        </Typography>
      </div>
      <div>
        <Swiper
          slidesPerView={itemsNumber} // show half of the last item
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          slidesOffsetAfter={
            isLastItemFull ? itemsNumber : calculateOffset(itemsNumber)
          }
          breakpoints={slidesPerViewBreakpoints}
          spaceBetween={40}
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
          {rentals.map((card) => (
            <SwiperSlide
              key={`${card.make}-${card.modelBadge}-${card.category}`}
            >
              <RentalCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default RentalsSlider

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { E_Location } from "@repo/contract-2/search-filters"
import ActivityCard from "./card"
import { Typography } from "@/common/components/ui/Typography"
import { HOME_SLIDER_CUSTOM_STYLE } from "../constants"
import useGetActivityListings from "@/module/search/activities/hooks/use-get-listings"

type SliderProps = {
  itemsNumber: number
  isLastItemFull?: boolean
}

const ActivitiesSlider = ({ itemsNumber, isLastItemFull }: SliderProps) => {
  const location = "any"
  const experienceTypes = "any"
  const activityTypes = "any"
  const durations = "any"
  const priceFrom = "any"
  const priceTo = "any"
  const starRating = "any"
  const activityDate = "any"
  const numberOfGuest = "any"
  const { data: activityUnits } = useGetActivityListings({
    page: 1,
    location: location as E_Location,
    activityTypes,
    experienceTypes,
    priceTo,
    priceFrom,
    durations,
    starRating,
    activityDate,
    numberOfGuest,
  })
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
  const activitiesData = activityUnits?.items || []
  return (
    <div className="slider-item mb-5">
      <div className="mb-8">
        <Typography variant="h2" fontWeight="semibold" className="text-left">
          Looking for something to do in Siargao?
        </Typography>
        <Typography variant="h4" className="text-left">
          We've partnered the islands for tour and activity providers.
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
          <style>{HOME_SLIDER_CUSTOM_STYLE}</style>
          {activitiesData.map((card) => (
            <SwiperSlide key={card.title}>
              <ActivityCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ActivitiesSlider

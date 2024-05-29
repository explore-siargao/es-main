import { Typography } from "@/common/components/ui/Typography"
import ListingCard from "./ListingCard"
import { HostListingsProps } from "../types/HostListings"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import SwiperCustomButton from "./SwiperCustomButton"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

const HostListings = ({ name, listings }: HostListingsProps) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
      >
        <div className="flex justify-between items-center absolute top-0 w-full z-10">
          <Typography variant="h2" fontWeight="semibold" className="text-2xl">
            {name}'s listings
          </Typography>
          <div className="hidden md:block space-x-2">
            <SwiperCustomButton />
          </div>
        </div>
        {listings?.map((data) => (
          <SwiperSlide className="mt-14" key={data.id}>
            <ListingCard
              image={
                // @ts-ignore
                data.images[0].fileKey
              }
              title={data.title}
              rating={5}
              description={"Sample description"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HostListings

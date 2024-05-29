import { ChevronLeft, ChevronRight, LucideChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useSwiper } from "swiper/react"

const SwiperCustomButton = () => {
  const swiper = useSwiper()
  const [checkSlide, setCheckSlide] = useState(false)

  useEffect(() => {}, [checkSlide])

  return (
    <>
      <button
        className="border border-gray-300 p-2 rounded-full disabled:opacity-40"
        onClick={() => {
          swiper.slidePrev()
          setCheckSlide((state) => !state)
        }}
        disabled={swiper.isBeginning}
      >
        <LucideChevronLeft className="h-4 w-4" />
      </button>
      <button
        className="border border-gray-300 p-2 rounded-full disabled:opacity-40"
        onClick={() => {
          swiper.slideNext()
          setCheckSlide((state) => !state)
        }}
        disabled={swiper.isEnd}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </>
  )
}

export default SwiperCustomButton

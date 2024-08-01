import React, { useCallback, useEffect, useState, useRef } from "react"
import Image, { StaticImageData } from "next/image"
import { Typography } from "../../ui/Typography"
import imageSrc from "../../../assets/bargraph.png"

interface BudgetSliderProps {
  imageSrc: StaticImageData
  title: string
  min: number
  max: number
  step: number
  initialMinValue: number
  initialMaxValue: number
  onValueChange: (minValue: number, maxValue: number) => void
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({
  title,
  min,
  max,
  initialMinValue,
  initialMaxValue,
  onValueChange,
}) => {
  const [minValue, setMinValue] = useState<number>(initialMinValue)
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue)
  const minValRef = useRef<number>(initialMinValue)
  const maxValRef = useRef<number>(initialMaxValue)
  const range = useRef<HTMLDivElement | null>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    const minPercent = getPercent(minValue)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minValue, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxValue)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxValue, getPercent])

  useEffect(() => {
    onValueChange(minValue, maxValue)
  }, [minValue, maxValue, onValueChange])

  return (
    <div className="w-full max-w-sm mx-auto mt-10 border rounded-md p-5 pb-5">
      <Typography fontWeight="semibold" variant="h2">
        {title}
      </Typography>
      <label
        htmlFor="budget-range"
        className="block text-lg font-medium text-gray-700 mt-2"
      >
        ₱{minValue} - ₱{maxValue}
      </label>
      <div className="relative mt-4">
        <div className="h-16 w-52 flex mx-auto opacity-20 grayscale -scale-x-100">
          <Image
            src={imageSrc}
            alt="Bar graph image"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>

        <div className="flex w-full justify-center items-center mb-4">
          <input
            type="range"
            min={min}
            max={max}
            value={minValue}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxValue - 1)
              setMinValue(value)
              minValRef.current = value
            }}
            className="thumb thumb--left absolute w-full h-0 pointer-events-none outline-none z-10"
            style={{ zIndex: minValue > max - 100 ? 20 : 10 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minValue + 1)
              setMaxValue(value)
              maxValRef.current = value
            }}
            className="thumb thumb--right absolute w-full h-0 pointer-events-none outline-none z-20"
          />

          <div className="relative w-full">
            <div
              ref={range}
              className="absolute left-0 top-0 bg-primary-400 rounded-sm h-[7px] z-[2]"
            ></div>
            <div className="absolute left-0 top-0 bg-gray-100 rounded-sm h-[7px] w-full z-[1]"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .thumb {
          -webkit-appearance: none;
          background-color: transparent;
        }
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          background-color: transparent;
          -webkit-tap-highlight-color: transparent;
          background-color: #fafbf8;
          border: none;
          border-radius: 50%;
          box-shadow: 0 0 1px 1px #ced4da;
          cursor: pointer;
          height: 20px;
          width: 20px;
          margin-top: 6px;
          pointer-events: all;
          position: relative;
        }

        /* For Firefox browsers */
        .thumb::-moz-range-thumb {
          background-color: #f1f5f7;
          border: none;
          border-radius: 50%;
          box-shadow: 0 0 1px 1px #ced4da;
          cursor: pointer;
          height: 20px;
          width: 20px;
          margin-top: 4px;
          pointer-events: all;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default BudgetSlider

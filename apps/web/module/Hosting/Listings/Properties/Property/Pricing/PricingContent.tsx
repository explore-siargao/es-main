import { Typography } from "@/common/components/ui/Typography"
import { MinusIcon, PlusIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { T_UnitPrice } from "@repo/contract"

type Props = {
  index: number
  field: {
    _id: string
    unitName: string
    unitPrice: T_UnitPrice
    unitNameForBed: string
    unitQty: number
  }
  update: (index: number, updatedField: any) => void
}

const PricingContent: React.FC<Props> = ({ index, field, update }) => {
  const { _id, unitName, unitPrice, unitNameForBed, unitQty } = field
  const cleanUnitName = unitName.startsWith("Custom: ")
    ? unitName.replace("Custom: ", "")
    : unitName

  const [baseRatePrice, setBaseRatePrice] = useState(unitPrice?.baseRate ?? 0)
  const [baseRateMax, setBaseRateMax] = useState(
    unitPrice?.baseRateMaxCapacity ?? 1
  )
  const [maxCapacity, setMaxCapacity] = useState(
    unitPrice?.maximumCapacity ?? 1
  )
  const [pricePerAddPerson, setPricePerAddPerson] = useState(
    unitPrice?.pricePerAdditionalPerson ?? 0
  )
  const [weeklyDiscountRate, setWeeklyDiscountRate] = useState(
    unitPrice?.discountedWeekLyRate ?? 0
  )

  useEffect(() => {
    update(index, {
      _id: _id,
      unitName: cleanUnitName,
      unitNameForBed: unitNameForBed,
      unitQty: unitQty,
      unitPrice: {
        _id: unitPrice?._id,
        baseRate: baseRatePrice,
        baseRateMaxCapacity: baseRateMax,
        maximumCapacity: maxCapacity,
        pricePerAdditionalPerson: pricePerAddPerson,
        discountedWeekLyRate: weeklyDiscountRate,
      },
    })
  }, [
    baseRatePrice,
    baseRateMax,
    maxCapacity,
    pricePerAddPerson,
    weeklyDiscountRate,
  ])

  return (
    <>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Base Rate
      </Typography>
      <Typography variant="h5" className="mb-2">
        What is the minimum price per night?
      </Typography>
      <div className="w-60 flex rounded-md shadow-sm mb-8">
        <input
          type="number"
          id="base-rate"
          className="block w-full min-w-0 flex-1 rounded-none rounded-l-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="0"
          value={baseRatePrice}
          onChange={(e) => setBaseRatePrice(parseInt(e.currentTarget.value))}
          required
        />
        <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
          PHP
        </span>
      </div>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Base Rate Maximum Capacity
      </Typography>
      <Typography variant="h5" className="mb-2">
        What is the base capacity for the minimum nightly rate?
      </Typography>
      <div className="flex rounded-md mb-8">
        <button
          className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={() => {
            if (baseRateMax > 1) {
              setBaseRateMax((baseRateMax) => baseRateMax - 1)
            }
          }}
        >
          <MinusIcon className="h-3 w-3" />
        </button>
        <input
          type="number"
          id="base-capacity"
          className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
          value={baseRateMax}
          onChange={() => null}
        />
        <button
          className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={() => setBaseRateMax((baseRateMax) => baseRateMax + 1)}
        >
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Additional guests
      </Typography>
      <Typography variant="h5" className="mb-2">
        How many additional guests can this property/unit comfortably sleep
        beyond the base rate maximum capacity? This will be an extra charge on
        top of your nightly rate.
      </Typography>
      <div className="flex rounded-md mb-8">
        <button
          className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={() => {
            if (maxCapacity > 1) {
              setMaxCapacity((maxCapacity) => maxCapacity - 1)
            }
          }}
        >
          <MinusIcon className="h-3 w-3" />
        </button>
        <input
          type="number"
          id="max-capacity"
          className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 pointer-events-none"
          value={maxCapacity}
          onChange={() => {}}
        />
        <button
          className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={() => setMaxCapacity((maxCapacity) => maxCapacity + 1)}
        >
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Price Per Additional Guest
      </Typography>
      <Typography variant="h5" className="mb-2">
        How much is the traditional charge per extra guest?
      </Typography>
      <div className="w-60 flex rounded-md shadow-sm mb-8">
        <input
          type="number"
          id="price-per-additional-person"
          className="block w-full min-w-0 flex-1 rounded-none rounded-l-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="0"
          value={pricePerAddPerson}
          onChange={(e) =>
            setPricePerAddPerson(parseInt(e.currentTarget.value))
          }
        />
        <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
          PHP
        </span>
      </div>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Discounts
      </Typography>
      <Typography variant="h5" className="mb-4">
        If applicable, please enter your long term stay discounts.
      </Typography>
      <Typography variant="h4" fontWeight="semibold" className="mb-1">
        Weekly Rate
      </Typography>
      <Typography variant="h5" className="mb-2">
        The following discount will apply to bookings which are 7 or more
        nights.
      </Typography>
      <div className="flex space-x-16 mb-4">
        <div className="w-60 flex rounded-md shadow-sm">
          <input
            type="number"
            id="discount-percent"
            className="block w-full min-w-0 flex-1 rounded-none rounded-l-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="0"
            value={weeklyDiscountRate}
            onChange={(e) =>
              setWeeklyDiscountRate(parseInt(e.currentTarget.value))
            }
          />
          <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            % OFF
          </span>
        </div>
        <div className="w-60 flex rounded-md shadow-sm">
          <input
            type="number"
            id="discount-total"
            className="block w-full min-w-0 flex-1 rounded-none rounded-l-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="0"
            value={(weeklyDiscountRate * baseRatePrice) / 100}
            onChange={() => {}}
            disabled
          />
          <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            PHP
          </span>
        </div>
      </div>
    </>
  )
}

export default PricingContent

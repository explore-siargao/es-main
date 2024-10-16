import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { LucideEye } from "lucide-react"
import Image from "@/common/components/ui/image"
import Link from "next/link"

const summary = [
  {
    type: "Hostel",
    basicInfo: {
      name: "Mountain top house",
      description: "House in the top of the mountain",
      phoneNumber: "09492622242",
      email: "supermario@gmail.com",
    },
    location: {
      streetAddress: "General Luna Road",
      city: "Burgos",
      barangay: "Poblacion",
      howToGetThere: "Take jeepney",
    },
    propertyFacilities: [
      {
        category: "Most Popular",
        amenity: "Bar",
      },
      {
        category: "Most Popular",
        amenity: "Sauna",
      },
      {
        category: "Services",
        amenity: "Tour desk",
      },
    ],
    units: [
      {
        name: "1-person bed",
        description: "1x1 bed with spacious alley",
        type: "Bed",
        qty: 1,
      },
      {
        name: "Small room",
        description: "Room for 1 person",
        type: "Room",
        qty: 1,
      },
    ],
    photos: [
      {
        key: "2.jpg",
        description: "Outside view",
        tag: "#outside",
        isMain: true,
      },
      {
        key: "4.jpg",
        description: "Interior view",
        tag: "#interior",
        isMain: false,
      },
    ],
    pricing: [
      {
        unit: "1-person bed",
        baseRate: 1200,
        baseRateMaxCapacity: 3,
        maxAddPerson: 1,
        priceAddPerson: 300,
        weeklyDiscountPercent: 10,
        weeklyRateDiscount: 1080,
      },
      {
        unit: "Small room",
        baseRate: 3000,
        baseRateMaxCapacity: 5,
        maxAddPerson: 2,
        priceAddPerson: 500,
        weeklyDiscountPercent: 5,
        weeklyRateDiscount: 2850,
      },
    ],
    policies: [
      {
        category: "Things To Know",
        title: "No commercial photography",
      },
      {
        title: "Carbon Monoxide installed",
      },
      {
        category: "Additional Rules",
        title: "Sample additional rule",
      },
    ],
  },
]

const Summary = () => {
  return (
    <div className="mt-20 mb-28">
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="flex justify-between items-center pb-4"
      >
        Summary
      </Typography>
      {summary.map((item, index) => (
        <div className="mt-4" key={index}>
          <div className="border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Property Type
            </Typography>
            <Typography variant="h5" className="mt-2">
              {item.type}
            </Typography>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Basic info
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Name:</span> {item.basicInfo.name}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Description:</span>{" "}
              {item.basicInfo.description}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Phone number:</span>{" "}
              {item.basicInfo.phoneNumber}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Email:</span>{" "}
              {item.basicInfo.email}
            </Typography>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Location
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Street Address:</span>{" "}
              {item.location.streetAddress}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">City / Municipality:</span>{" "}
              {item.location.city}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Barangay / District:</span>{" "}
              {item.location.barangay}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">How to get there:</span>{" "}
              {item.location.howToGetThere}
            </Typography>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Property Facilities
            </Typography>
            {Array.from(
              new Set(
                item.propertyFacilities.map((facility) => facility.category)
              )
            ).map((category) => (
              <div key={category}>
                <Typography variant="h5" className="mt-2">
                  <span className="font-semibold">{category}: </span>
                  {item.propertyFacilities
                    .filter((facility) => facility.category === category)
                    .map((facility) => facility.amenity)
                    .join(", ")}
                </Typography>
              </div>
            ))}
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Units
            </Typography>
            <ol className="list-decimal text-sm space-y-2 mt-2 ml-3.5">
              {item.units.map((unit, unitIndex) => (
                <li key={unitIndex}>
                  <div className="flex space-x-14">
                    <Typography variant="h5" className="w-40 truncate">
                      <span className="font-semibold">Name:</span> {unit.name}
                    </Typography>
                    <Typography variant="h5" className="w-72 truncate">
                      <span className="font-semibold">Description:</span>{" "}
                      {unit.description}
                    </Typography>
                    <Typography variant="h5" className="w-32 truncate">
                      <span className="font-semibold">Type:</span> {unit.type}
                    </Typography>
                    <Typography variant="h5" className="w-32 truncate">
                      <span className="font-semibold">Quantity:</span>{" "}
                      {unit.qty}
                    </Typography>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Photos
            </Typography>
            <div className="grid grid-cols-4 gap-6 mt-6">
              {item.photos.map((photo, index) => (
                <div key={index} className="h-full">
                  {photo.isMain && (
                    <div className="flex justify-center">
                      <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                        Preferred main photo
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      `relative h-52 w-full bg-primary-50 rounded-xl`,
                      photo.isMain && "border-2 border-secondary-500"
                    )}
                  >
                    <Image
                      src={"/assets/" + photo.key}
                      alt={`preview-` + index}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-xl"
                    />
                  </div>
                  <Typography
                    className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
                  >
                    {photo.description || "No description"}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Pricing
            </Typography>
            <div className="grid grid-cols-4 gap-6 mt-2">
              {item.pricing.map((pricing, pricingIndex) => (
                <div key={pricingIndex}>
                  <Typography variant="h5">
                    <span className="font-semibold">Unit: </span>
                    {pricing.unit}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Base rate: </span>
                    {pricing.baseRate}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Base rate maximum capacity:{" "}
                    </span>
                    {pricing.baseRateMaxCapacity}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Maximum capacity: </span>
                    {pricing.maxAddPerson}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Price per additional person:{" "}
                    </span>
                    {pricing.priceAddPerson}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Discounts (Weekly Rate):{" "}
                    </span>
                    {pricing.weeklyRateDiscount}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Policies
            </Typography>
            <ol className="list-decimal text-sm space-y-2 mt-2 ml-3.5">
              {item.policies.map((policy, policyIndex) => (
                <li key={policyIndex}>
                  <Typography variant="h5">{policy.title}</Typography>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
      <div className="fixed bottom-0 z-10 bg-text-50 w-full p-4 bg-opacity-60">
        <div className="flex gap-2">
          <Button size="sm" type="submit">
            Submit for review
          </Button>
          <Link href="/accommodation/1" target="_blank">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              className="flex gap-2"
            >
              <LucideEye className="h-4 w-4" /> Preview listing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Summary

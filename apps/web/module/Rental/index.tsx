import { WidthWrapper } from "@/common/components/WidthWrapper"
import RentalContainer from "./components/RentalContainer"

const dummyDataCar = [
  {
    imageKey: "/assets/fe65c50d-2cde-46e6-8c9b-58a73c59e768",
    title: "2018 Honda Civic AT",
    description: "4 seater car",
  },
  {
    imageKey: "/assets/b57d645a-a3bb-4d23-9e9b-d5caa3f0ae69",
    title: "2023 Toyota Wigo G CVT",
    description: "4 seater car",
  },
]

const ReliableCarRental = () => {
  return (
    <WidthWrapper width="medium" className="mt-24 md: mt-36 lg:mt-44">
      <RentalContainer title="Cars in Siargao" items={dummyDataCar} />
    </WidthWrapper>
  )
}

export default ReliableCarRental

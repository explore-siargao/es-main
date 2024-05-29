"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import CartList from "./components/CartList"
import SubTotalBox from "./components/SubTotalBox"

const items = [
  {
    id: 1,
    imageKey: "1.jpg",
    title: "Ocean Park Hong Kong Ticket",
    address: "Hong Kong",
    dateFrom: "2024-03-20",
    dateTo: "2024-03-25",
  },
  {
    id: 2,
    imageKey: "4.jpg",
    title:
      "The Fullertan Ocean Park Hotel Hong Kong Buffet | Ligthouse Cafe | Lunch buffet, dinner buffet",
    address: "Hong kong",
    dateFrom: "2024-04-10",
    dateTo: "2024-04-15",
  },
]

const Cart = () => {
  return (
    <WidthWrapper
      width="medium"
      className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mt-28 md:mt-36"
    >
      <div className="lg:col-span-3">
        <CartList items={items} />
      </div>

      <div className="col-span-1 relative ">
        <SubTotalBox
          subTotal={{
            serviceFee: 1000,
            durationCost: 125000,
            descTotalBeforeTaxes: 3000,
            totalBeforeTaxes: 126000,
            titlePrice: 25000,
          }}
        />
      </div>
    </WidthWrapper>
  )
}

export default Cart

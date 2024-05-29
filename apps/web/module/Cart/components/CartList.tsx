import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"
import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Button } from "@/common/components/ui/Button"
import { useState } from "react"

interface CartItems {
  id: number
  imageKey: string
  title: string
  address: string
  dateTo: string
  dateFrom: string
}

interface ICartProps {
  items: CartItems[]
}

const CartList: React.FC<ICartProps> = ({ items }) => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const toggleAllCheckboxes = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    if (newSelectAll) {
      const allIds = items.map((item) => item.id)
      setSelectedItems(allIds)
      console.log("Checked IDs:", allIds)
    } else {
      setSelectedItems([])
      console.log("Checked IDs cleared")
    }
  }

  const toggleCheckbox = (id: number) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id]
    setSelectedItems(newSelectedItems)

    if (!selectedItems.includes(id)) {
      console.log("Checkbox ID clicked:", id)
    } else {
      console.log("Checkbox ID unchecked")
    }
  }

  return (
    <>
      <div className="flex bg-white-100 mb-8 pb-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <InputCheckbox
            id={0}
            colorVariant="secondary"
            checked={selectAll}
            onChange={toggleAllCheckboxes}
          />
          <label htmlFor="selectAll" className="pt-1">
            All
          </label>
        </div>
        <Button variant="outline">Remove selected activity</Button>
      </div>
      {items.map((cartItem) => (
        <div key={cartItem.id} className=" bg-white pt-2">
          <div className="flex flex-col gap-8 sm:flex-row pt-4">
            <div className="lg:flex-none w-full sm:w-6 align-center">
              <InputCheckbox
                id={cartItem.id}
                colorVariant="secondary"
                checked={selectedItems.includes(cartItem.id)}
                onChange={() => toggleCheckbox(cartItem.id)}
              />
            </div>
            <div className="lg:flex-none pt-2 sm:w-full lg:w-1/6">
              <img
                src={`/assets/${cartItem.imageKey}`}
                width={100}
                alt={"image"}
                className="rounded-md object-cover w-full sm:w-auto"
              />
            </div>

            <div className="flex-1 w-60 sm:w-auto align-center">
              <Typography variant="h3" fontWeight="semibold">
                {cartItem.title}
              </Typography>
              <Typography variant="p">{cartItem.address}</Typography>
              <Typography variant="p">
                {cartItem.dateFrom} - {cartItem.dateTo}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pr-4 lg:pl-14">
            <div className="flex gap-4">
              <Typography
                variant="p"
                fontWeight="semibold"
                className="underline underline-offset-4 mr-4 hover:cursor-pointer"
              >
                Manage
              </Typography>
              <Typography
                variant="p"
                fontWeight="semibold"
                className="underline underline-offset-4 hover:cursor-pointer"
              >
                Remove
              </Typography>
            </div>
            <Typography variant="p" fontWeight="semibold">
              {formatCurrency(2550, "Philippines")}
            </Typography>
          </div>
          <div className="border-b mt-8"></div>
        </div>
      ))}
    </>
  )
}

export default CartList

import { useState } from "react"
import { T_Cart_Item } from "@repo/contract-2/cart"
import PropertyCartItem from "./lists/property-item"
import ActivityCartItem from "./lists/activity-item"
import RentalCartItem from "./lists/rental-item"

interface ICartProps {
  items: T_Cart_Item[]
  setSelectedItems: (items: T_Cart_Item[]) => void
  selectedItems: T_Cart_Item[]
}

const OrderSummary: React.FC<ICartProps> = ({
  items,
  setSelectedItems,
  selectedItems,
}) => {
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([])
  const [isDeleteCartItemOpen, setIsDeleteCartItemOpen] =
    useState<boolean>(false)

  const [itemId, setItemId] = useState<string>("")

  const toggleCheckbox = (id: string) => {
    const item = items.find((cartItem) => cartItem._id === id)
    if (!item) return

    if (selectedItemsIds.includes(id)) {
      setSelectedItemsIds(selectedItemsIds.filter((itemId) => itemId !== id))
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem._id !== id)
      )
    } else {
      setSelectedItemsIds([...selectedItemsIds, id])
      setSelectedItems([...selectedItems, item])
    }
  }

  return (
    <>
      {items.map((cartItem, index) => {
        if (cartItem.propertyIds) {
          return (
            <PropertyCartItem
              item={cartItem}
              selectedItems={selectedItemsIds}
              index={index}
              toggleCheckbox={toggleCheckbox}
              setIsDeleteCartItemOpen={setIsDeleteCartItemOpen}
              setItemId={setItemId}
              viewOnly={true}
            />
          )
        } else if (cartItem.activityIds) {
          return (
            <ActivityCartItem
              item={cartItem}
              selectedItems={selectedItemsIds}
              index={index}
              toggleCheckbox={toggleCheckbox}
              setIsDeleteCartItemOpen={setIsDeleteCartItemOpen}
              setItemId={setItemId}
              viewOnly={true}
            />
          )
        } else if (cartItem.rentalIds) {
          return (
            <RentalCartItem
              item={cartItem}
              selectedItems={selectedItemsIds}
              index={index}
              toggleCheckbox={toggleCheckbox}
              setIsDeleteCartItemOpen={setIsDeleteCartItemOpen}
              setItemId={setItemId}
              viewOnly={true}
            />
          )
        }
      })}
    </>
  )
}

export default OrderSummary

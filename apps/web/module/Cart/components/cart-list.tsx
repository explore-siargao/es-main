import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Button } from "@/common/components/ui/Button"
import { useEffect, useState } from "react"
import { T_Cart_Item } from "@repo/contract-2/cart"
import PropertyCartItem from "./property-cart-item"
import ActivityCartItem from "./activity-cart-item"
import RentalCartItem from "./rental-cart-item"
import DeleteCartItemModal from "./delete-cart-item-modal"
import DeleteAllSelectedItems from "./delete-all-selected-items-modal"

interface ICartProps {
  items: T_Cart_Item[]
  setSelectedItems: (items: T_Cart_Item[]) => void
  selectedItems: T_Cart_Item[]
}

const CartList: React.FC<ICartProps> = ({
  items,
  setSelectedItems,
  selectedItems,
}) => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([])
  const [isDeleteCartItemOpen, setIsDeleteCartItemOpen] =
    useState<boolean>(false)
  const [isDeleteMultipleCartItemOpen, setIsDeleteMultipleCartItemOpen] =
    useState<boolean>(false)

  const [itemId, setItemId] = useState<string>("")

  const toggleAllCheckboxes = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    if (newSelectAll) {
      const allIds = items.map((item) => item._id || "")
      setSelectedItemsIds(allIds)
      setSelectedItems(items)
    } else {
      setSelectedItemsIds([])
      setSelectedItems([])
    }
  }

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

  useEffect(() => {
    toggleAllCheckboxes()
  }, [])

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
            Select all
          </label>
        </div>
        <Button
          disabled={selectedItemsIds.length === 0}
          onClick={() => setIsDeleteMultipleCartItemOpen(true)}
          variant="outline"
        >
          Delete all selected
        </Button>
      </div>
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
            />
          )
        }
      })}
      <DeleteAllSelectedItems
        isOpen={isDeleteMultipleCartItemOpen}
        onClose={() => setIsDeleteMultipleCartItemOpen(false)}
        itemIds={selectedItemsIds}
      />
      <DeleteCartItemModal
        isOpen={isDeleteCartItemOpen}
        onClose={() => setIsDeleteCartItemOpen(false)}
        itemId={itemId}
      />
    </>
  )
}

export default CartList

import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Button } from "@/common/components/ui/Button"
import { useState } from "react"
import { T_Cart_Item } from "@repo/contract-2/cart"
import PropertyCartItem from "./property-cart-item"
import ActivityCartItem from "./activity-cart-item"
import RentalCartItem from "./rental-cart-item"
import DeleteCartItemModal from "./delete-cart-item-modal"
import DeleteAllSelectedItems from "./delete-all-selected-items-modal"

interface ICartProps {
  items: T_Cart_Item[]
  setSelectedItemsPrice: (price: number[]) => void
  selectedItemsPrice: number[]
}

const CartList: React.FC<ICartProps> = ({ items, setSelectedItemsPrice, selectedItemsPrice }) => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isDeleteCartItemOpen, setIsDeleteCartItemOpen] = useState<boolean>(false)
  const [isDeleteMultipleCartItemOpen, setIsDeleteMultipleCartItemOpen] = useState<boolean>(false)
  
  const [itemId, setItemId] = useState<string>("")
  
  const toggleAllCheckboxes = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    if (newSelectAll) {
      const allIds = items.map((item) => item._id)
      const allPrices = items.map((item) => item.price)
      setSelectedItems(allIds)
      setSelectedItemsPrice(allPrices)
    } else {
      setSelectedItems([])
      setSelectedItemsPrice([])
    }
  }

  const toggleCheckbox = (id: string, price: number) => {
    if (selectedItems.includes(id)) {
      // If the item is already selected, remove it and its price
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      setSelectedItemsPrice(selectedItemsPrice.filter((itemPrice, index) => selectedItems[index] !== id));
    } else {
      // If the item is not selected, add it and its price
      setSelectedItems([...selectedItems, id]);
      setSelectedItemsPrice([...selectedItemsPrice, price]);
    }
  };
  
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
        <Button disabled={selectedItems.length === 0} onClick={() => setIsDeleteMultipleCartItemOpen(true)} variant="outline">Delete all selected</Button>
      </div>
      {items.map((cartItem, index) => {
        if(cartItem.propertyIds) {
          return (
            <PropertyCartItem 
              item={cartItem} 
              selectedItems={selectedItems} 
              index={index} 
              toggleCheckbox={toggleCheckbox}
              setIsDeleteCartItemOpen={setIsDeleteCartItemOpen}
              setItemId={setItemId}
            />
          )
        } else if(cartItem.activityIds) {
          return (
            <ActivityCartItem 
              item={cartItem} 
              selectedItems={selectedItems} 
              index={index} 
              toggleCheckbox={toggleCheckbox}
              setIsDeleteCartItemOpen={setIsDeleteCartItemOpen}
              setItemId={setItemId}
            />
          )
        } else if(cartItem.rentalIds) {
          return (
            <RentalCartItem 
              item={cartItem} 
              selectedItems={selectedItems} 
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
        itemIds={selectedItems}
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

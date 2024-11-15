import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"
import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Button } from "@/common/components/ui/Button"
import { useState } from "react"
import { Clock, Pencil, Trash } from "lucide-react"
import useGetCartItems from "@/common/hooks/useGetCartItems"
import { format } from "date-fns"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { indexOf } from "lodash"
import PropertyCartItem from "./property-cart-item"
import ActivityCartItem from "./activity-cart-item"

interface ICartProps {
  items: T_Cart_Item[]
}

const CartList: React.FC<ICartProps> = ({ items }) => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  
  const toggleAllCheckboxes = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    if (newSelectAll) {
      const allIds = items.map((item) => indexOf(items, item))
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
            Select all
          </label>
        </div>
        <Button variant="outline">Delete all selected</Button>
      </div>
      {items.map((cartItem, index) => {
        if(cartItem.propertyIds) {
          return (
            <PropertyCartItem 
              item={cartItem} 
              selectedItems={selectedItems} 
              index={index} 
              toggleCheckbox={toggleCheckbox}
            />
          )
        } else if(cartItem.activityIds) {
          return (
            <ActivityCartItem 
              item={cartItem} 
              selectedItems={selectedItems} 
              index={index} 
              toggleCheckbox={toggleCheckbox}
            />
          )
        }
      })}
    </>
  )
}

export default CartList

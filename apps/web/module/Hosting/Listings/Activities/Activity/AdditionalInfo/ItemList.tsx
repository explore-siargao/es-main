"use client"
import React, { useState } from "react"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { LucideMinus, LucidePlus } from "lucide-react"
import toast from "react-hot-toast"
import { useItemStore } from "./store/useItemStore"

interface ItemListProps {
  title: string
  category: "whatToBring" | "notAllowed" | "policies"
  buttonName?: "Add another item" | "Add another policy"
}

const ItemList: React.FC<ItemListProps> = ({ title, category, buttonName }) => {
  const inclusions = useItemStore((state) => state[category])
  const addItem = useItemStore((state) => state.addItem)
  const removeItem = useItemStore((state) => state.removeItem)

  const [inclusionName, setInclusionName] = useState<string>("")

  const handleAddItem = () => {
    if (!inclusionName.trim()) {
      toast.error("Please enter a valid item name")
      return
    }
    addItem(inclusionName, category)
    setInclusionName("")
  }

  return (
    <div className="">
      <Typography>{title}</Typography>
      <Input
        className="p-2 rounded-md mt-2"
        value={inclusionName}
        type="text"
        label=""
        onChange={(event) => setInclusionName(event.target.value)}
      />

      <ul className="mt-4">
        {inclusions.map((item) => (
          <li
            key={item}
            className="mt-2 p-2 border border-gray-300 rounded-md flex justify-between items-center"
          >
            <p className="text-sm">{item}</p>
            <button
              className="hover:cursor-pointer"
              onClick={() => removeItem(item, category)}
              aria-label="Remove Item"
            >
              <LucideMinus
                color="white"
                className="bg-secondary-400 rounded-sm w-5 h-5"
              />
            </button>
          </li>
        ))}
      </ul>
      <button
        className="flex hover:cursor-pointer my-4 gap-1"
        onClick={handleAddItem}
        type="button"
      >
        <LucidePlus color="black" className=" w-5 h-5" />
        <Typography>{buttonName || "Add another item"}</Typography>
      </button>
    </div>
  )
}

export default ItemList

import { E_Listing_Category } from "@repo/contract"
import React, { Dispatch } from "react"
import { Button } from "../ui/Button"

const propertyEnum = E_Listing_Category.Property
const activityEnum = E_Listing_Category.Activity
const rentalEnum = E_Listing_Category.Rental

const CATEGORIES_BUTTONS = [
  { name: "Places to stay", category: propertyEnum },
  { name: "Activities", category: activityEnum },
  { name: "Rentals", category: rentalEnum },
]

const CategoryButtonsByState = ({
  category: currCategory,
  setCategory,
  light = false,
}: {
  category: E_Listing_Category
  setCategory: Dispatch<E_Listing_Category>
  light?: boolean
}) => {
  return (
    <>
      {CATEGORIES_BUTTONS.map(({ name, category }) => (
        <Button
          variant="link"
          size="sm"
          onClick={() => setCategory(category)}
          className={`${currCategory === category ? "font-bold underline underline-offset-4" : ""} ${light ? "text-white" : "text-text-950"}  hover:text-secondary-500 transition px-0 text-md`}
        >
          {name}
        </Button>
      ))}
    </>
  )
}

export default CategoryButtonsByState
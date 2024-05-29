"use client"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Input } from "@/common/components/ui/Input"
import { LucideMinus, LucidePlus } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/common/components/ui/Button"

const itemMeal = [
  { value: "Beverage", label: "Beverage" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
  { value: "Snacks", label: "Snacks" },
]

const itemAlcohols = [
  { value: "Beer", label: "Beer" },
  { value: "Wine", label: "Wine" },
  { value: "Spirits", label: "Spirits" },
]

interface Item {
  id: number
  name: string
}

interface RadioProps {
  id: string
  value: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label: string
}

const RadioInput: React.FC<RadioProps> = ({
  id,
  value,
  checked,
  onChange,
  label,
}) => (
  <div>
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="cursor-pointer ml-auto w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
    />
    <label htmlFor={id} className="ml-2">
      {label}
    </label>
  </div>
)

interface DropdownProps {
  isOpen: boolean
  toggleDropdown: () => void
  selectedItem: string
  handleOptionSelect: (value: string) => void
  items: { value: string; label: string }[]
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  toggleDropdown,
  selectedItem,
  handleOptionSelect,
  items,
}) => (
  <div className="relative">
    <button
      type="button"
      onClick={toggleDropdown}
      className="cursor-pointer appearance-none w-1/4 mt-2 bg-primary-500 border-white text-white py-2 px-3 pr-8 rounded-md flex justify-between items-center focus:outline-none focus:bg-primary-300 focus:border-primary-500 focus:ring-primary-500"
    >
      {selectedItem || "Select option"}
      <svg
        className="h-5 w-5 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
    {isOpen && (
      <div className="text-start absolute z-10 left-0 mt-2 w-1/4 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item) => (
          <button
            key={item.value}
            className="hover:bg-primary-500 text-gray-800 cursor-pointer px-4 py-2 flex w-full"
            onClick={() => handleOptionSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
  </div>
)

const Inclusions: React.FC = () => {
  const [foodIncluded, setFoodIncluded] = useState<boolean>(false)
  const [nonAlcoholicDrinksIncluded, setNonAlcoholicDrinksIncluded] =
    useState<boolean>(false)
  const [alcoholicDrinksIncluded, setAlcoholicDrinksIncluded] =
    useState<boolean>(false)
  const [inclusions, setInclusions] = useState<Item[]>([])
  const [exclusions, setExclusions] = useState<Item[]>([])
  const [inclusionName, setInclusionName] = useState<string>("")
  const [exclusionName, setExclusionName] = useState<string>("")
  const [selectedFoodOption, setSelectedFoodOption] = useState<string>("")
  const [selectedAlcoholOption, setSelectedAlcoholOption] = useState<string>("")
  const [isOpenFood, setIsOpenFood] = useState(false)
  const [isOpenAlcohol, setIsOpenAlcohol] = useState(false)

  const toggleDropdown = (dropdownId: string) => {
    if (dropdownId === "food") {
      setIsOpenFood(!isOpenFood)
    } else if (dropdownId === "alcohol") {
      setIsOpenAlcohol(!isOpenAlcohol)
    }
  }

  const handleOptionSelect = (value: string, dropdownId: string) => {
    if (dropdownId === "food") {
      setSelectedFoodOption(value)
      setIsOpenFood(false)
    } else if (dropdownId === "alcohol") {
      setSelectedAlcoholOption(value)
      setIsOpenAlcohol(false)
    }
  }

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setOption: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value === "yes")
    if (event.target.value === "no") {
      setOption("")
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      foodIncluded,
      nonAlcoholicDrinksIncluded,
      alcoholicDrinksIncluded,
      selectedFoodOption,
      selectedAlcoholOption,
      otherIncluded: inclusions.map((item) => item.name),
      otherNotIncluded: exclusions.map((item) => item.name),
    }
    console.log("Payload:", payload)
  }

  const addItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const itemName = name.trim()
    if (!itemName) {
      toast.error("Add item first.")
      return
    }
    const data = { id: Date.now(), name: itemName }
    setList([...list, data])
    setName("")
  }

  const removeItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    idToRemove: number
  ) => {
    setList((prevItems) => prevItems.filter((item) => item.id !== idToRemove))
  }

  return (
    <div className="mt-20 mb-14">
      <Typography variant="h1" fontWeight="semibold" className="mb-4">
        Inclusions
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <Typography className="mb-2">
            Is food included in your activity?
          </Typography>
          <RadioInput
            id="foodYes"
            value="yes"
            checked={foodIncluded}
            onChange={(e) =>
              handleOptionChange(e, setFoodIncluded, setSelectedFoodOption)
            }
            label="Yes"
          />
          <RadioInput
            id="foodNo"
            value="no"
            checked={!foodIncluded}
            onChange={(e) =>
              handleOptionChange(e, setFoodIncluded, setSelectedFoodOption)
            }
            label="No"
          />
          {foodIncluded && (
            <Dropdown
              isOpen={isOpenFood}
              toggleDropdown={() => toggleDropdown("food")}
              selectedItem={selectedFoodOption}
              handleOptionSelect={(value) => handleOptionSelect(value, "food")}
              items={itemMeal}
            />
          )}
        </div>
        <div>
          <Typography className="mb-2 mt-4">
            Are non-alcoholic drinks included in your activity?
          </Typography>
          <RadioInput
            id="nonAlcoholYes"
            value="yes"
            checked={nonAlcoholicDrinksIncluded}
            onChange={(e) =>
              handleOptionChange(e, setNonAlcoholicDrinksIncluded, () => {})
            }
            label="Yes"
          />
          <RadioInput
            id="nonAlcoholNo"
            value="no"
            checked={!nonAlcoholicDrinksIncluded}
            onChange={(e) =>
              handleOptionChange(e, setNonAlcoholicDrinksIncluded, () => {})
            }
            label="No"
          />
        </div>
        <div>
          <Typography className="mb-2 mt-4">
            Is alcohol drinks included in your activity (18+)?
          </Typography>
          <RadioInput
            id="alcoholYes"
            value="yes"
            checked={alcoholicDrinksIncluded}
            onChange={(e) =>
              handleOptionChange(
                e,
                setAlcoholicDrinksIncluded,
                setSelectedAlcoholOption
              )
            }
            label="Yes"
          />
          <RadioInput
            id="alcoholNo"
            value="no"
            checked={!alcoholicDrinksIncluded}
            onChange={(e) =>
              handleOptionChange(
                e,
                setAlcoholicDrinksIncluded,
                setSelectedAlcoholOption
              )
            }
            label="No"
          />
          {alcoholicDrinksIncluded && (
            <Dropdown
              isOpen={isOpenAlcohol}
              toggleDropdown={() => toggleDropdown("alcohol")}
              selectedItem={selectedAlcoholOption}
              handleOptionSelect={(value) =>
                handleOptionSelect(value, "alcohol")
              }
              items={itemAlcohols}
            />
          )}
        </div>

        <div className="md:w-1/4 pt-8">
          <Typography>What else is included in your activity?</Typography>
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
                key={item.id}
                className="mt-2 p-2 border border-gray-300 rounded-md flex justify-between items-center"
              >
                <p className="text-sm">{item.name}</p>
                <button
                  className="hover:cursor-pointer"
                  onClick={() => removeItem(inclusions, setInclusions, item.id)}
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
            className="flex hover:cursor-pointer my-4 gap-2"
            onClick={() =>
              addItem(
                inclusions,
                setInclusions,
                inclusionName,
                setInclusionName
              )
            }
          >
            <LucidePlus
              color="white"
              className="bg-primary-400 rounded-sm w-5 h-5"
            />
            <Typography> Add inclusion</Typography>
          </button>
        </div>

        <div className="md:w-1/4 pt-4">
          <Typography>What else is not included?</Typography>
          <Input
            className="p-2 rounded-md mt-2"
            value={exclusionName}
            type="text"
            label=""
            onChange={(event) => setExclusionName(event.target.value)}
          />

          <ul className="mt-4">
            {exclusions.map((item) => (
              <li
                key={item.id}
                className="mt-2 p-2 border border-gray-300 rounded-md flex justify-between items-center"
              >
                <p className="text-sm">{item.name}</p>
                <button
                  className="hover:cursor-pointer"
                  onClick={() => removeItem(exclusions, setExclusions, item.id)}
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
            className="flex hover:cursor-pointer my-4 gap-2"
            onClick={() =>
              addItem(
                exclusions,
                setExclusions,
                exclusionName,
                setExclusionName
              )
            }
          >
            <LucidePlus
              color="white"
              className="bg-primary-400 rounded-sm w-5 h-5"
            />
            <Typography> Add exclusion</Typography>
          </button>
        </div>

        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button size="sm" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Inclusions

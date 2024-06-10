"use client"
import React, { useState, ChangeEvent, useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Input } from "@/common/components/ui/Input"
import { LucideMinus, LucidePlus, LucideX } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/common/components/ui/Button"
import useGetActivityInclusionsById from "../../hooks/useGetActivityInclusionsById"
import { Spinner } from "@/common/components/ui/Spinner"
import useUpdateActivityInclusions from "../../hooks/useUpdateActivityInclusions"
import { T_Update_Activity_Inclusions } from "@repo/contract"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"

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
      className="cursor-pointer ml-auto w-4 h-4 text-primary-600  focus:ring-primary-500 dark:focus:ring-primary-600"
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

type Prop = {
  pageType: "setup" | "edit"
}

const Inclusions = ({ pageType }: Prop) => {
  const queryClient = useQueryClient()
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

  const { isPending, data } = useGetActivityInclusionsById(
    "66614eb7e86b02e14c8fdad1"
  )
  const { isPending: updateInclusions, mutate } = useUpdateActivityInclusions(
    "6662c9a27fcfccd907b37b9e"
  )

  const { handleSubmit, register } = useForm<T_Update_Activity_Inclusions>({})

  const toggleDropdown = (dropdownId: string) => {
    if (dropdownId === "food") {
      setIsOpenFood(!isOpenFood)
    } else if (dropdownId === "alcohol") {
      setIsOpenAlcohol(!isOpenAlcohol)
    }
  }

  const mergedFoodOptions = [
    ...(data?.item?.selectedFoodOptions || []),
    { value: "Beverage", label: "Beverage" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snacks", label: "Snacks" },
  ]

  const mergedAlcoholOptions = [
    ...(data?.item?.selectedAlcoholicDrinkOptions || []),
    { value: "Beer", label: "Beer" },
    { value: "Wine", label: "Wine" },
    { value: "Spirits", label: "Spirits" },
  ]

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
    const newItem = { id: Date.now(), name: itemName }
    setList([...list, newItem])
    setName("")
  }

  const removeItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    idToRemove: number
  ) => {
    setList((prevItems) => prevItems.filter((item) => item.id !== idToRemove))
  }

  useEffect(() => {
    if (data) {
      setInclusions(
        (data.item?.otherInclusion || []).map(
          (name: string, index: number) => ({ id: index + 1, name })
        )
      )
      setExclusions(
        (data.item?.notIncluded || []).map((name: string, index: number) => ({
          id: index + 1,
          name,
        }))
      )
      setSelectedFoodOption(data?.item?.isFoodIncluded)
      setAlcoholicDrinksIncluded(data?.item?.isAlcoholicDrinkIncluded)
      setNonAlcoholicDrinksIncluded(data?.item?.isNonAlcoholicDrinkIncluded)
    }
  }, [data])

  const handleInput = (inputValue: string) => {
    setInclusionName(inputValue)
  }
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setExclusionName(event.target.value)
  }

  const updateList = (
    inputValue: string,
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    setName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const updatedList = [...list]
    if (inputValue.trim() !== "") {
      updatedList.push({ id: updatedList.length + 1, name: inputValue })
      setName("")
    }
    setList(updatedList)
  }

  const onSubmit: SubmitHandler<T_Update_Activity_Inclusions> = () => {
    updateList(inclusionName, inclusions, setInclusions, setInclusionName)
    updateList(exclusionName, exclusions, setExclusions, setExclusionName)

    const updatedInclusions = [...inclusions]
    const updatedExclusions = [...exclusions]

    if (inclusionName.trim() !== "") {
      updatedInclusions.push({
        id: updatedInclusions.length + 1,
        name: inclusionName,
      })
      setInclusionName("")
    }

    if (exclusionName.trim() !== "") {
      updatedExclusions.push({
        id: updatedExclusions.length + 1,
        name: exclusionName,
      })
      setExclusionName("")
    }

    const payload = {
      isFoodIncluded: foodIncluded,
      isNonAlcoholicDrinkIncluded: nonAlcoholicDrinksIncluded,
      isAlcoholicDrinkIncluded: alcoholicDrinksIncluded,
      otherInclusion: updatedInclusions.map((item) => item.name),
      notIncluded: updatedExclusions.map((item) => item.name),
      selectedAlcoholicDrinkOptions: selectedAlcoholOption
        ? [selectedAlcoholOption]
        : [],
      selectedFoodOptions: selectedFoodOption ? [selectedFoodOption] : [],
    }

    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["get-activities-inclusions"],
          })
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }

    mutate(payload, callBackReq)
  }

  return (
    <div className="mt-20 mb-32">
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6"
        >
          <div>
            <Typography variant="h1" fontWeight="semibold" className="mb-4">
              Inclusions
            </Typography>

            <div>
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                Is food included in your activity?
              </Typography>
              <RadioInput
                id="foodYes"
                value="yes"
                checked={foodIncluded === true}
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
                  selectedItem={selectedFoodOption || "Select Meal"}
                  handleOptionSelect={(value) =>
                    handleOptionSelect(value, "food")
                  }
                  items={mergedFoodOptions}
                />
              )}
            </div>
            <div>
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                Are non-alcoholic drinks included in your activity?
              </Typography>
              <RadioInput
                id="nonAlcoholYes"
                value="yes"
                checked={nonAlcoholicDrinksIncluded === true}
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
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                Is alcoholic drinks included in your activity (18+)?
              </Typography>
              <RadioInput
                id="alcoholYes"
                value="yes"
                checked={alcoholicDrinksIncluded === true}
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
                  selectedItem={selectedAlcoholOption || "Select Beverage"}
                  handleOptionSelect={(value) =>
                    handleOptionSelect(value, "alcohol")
                  }
                  items={mergedAlcoholOptions}
                />
              )}
            </div>

            <div className="mt-4">
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                What else is included in your activity?
              </Typography>
              {inclusions.length > 0 && (
                <ul>
                  {inclusions.map((item) => (
                    <li
                      key={item.id}
                      className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                    >
                      <p className="text-sm">{item.name}</p>
                      <button
                        className="hover:cursor-pointer"
                        onClick={() =>
                          removeItem(inclusions, setInclusions, item.id)
                        }
                        aria-label="Remove Item"
                      >
                        <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2">
                <Input
                  className="p-2 rounded-md"
                  type="text"
                  label="Included"
                  onChange={(event) => {
                    const inputValue = event.target.value
                    setInclusionName(inputValue)
                    handleInput(inputValue)
                  }}
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                    onClick={() =>
                      addItem(
                        inclusions,
                        setInclusions,
                        inclusionName,
                        setInclusionName
                      )
                    }
                  >
                    <LucidePlus color="black" className="rounded-sm w-4 h-4" />
                    <Typography className="text-sm"> Add inclusion</Typography>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                What else is not included?
              </Typography>
              {exclusions.length > 0 && (
                <ul>
                  {exclusions.map((item) => (
                    <li
                      key={item.id}
                      className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                    >
                      <p className="text-sm">{item.name}</p>
                      <button
                        className="hover:cursor-pointer"
                        onClick={() =>
                          removeItem(exclusions, setExclusions, item.id)
                        }
                        aria-label="Remove Item"
                      >
                        <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2">
                <Input
                  className="p-2 rounded-md"
                  type="text"
                  label="Excluded"
                  onChange={handleInputChange}
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                    onClick={() =>
                      addItem(
                        exclusions,
                        setExclusions,
                        exclusionName,
                        setExclusionName
                      )
                    }
                  >
                    <LucidePlus color="black" className="rounded-sm w-4 h-4" />
                    <Typography className="text-sm"> Add exclusion</Typography>
                  </button>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
              <Button size="sm" type="submit">
                {updateInclusions ? (
                  <Spinner>Loading...</Spinner>
                ) : (
                  " Save Changes"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Inclusions

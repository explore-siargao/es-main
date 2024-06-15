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
import { useParams, useRouter } from "next/navigation"
import { Option, Select } from "@/common/components/ui/Select"

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

type Prop = {
  pageType: "setup" | "edit"
}

const foodOptions = [
  { value: "Beverage", label: "Beverage" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
  { value: "Snacks", label: "Snacks" },
]

const alcoholOptions = [
  { value: "Beer", label: "Beer" },
  { value: "Wine", label: "Wine" },
  { value: "Spirits", label: "Spirits" },
]

const Inclusions = ({ pageType }: Prop) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [nonAlcoholicDrinksIncluded, setNonAlcoholicDrinksIncluded] =
    useState<string>("No")
  const [alcoholicDrinksIncluded, setAlcoholicDrinksIncluded] =
    useState<string>("No")

  const [inclusions, setInclusions] = useState<Item[]>([])
  const [exclusions, setExclusions] = useState<Item[]>([])
  const [inclusionName, setInclusionName] = useState<string>("")
  const [exclusionName, setExclusionName] = useState<string>("")
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [selectedAlcohols, setSelectedAlcohols] = useState<string[]>([])
  const params = useParams<{ listingId: string }>()
  const activityId = String(params.listingId)
  const { isPending, data } = useGetActivityInclusionsById(activityId)
  const { isPending: updateInclusions, mutate } =
    useUpdateActivityInclusions(activityId)
  const [foodIncluded, setFoodIncluded] = useState<string>("No")
  const { handleSubmit, register } = useForm<T_Update_Activity_Inclusions>({})

  const addItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const itemName = name.trim()
    if (!itemName) {
      toast.error("Add item first")
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

  const removeAlcohol = (alcohol: string) => {
    const isExist = selectedAlcohols.find((item) => item === alcohol)
    if (isExist) {
      const updated = selectedAlcohols.filter((e) => e !== alcohol)
      setSelectedAlcohols([...updated])
    }
  }

  const removeFood = (food: string) => {
    const isExist = selectedFoods.find((item) => item === food)
    if (isExist) {
      const updated = selectedFoods.filter((e) => e !== food)
      setSelectedFoods([...updated])
    }
  }

  useEffect(() => {
    if (!isPending && data && data.item) {
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
      setFoodIncluded(data?.item?.isFoodIncluded ? "Yes" : "No")
      setAlcoholicDrinksIncluded(
        data?.item?.isAlcoholicDrinkIncluded ? "Yes" : "No"
      )
      setNonAlcoholicDrinksIncluded(
        data?.item?.isNonAlcoholicDrinkIncluded ? "Yes" : "No"
      )
      setSelectedFoods(data?.item?.includedFoods)
      setSelectedAlcohols(data?.item?.includedAlcoholicDrinks)
    }
  }, [data, isPending])

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
      isFoodIncluded: foodIncluded === "Yes" ? true : false,
      isNonAlcoholicDrinkIncluded:
        nonAlcoholicDrinksIncluded === "Yes" ? true : false,
      isAlcoholicDrinkIncluded:
        alcoholicDrinksIncluded === "Yes" ? true : false,
      otherInclusion: updatedInclusions.map((item) => item.name),
      notIncluded: updatedExclusions.map((item) => item.name),
      includedAlcoholicDrinks: selectedAlcohols,
      includedFoods: selectedFoods,
    }

    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["activity", activityId],
          })
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["activity-finished-sections", activityId],
            })
            router.push(
              `/hosting/listings/activities/setup/${activityId}/additional-info`
            )
          }
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
                id="food"
                value="yes"
                checked={foodIncluded === "Yes"}
                onChange={() => setFoodIncluded("Yes")}
                label="Yes"
              />
              <RadioInput
                id="food"
                value="no"
                checked={foodIncluded === "No"}
                onChange={() => setFoodIncluded("No")}
                label="No"
              />
              {foodIncluded === "Yes" && (
                <Select
                  label="Select Food"
                  id="foodIncluded"
                  required
                  disabled={isPending}
                  className="mt-4"
                  onChange={(e) => {
                    const exist = selectedFoods.find(
                      (item) => item === e.target.value
                    )
                    if (!exist) {
                      setSelectedFoods([...selectedFoods, e.target.value])
                    }
                  }}
                >
                  <Option value="">Select</Option>
                  {foodOptions.map((key) => {
                    return <Option value={key.value}>{key.label}</Option>
                  })}
                </Select>
              )}
              {selectedFoods.length > 0 && (
                <div className="flex gap-4 pt-4">
                  {selectedFoods.map((food) => (
                    <div className="bg-primary-400 text-text-500 font-semibold py-2 px-3 rounded-lg text-xs flex gap-2 items-center">
                      {food}
                      <button type="button" onClick={() => removeFood(food)}>
                        <LucideX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-6">
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                Are non-alcoholic drinks included in your activity?
              </Typography>
              <RadioInput
                id="nonAlcoholYes"
                value="yes"
                checked={nonAlcoholicDrinksIncluded === "Yes"}
                onChange={() => setNonAlcoholicDrinksIncluded("Yes")}
                label="Yes"
              />
              <RadioInput
                id="nonAlcoholNo"
                value="no"
                checked={nonAlcoholicDrinksIncluded === "No"}
                onChange={() => setNonAlcoholicDrinksIncluded("No")}
                label="No"
              />
            </div>
            <div className="mt-6">
              <Typography variant="h4" fontWeight="semibold" className="mb-4">
                Is alcoholic drinks included in your activity (18+)?
              </Typography>
              <RadioInput
                id="alcoholYes"
                value="yes"
                checked={alcoholicDrinksIncluded === "Yes"}
                onChange={() => setAlcoholicDrinksIncluded("Yes")}
                label="Yes"
              />
              <RadioInput
                id="alcoholNo"
                value="no"
                checked={alcoholicDrinksIncluded === "No"}
                onChange={() => setAlcoholicDrinksIncluded("No")}
                label="No"
              />
              {alcoholicDrinksIncluded === "Yes" && (
                <Select
                  label="Select Drinks"
                  id="beverageIncluded"
                  required
                  disabled={isPending}
                  className="mt-4"
                  onChange={(e) => {
                    const exist = selectedAlcohols.find(
                      (item) => item === e.target.value
                    )
                    if (!exist) {
                      setSelectedAlcohols([...selectedAlcohols, e.target.value])
                    }
                  }}
                >
                  <Option value="">Select</Option>
                  {alcoholOptions.map((key) => {
                    return <Option value={key.value}>{key.label}</Option>
                  })}
                </Select>
              )}
              {selectedAlcohols.length > 0 && (
                <div className="flex gap-4 pt-4">
                  {selectedAlcohols.map((alcohol) => (
                    <div className="bg-primary-400 text-text-500 font-semibold py-2 px-3 rounded-lg text-xs flex gap-2 items-center">
                      {alcohol}
                      <button
                        type="button"
                        onClick={() => removeAlcohol(alcohol)}
                      >
                        <LucideX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  value={inclusionName}
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
                    onClick={() => {
                      addItem(
                        inclusions,
                        setInclusions,
                        inclusionName,
                        setInclusionName
                      )
                    }}
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
                  value={exclusionName}
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

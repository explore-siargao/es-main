"use client"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import Checkbox from "@/common/components/ui/InputCheckbox"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import { LucideMinus, LucidePlus, MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useGetActivitiesById from "@/module/Hosting/Activity/hooks/useGetActivitiesById"
import useUpdateActivityBasicInfo from "../../hooks/useUpdateActivityBasicInfo"
import { SubmitHandler, useForm } from "react-hook-form"
import { T_Update_Activity_Basic_Info } from "@repo/contract"
import { useQueryClient } from "@tanstack/react-query"
import { Spinner } from "@/common/components/ui/Spinner"

interface Item {
  id: number
  itemName: string
}

const languages = ["Visaya", "Tagalog", "English"]

type Prop = {
  pageType: "setup" | "edit"
}

const BasicInfo = ({ pageType }: Prop) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [itemData, setItemData] = useState<Item[]>([])
  const [itemList, setItemList] = useState<Item[]>([])
  const [durationHour, setDurationHour] = useState(0)
  const [durationMinute, setDurationMinute] = useState(0)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const lastId = itemList.reduce(
    (max, item) => (Number(item.id) > max ? Number(item.id) : max),
    0
  )
  const { register, handleSubmit, setValue } =
    useForm<T_Update_Activity_Basic_Info>({})

  const queryClient = useQueryClient()
  const { isPending, data } = useGetActivitiesById(1)
  const { isPending: updatePending, mutate } = useUpdateActivityBasicInfo(1)

  const addButton = () => {
    if (itemData.length === 0) {
      toast.error("Add item first")
      return
    } else if (itemList.length + itemData.length > 5) {
      toast.error("Maximum 5 items allowed.")
      return
    } else {
      const newItems = itemData.map((item, index) => ({
        id: lastId + index + 1,
        itemName: item.itemName,
      }))
      setItemList((prevItemList) => [...prevItemList, ...newItems])
      setItemData([])
    }
  }

  const removeItem = (idToRemove: number) => {
    setItemList((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    )
  }

  const toggleCheckbox = (language: string) => {
    setSelectedLanguages((prevLanguages) => {
      if (prevLanguages.includes(language)) {
        return prevLanguages.filter((lang) => lang !== language)
      } else {
        return [...prevLanguages, language]
      }
    })
  }
  useEffect(() => {
    if (data) {
      setDurationHour(data?.item?.durationHour || 0)
      setDurationMinute(data?.item?.durationMinute || 0)

      setValue("durationHour", data?.item?.durationHour || 0)
      setValue("durationMinute", data?.item?.durationMinute || 0)

      setItemList(
        data?.item?.highLights.map((itemName: string, index: number) => ({
          id: index + 1,
          itemName: itemName,
        })) || []
      )

      setSelectedLanguages(data?.item?.language || [])
      console.log("Selected:", data?.item?.language)
    }
  }, [data])

  const handleSaveChanges = () => {
    if (itemData.length > 0 && itemData[0]?.itemName?.trim() !== "") {
      const firstItem = itemData[0]
      if (firstItem?.itemName) {
        setItemList((prevItemList) => [
          ...prevItemList,
          { id: lastId + 1, itemName: firstItem.itemName.trim() },
        ])
        setItemData([])
      }
    }
  }

  const onSubmit: SubmitHandler<T_Update_Activity_Basic_Info> = (
    formData: T_Update_Activity_Basic_Info
  ) => {
    const parsedDurationHour = parseInt(durationHour.toString(), 10)

    if (!isNaN(parsedDurationHour)) {
      const numberOfHighlights = itemList.length

      if (numberOfHighlights >= 3 && numberOfHighlights <= 5) {
        const updatedFormData = {
          ...formData,
          title: title,
          description: description,
          language: selectedLanguages,
          durationHour: durationHour,
          durationMinute: durationMinute,
          highLights: itemList.map((item) => item.itemName),
        }

        const callBackReq = {
          onSuccess: (data: any) => {
            if (!data.error) {
              toast.success(data.message)
              queryClient.invalidateQueries({
                queryKey: ["get-activities-basic-info"],
              })
            } else {
              toast.error(String(data.message))
            }
          },
          onError: (err: any) => {
            toast.error(String(err))
          },
        }

        mutate(updatedFormData, callBackReq)
      } else {
        if (!isNaN(parsedDurationHour)) {
          const numberOfHighlights = itemList.length

          if (numberOfHighlights < 3) {
            toast.error("Minimum of 3 entries required in highlights.")
          } else {
            toast.error("Maximum of 5 entries allowed in highlights.")
          }
        } else {
          toast.error("Duration hour must be a valid number.")
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div className="mt-20 mb-28">
          <div className="mb-8">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Basics
            </Typography>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <Input
                type="text"
                label="Activity title"
                defaultValue={data?.item?.title}
                {...register("title")}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="mt-2 relative rounded-md ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600">
                <label
                  htmlFor="descriptionTextarea"
                  className="block text-xs font-medium text-text-900 px-3 pt-2"
                >
                  Description
                </label>
                <textarea
                  id="descriptionTextarea"
                  className="flex min-h-[80px] w-full px-3 pt-1 text-sm border-0 focus:ring-0 bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={data?.item?.description}
                  {...register("description")}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={3000}
                />
              </div>

              <p className=" flex text-xs text-gray-500 justify-end">{`${description.length}/3000 characters`}</p>
              <Input
                className="p-2 rounded-md mt-2"
                value={itemData.length > 0 ? itemData[0]?.itemName || "" : ""}
                type="text"
                label="Activity highlights"
                {...register("highLights")}
                onChange={(event) =>
                  setItemData([
                    { id: lastId + 1, itemName: event.target.value },
                  ])
                }
              />
              <ul className="mt-4">
                {itemList.map((item) => (
                  <li
                    key={item.id}
                    className="mt-2 p-2 border border-gray-300 rounded-md flex justify-between items-center"
                  >
                    <p className="text-sm">{item.itemName}</p>
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => removeItem(item.id)}
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
                type="button"
                className="flex hover:cursor-pointer my-4 gap-1"
                onClick={addButton}
              >
                <LucidePlus color="black" className=" rounded-sm w-5 h-5" />
                <Typography> Add another highlight</Typography>
              </button>

              <div className="mt-4">
                <Typography
                  variant="h4"
                  fontWeight="semibold"
                  className="mt-8 mb-4"
                >
                  Activity Duration
                </Typography>
                <div className="flex gap-12">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      Hours
                    </Typography>
                    <div className="flex rounded-md">
                      <button
                        className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                        type="button"
                        onClick={() => {
                          durationHour > 0 &&
                            setDurationHour((durationHour) => durationHour - 1)
                        }}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <Input
                        label={""}
                        type="number"
                        id="duration-hour-input"
                        className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                        value={durationHour}
                        min={0}
                        {...register("durationHour")}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10)
                          setDurationHour(isNaN(val) ? 0 : val)
                        }}
                      />
                      <button
                        className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                        type="button"
                        onClick={() =>
                          setDurationHour((durationHour) => durationHour + 1)
                        }
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-2">
                      Minutes
                    </Typography>
                    <div className="flex rounded-md">
                      <button
                        className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                        type="button"
                        onClick={() => {
                          durationMinute > 0 &&
                            setDurationMinute(
                              (durationMinute) => durationMinute - 1
                            )
                        }}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        id="type-count"
                        className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                        value={durationMinute}
                        min={0}
                        {...register("durationMinute")}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          setDurationMinute(val)
                        }}
                      />
                      <button
                        className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                        type="button"
                        onClick={() =>
                          setDurationMinute(
                            (durationMinute) => durationMinute + 1
                          )
                        }
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Typography
                  variant="h4"
                  fontWeight="semibold"
                  className="mt-8 mb-4"
                >
                  Language/s spoken by host
                </Typography>

                {languages.map((language, index) => (
                  <div key={language} className="flex gap-2 my-2 ">
                    <Checkbox
                      id={index}
                      colorVariant="primary"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => toggleCheckbox(language)}
                    />
                    <label className="pt-0.5">{language}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
              <Button size="sm" onClick={handleSaveChanges}>
                {updatePending ? <Spinner>Loading...</Spinner> : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default BasicInfo

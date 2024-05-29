"use client"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import Checkbox from "@/common/components/ui/InputCheckbox"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import { LucideMinus, LucidePlus, MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

interface Item {
  id: number
  name: string
}

const languages = ["Filipino", "English", "German"]

const BasicInfo = () => {
  const clearItemData = {
    itemName: "",
  }

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [itemData, setItemData] = useState(clearItemData)
  const [itemList, setItemList] = useState<Item[]>([])
  const [durationHour, setDurationHour] = useState(0)
  const [durationMinute, setDurationMinute] = useState(0)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const lastId = itemList.reduce(
    (max, item) => (Number(item.id) > max ? Number(item.id) : max),
    0
  )

  const addButton = () => {
    const itemName = itemData.itemName.trim()
    if (!itemName) {
      toast.error("Activity highlights cannot be empty.")
      return
    }
    if (itemList.length >= 5) {
      toast.error("Maximum 5 items allowed.")
      return
    }
    const data = { id: lastId + 1, name: itemName }
    setItemList([...itemList, data])
    setItemData(clearItemData)
  }

  const removeItem = (idToRemove: number) => {
    setItemList((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    )
  }

  const toggleCheckbox = (language: string) => {
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    )
  }

  const handleFormSubmit = () => {
    if (description.length < 300) {
      toast.error("Minimum of 300 characters for description is needed.")
    }
    if (itemList.length < 3) {
      toast.error("Minimum of three highlights required.")
      return
    }
    const payload = {
      title: title,
      description: description,
      durationHour: durationHour,
      durationMinute: durationMinute,
      languages: selectedLanguages,
      highlights: itemList.map((item) => item.name),
    }
    console.log("Payload:", payload)
  }
  return (
    <div className="mt-20 mb-14">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mt-2">
            <Textarea
              className="mt-1"
              defaultValue={description}
              label="Add full description"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={3000}
            />
            <p className=" flex text-xs text-gray-500 justify-end">{`${description.length}/3000 characters`}</p>
          </div>
          <Input
            className=" p-2 rounded-md mt-2"
            value={itemData.itemName}
            type="text"
            label="Activity highlights"
            onChange={(event) =>
              setItemData({ ...itemData, itemName: event.target.value })
            }
          />

          <ul className="mt-4">
            {itemList.map((item) => (
              <li
                key={item.id}
                className="mt-2 p-2 border border-gray-300 rounded-md flex justify-between items-center"
              >
                <p className="text-sm">{item.name}</p>
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
            className="flex hover:cursor-pointer my-4 gap-2"
            onClick={addButton}
          >
            <LucidePlus
              color="white"
              className="bg-primary-400 rounded-sm w-5 h-5"
            />
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
                  <input
                    type="number"
                    id="type-count"
                    className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    value={durationHour}
                    min={0}
                    onChange={(e) => {
                      const val = parseInt(e.target.value)
                      setDurationHour(val)
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
                    onChange={(e) => {
                      const val = parseInt(e.target.value)
                      setDurationMinute(val)
                    }}
                  />
                  <button
                    className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                    type="button"
                    onClick={() =>
                      setDurationMinute((durationMinute) => durationMinute + 1)
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
              Languages
            </Typography>

            {languages.map((language, index) => (
              <div key={language} className="flex gap-2 my-2">
                <Checkbox
                  key={language}
                  id={index}
                  colorVariant="primary"
                  onChange={() => toggleCheckbox(language)}
                  checked={selectedLanguages.includes(language)}
                />
                <label>{language}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button size="sm" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo

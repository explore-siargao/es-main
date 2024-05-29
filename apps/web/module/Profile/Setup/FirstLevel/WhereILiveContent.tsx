import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Dispatch, useState } from "react"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import { LucideCheck } from "lucide-react"
import useProfileEditStore from "../store/useProfileEditStore"

const locationObj = [
  {
    loc: "Paete, Laguna",
  },
  {
    loc: "Santa Maria, Laguna",
  },
  {
    loc: "Longos, Kalayaan, Laguna",
  },
  {
    loc: "Santa Cruz, Laguna",
  },
]

const WhereILiveContent = ({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const filteredLocations = locationObj.filter((location) =>
    location.loc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowResults(e.target.value !== "")
  }

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location)
  }

  const handleLocationHover = (location: string | null) => {
    setHoveredLocation(location)
  }

  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase())
    if (index === -1) return text
    return (
      <>
        <span className="font-semibold">{text.substring(0, index)}</span>
        <span className="font-light">
          {text.substring(index, index + searchTerm.length)}
        </span>
        <span className="font-semibold">
          {text.substring(index + searchTerm.length)}
        </span>
      </>
    )
  }

  const setWhereILiveStore = useProfileEditStore((state) => state.setWhereILive)
  const save = () => {
    if (selectedLocation) {
      setWhereILiveStore(selectedLocation)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please select a location")
    }
  }

  return (
    <>
      <div className="p-5">
        <Typography variant="h2" className="font-semibold">
          Where you live
        </Typography>
        <div className="mt-6">
          <Input
            type="search"
            label="Where I live:"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {showResults && (
          <div>
            <ul>
              {filteredLocations.map((location) => (
                <Typography variant="h3" key={location.loc}>
                  <li
                    className="m-5"
                    onClick={() => handleLocationClick(location.loc)}
                    onMouseEnter={() => handleLocationHover(location.loc)}
                    onMouseLeave={() => handleLocationHover(null)}
                    style={{ cursor: "pointer", position: "relative" }}
                    onKeyDown={() => handleLocationClick(location.loc)}
                  >
                    {highlightMatch(location.loc)}
                    {(selectedLocation === location.loc ||
                      hoveredLocation === location.loc) && (
                      <span className="absolute right-0 top-1/3 transform -translate-y-1/2">
                        <LucideCheck />
                      </span>
                    )}
                  </li>
                </Typography>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t" />
      <div className="flex items-end justify-end p-5">
        <Button size="lg" variant="primary" onClick={() => save()}>
          Save
        </Button>
      </div>
    </>
  )
}

export default WhereILiveContent

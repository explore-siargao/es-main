import ToggleSwitch from "@/common/components/ui/Toggle"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"

interface IProfileFourthLevel {
  year: string
  destination: string
}

interface ProfileFourthLevelProps {
  description: IProfileFourthLevel[]
  initialChecked?: boolean
}

const ProfileFourthLevel = ({
  description,
  initialChecked = false,
}: ProfileFourthLevelProps) => {
  const [checked, setChecked] = useState(initialChecked)
  const handleToggleChange = () => {
    setChecked(!checked)
  }

  return (
    <div>
      <div className="pb-5">
        <Typography variant="h2" className="font-semibold pb-5">
          Your past trips
        </Typography>

        <Typography className="text-gray-600 flex items-end justify-between">
          <span>Show the destination I've traveled to.</span>
          <ToggleSwitch checked={checked} onChange={handleToggleChange} />
        </Typography>
      </div>

      <div className="flex justify-between gap-3 sm:flex-row overflow-x-auto">
        {description.map((item) => (
          <div
            key={item.destination}
            className={`w-full bg-gray-100 h-15 border p-5 pb-12 rounded-xl gap-5 ${
              checked ? "bg-primary-400" : "bg-primary-200 text-gray-300"
            }`}
            style={{
              transition: "background-color 0.2s ease-in-out",
            }}
          >
            <Typography variant="p" className="font-semibold">
              {item.year}
            </Typography>
            <Typography variant="h2" className="font-semibold">
              {item.destination}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileFourthLevel

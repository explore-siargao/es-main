import { Button } from "@/common/components/ui/Button"
import { useState } from "react"

const ActivityDescription = ({ description }: { description: string }) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false)
  const maximumLength = 600
  const slicedDescription =
    description?.length > maximumLength
      ? description.slice(0, maximumLength) + "....."
      : description
  return (
    <>
      <div className="flex text-md mb-2">{slicedDescription}</div>
    </>
  )
}

export default ActivityDescription

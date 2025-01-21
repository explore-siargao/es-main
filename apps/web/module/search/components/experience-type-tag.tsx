import { Typography } from "@/common/components/ui/Typography"

const ExperienceTypeTag = ({ isPrivate = false }: { isPrivate?: boolean }) => {
  return (
    <Typography
      variant="h5"
      className="px-2 text-text-500 font-semibold rounded-xl bg-white shadow absolute left-3 top-3 z-40"
    >
      {isPrivate ? "Private" : "Joiner"}
    </Typography>
  )
}

export default ExperienceTypeTag

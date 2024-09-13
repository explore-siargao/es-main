import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import inputMaxLength from "@/common/helpers/inputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const FavoriteSongInHighSchoolContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>
}) => {
  const { value: favoriteSong, onChange: handleInputChange } = inputMaxLength(
    "",
    40
  )
  const setFavoriteSongStore = useProfileEditStore(
    (state) => state.setFavoriteSong
  )
  const save = () => {
    if (favoriteSong) {
      setFavoriteSongStore(favoriteSong)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please fill out the form")
    }
  }
  return (
    <div>
      <div className="p-5">
        <Typography variant="h2" className="font-semibold mb-5">
          What was your favorite song in high school?
        </Typography>
        <Typography variant="h5">
          However embarrassing, share the tune you listened to on repeat as a
          teenager.
        </Typography>

        <div className="mt-6">
          <Input
            label="My favorite song in high school:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {favoriteSong.length}/40 characters
          </Typography>
        </div>
      </div>
      <div className="border-t" />
      <div className="flex items-end justify-end p-5">
        <Button size="lg" variant="primary" onClick={() => save()}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default FavoriteSongInHighSchoolContent

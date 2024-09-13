import useMarkerHoverStore from "@/common/store/useMarkerHoverStore"
import { ComponentProps } from "@/common/types/global"
import Listing from "@/module/Listing"

type SavedWishlistsProps = {
  itemId: number
  listingId: number
  location: string
  date: string
  distance: string
  price: number
  imageKey: []
  isNight: boolean
  ratings: string
  note: string
  showAddNote: () => void
}

const SavedWishlists = ({
  itemId,
  listingId,
  location,
  date,
  distance,
  price,
  imageKey,
  isNight,
  ratings,
  note,
  showAddNote,
}: SavedWishlistsProps) => {
  const setIsHover = useMarkerHoverStore((state) => state.setIsHover)
  const setSelectedHoverItem = useMarkerHoverStore(
    (state) => state.setSelectedItem
  )

  const AddEditNoteButton = ({ onClick, id, note }: ComponentProps) => (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className="text-text-300 underline hover:text-text-00 select-none"
    >
      {note === null ? "Add a note" : "Edit Note"}
    </button>
  )

  return (
    <div
      key={itemId}
      onMouseEnter={() => {
        setIsHover(true)
        setSelectedHoverItem(itemId)
      }}
      onMouseLeave={() => {
        setIsHover(false)
        setSelectedHoverItem(null)
      }}
    >
      <Listing
        key={itemId}
        listingId={listingId}
        location={location}
        date={date}
        distance={distance}
        //@ts-ignore
        price={"₱" + price}
        imageKey={imageKey}
        dayTime={isNight ? "Night" : ""}
        ratings={ratings}
        isHearted={true}
      />
      <div
        className={`${note && "bg-gray-100 px-3 py-2"} w-full mt-2 rounded-xl`}
      >
        {note === null ? (
          <AddEditNoteButton onClick={showAddNote} id={"addNoteBtn" + itemId} />
        ) : (
          note + " "
        )}
        {note !== null && (
          <AddEditNoteButton
            onClick={showAddNote}
            id={"editBtn" + itemId}
            note={note}
          />
        )}
      </div>
    </div>
  )
}

export default SavedWishlists

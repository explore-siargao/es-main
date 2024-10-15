import React from "react"
import { Button } from "@/common/components/ui/Button"
import { LucideSearch, LucideX } from "lucide-react"

const SearchReservation = ({
  setIsSearchModalOpen,
  searchString,
  setSearchString,
}: {
  setIsSearchModalOpen: (value: boolean) => void
  searchString: string
  setSearchString: (value: string) => void
}) => {
  return (
    <>
      {!searchString ? (
        <Button
          size={"sm"}
          variant={"default"}
          className="rounded-full w-full"
          onClick={() => setIsSearchModalOpen(true)}
        >
          <LucideSearch className="w-5" />
        </Button>
      ) : (
        <Button
          size={"sm"}
          variant={"default"}
          className="rounded-full w-full"
          onClick={() => setSearchString && setSearchString("")}
        >
          <LucideX className="w-5" />
        </Button>
      )}
    </>
  )
}

export default SearchReservation

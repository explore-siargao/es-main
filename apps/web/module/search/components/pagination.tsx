import { Typography } from "@/common/components/ui/Typography"
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
} from "lucide-react"
import React from "react"

interface PaginationProps {
  pageIndex: number
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  gotoPage: (pageIndex: number) => void
  previousPage: () => void
  nextPage: () => void
}

const Pagination = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center mt-12 gap-2">
      <button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        className="p-1 px-2 disabled:opacity-30"
      >
        {<LucideChevronsLeft />}
      </button>
      <button
        onClick={previousPage}
        disabled={!canPreviousPage}
        className="p-1 px-2 disabled:opacity-30"
      >
        {<LucideChevronLeft />}
      </button>
      <button
        onClick={nextPage}
        disabled={!canNextPage}
        className="p-1 px-2 disabled:opacity-30"
      >
        {<LucideChevronRight />}
      </button>
      <button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        className="p-1 px-2 disabled:opacity-30"
      >
        {<LucideChevronsRight />}
      </button>

      <span className="flex items-center gap-1">
        <Typography>Page</Typography>
        <Typography fontWeight="semibold">
          {pageIndex + 1} of {pageCount}
        </Typography>
      </span>
    </div>
  )
}

export default Pagination

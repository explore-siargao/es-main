import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import Pagination from "./Pagination"

interface TableProps<T> {
  data: T[]
  columns: any[]
  pageIndex?: number
  pageCount?: number
  canPreviousPage?: boolean
  canNextPage?: boolean
  gotoPage?: (pageIndex: number) => void
  previousPage?: () => void
  nextPage?: () => void
  pageSize?: number
}

const Table = <T,>({
  data,
  columns,
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
  pageSize,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className="w-full table-auto">
        <thead className="text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="pb-4"
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="hover:bg-primary-50 cursor-pointer" key={row.id}>
                {row.getVisibleCells().map((cell, _id) => {
                  let className = "p-2 items-center gap-5"
                  if (_id === 0) className += " rounded-l-xl"
                  if (_id === row.getVisibleCells().length - 1)
                    className += " rounded-r-xl"
                  return (
                    <td className={className} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        pageIndex={pageIndex as number}
        pageCount={pageCount as number}
        canPreviousPage={canPreviousPage as boolean}
        canNextPage={canNextPage as boolean}
        gotoPage={gotoPage as (pageIndex: number) => void}
        previousPage={previousPage as () => void}
        nextPage={nextPage as () => void}
      />
    </div>
  )
}

export default Table

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useState } from "react"

export default function GuideSelect() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative inline-block text-left -mt-0.5">
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <div className="inline-flex w-full justify-center rounded-md bg-white text-sm text-text-500 hover:text-text-950 underline-offset-4 hover:underline">
          Guides
          <ChevronDownIcon
            aria-hidden="true"
            className="h-5 w-5 text-text-500"
          />
        </div>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none ${
          isOpen
            ? "ease-out duration-100"
            : "scale-95 opacity-0 ease-in duration-75"
        }`}
      >
        <div className="py-1">
          <div>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Surfing
            </Link>
          </div>
          <div>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Restaurant
            </Link>
          </div>
          <div>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Getting to know island
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

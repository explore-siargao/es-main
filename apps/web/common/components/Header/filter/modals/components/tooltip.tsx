import React from "react"

const Tooltip = ({ text, visible }: { text: string; visible: boolean }) => {
  return (
    <div
      className={`absolute bottom-12 bg-gray-700 text-white text-xs rounded py-1 px-2 transition-opacity duration-150 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 1000, whiteSpace: "nowrap" }}
    >
      {text}
    </div>
  )
}

export default Tooltip

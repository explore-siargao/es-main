import React from "react"

const ProgressBar = ({
  progress,
  label,
}: {
  progress: number
  label?: string
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-secondary-400 h-full rounded-full text-center text-white"
        style={{ width: `${progress}%` }}
      >
        {label}
      </div>
    </div>
  )
}

export default ProgressBar

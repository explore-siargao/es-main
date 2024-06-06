import React from "react"
import data from "../../data.json"

function Directions() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-200 h-64 flex items-center justify-center rounded-md"></div>
        <div>
          <h2 className="text-xl font-bold mb-2">HOW TO GET THERE</h2>
          <p>{data.howToGetThere.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Directions

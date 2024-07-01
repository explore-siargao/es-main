import React from "react"

function SimilarRentals() {
  return (
    <div>
      <div className="grid gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Similar Rentals</h2>
          <div className="grid grid-flow-col space-x-16 mt-5">
            <div className="bg-primary-200 h-40 flex items-center justify-center rounded-2xl"></div>
            <div className="bg-primary-200 h-40 flex items-center justify-center rounded-2xl"></div>
            <div className="bg-primary-200 h-40 flex items-center justify-center rounded-2xl"></div>
            <div className="bg-primary-200 h-40 flex items-center justify-center rounded-2xl"></div>
            <div className="bg-primary-200 h-40 flex items-center justify-center rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarRentals

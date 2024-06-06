import React from 'react'

function Forecast() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">SIARGAO SURF FORECAST</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-primary-200 h-72 flex items-center justify-center rounded-md"></div>
        <div className="bg-primary-200 h-72 flex items-center justify-center rounded-md"></div>
      </div>
    </div>
  )
}

export default Forecast
import React from "react"

function TopThingsToDo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Top Things To Do</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        <li>
        Enjoy swimming in the natural pools with clear waters and unique rock formations during low tide.
        </li>
        <li>
        Experience the thrill of cliff jumping into deeper sections of the pools (if you're adventurous and it's safe to do so).
        </li>
        <li>
        Capture stunning shots of the rock pools, turquoise waters, and scenic coastal views through photography.
        </li>
        <li>
        Discover diverse marine life such as fish and crabs in the tide pools while exploring.
        </li>
        <li>
        Relax on the flat rocks surrounding the pools, sunbathe, and take in the natural beauty of the area.
        </li>
      </ul>
      <h2 className="text-xl font-bold mt-10 mb-2">Foodie Notes</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        <li> Try local specialties like grilled fish, seafood soups, or adobo (a popular Filipino dish with meat marinated and cooked in soy sauce, vinegar, and garlic).</li>
        <li>Look out for vendors selling fresh tropical fruits like mangoes, pineapples, and bananas. They make for refreshing snacks and are widely available in the area..</li>
      </ul>
    </div>
  )
}

export default TopThingsToDo

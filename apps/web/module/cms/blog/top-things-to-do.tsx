import React from "react"

function TopThingsToDo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Top Things To Do</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        <li>
          Island Hopping in Siargao, Explore secret beaches and turquoise waters
          around Siargao's stunning islands.
        </li>
        <li>
          Magpupungko, Natural tidal pools perfect for a refreshing dip and
          breathtaking views.
        </li>
        <li>Pacifico, Relax and dine amidst scenic views on Pacifico Beach.</li>
        <li>Maasin River, Kayak through lush mangroves and serene waters.</li>
        <li>
          Palm Forest, Wander through a mystical forest of towering palms.
        </li>
        <li>
          Secret beaches of Siargao, Uncover secluded shores and pristine sands
          dotted around the island.
        </li>
      </ul>
      <h2 className="text-xl font-bold mt-10 mb-2">Foodie Notes</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        <li>
          {" "}
          If you like bowls and smoothies, Shaka Café is a must-visit on
          Siargao. Located with a view of Cloud 9 and swings, it offers a
          relaxed setting with affordable prices (250 pesos, €4.30) and quality
          food.
        </li>
        <li>
          Previously a local favorite for economical barbecue, Mama’s Grill is
          now closed. It was known for its good food and low prices, despite
          slow and sometimes unfriendly service.
        </li>
        <li>
          For excellent pizzas made with fresh ingredients, Bulan Villas is your
          go-to Italian restaurant on the island. Prices are higher (around €10
          per pizza) but the ambiance and service are top-notch.
        </li>
        <li>
          Renowned for the best tacos and burritos on Siargao, Miguel’s Taqueria
          offers reasonable prices and ice-cold beer.
        </li>
        <li>
          For authentic and budget-friendly dining, head to the port area.
          Lalay’s Grill is recommended for its local cuisine and vibrant
          atmosphere.
        </li>
      </ul>
    </div>
  )
}

export default TopThingsToDo

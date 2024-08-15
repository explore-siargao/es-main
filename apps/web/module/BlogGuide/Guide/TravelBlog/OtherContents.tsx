import React from "react"

type T_TopThingsToDo = {
  item: string
}

type T_FoodNotes = {
  item: string
}

type T_Props = {
  readonly thingsToDo: T_TopThingsToDo[]
  readonly foodNotes: T_FoodNotes[]
}

function OtherContents({ thingsToDo, foodNotes }: T_Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Top Things To Do</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        {thingsToDo.map((activity, index) => (
          <li key={index}>{activity.item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-2">Foodie Notes</h2>
      <ul className="grid list-disc ml-16 space-y-5">
        {foodNotes.map((note, index) => (
          <li key={index}>{note.item}</li>
        ))}
      </ul>
    </div>
  )
}

export default OtherContents

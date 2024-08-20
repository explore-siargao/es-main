import type { Field } from "payload/types"

export const content: Field = {
  name: "content",
  label: false,
  type: "group",
  fields: [
    {
      type: "point",
      name: "location",
      label: "Location",
      required: true,
    },
    {
      type: "textarea",
      name: "locationGuide",
      label: "How to get there?",
      required: true,
    },
  ],
}

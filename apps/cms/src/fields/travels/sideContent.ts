import { Field } from "payload/types"

export const sideContent: Field = {
  name: "sideContent",
  label: false,
  type: "group",
  fields: [
    {
      name: "popularTravels",
      type: "array",
      label: "Popular Travel",
      minRows: 1,
      maxRows: 3,
      labels: {
        singular: "Travel",
        plural: "Travels",
      },
      fields: [
        {
          name: "travel",
          label: "Select a travel",
          type: "relationship",
          relationTo: "travels", // Slug of the target collection
        },
      ],
    },
    {
      name: "pageSummary",
      required: false,
      type: "array",
      label: "Page Summary",
      labels: {
        singular: "Page Summary",
        plural: "Page Summary",
      },
      fields: [
        {
          name: "item",
          type: "text",
        },
      ],
    },
  ],
}

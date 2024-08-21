import { Field } from "payload/types"

export const sideContent: Field = {
  name: "sideContent",
  label: false,
  type: "group",
  fields: [
    {
      name: "popularGuides",
      type: "array",
      label: "Popular Guides",
      minRows: 2,
      maxRows: 10,
      labels: {
        singular: "Guide",
        plural: "Guides",
      },
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "pageSummary",
      type: "array",
      label: "Page Summary",
      minRows: 2,
      maxRows: 10,
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

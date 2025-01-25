import { Field } from "payload/types"

export const sideContent: Field = {
  name: "sideContent",
  label: false,
  type: "group",
  fields: [
    {
      name: "popularBlogs",
      type: "array",
      label: "Popular Blogs",
      // minRows: 2,
      // maxRows: 5,
      labels: {
        singular: "Blog",
        plural: "Blogs",
      },
      fields: [
        {
          name: "blog",
          label: "Select a blog",
          type: "relationship",
          relationTo: "blogs", // Slug of the target collection
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

import { Field } from "payload/types"

export const hero: Field = {
  name: "hero",
  label: false,
  type: "group",
  fields: [
    {
      type: "array",
      name: "images",
      label: "Images",
      required: true,
      minRows: 3,
      maxRows: 5,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}

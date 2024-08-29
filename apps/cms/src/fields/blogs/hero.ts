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
      minRows: 5,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      type: "text",
      name: "link",
      label: "Link",
    },
    {
      type: "text",
      name: "email",
      label: "Email Link",
    },
    {
      type: "text",
      name: "messages",
      label: "Messages Link",
    },
    {
      type: "text",
      name: "whatsapp",
      label: "WhatsApp Link",
    },
    {
      type: "text",
      name: "messenger",
      label: "Messenger Link",
    },
    {
      type: "text",
      name: "facebook",
      label: "Facebook Link",
    },
    {
      type: "text",
      name: "twitter",
      label: "Twitter Link",
    },
  ],
}

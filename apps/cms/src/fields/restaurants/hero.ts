import type { Field } from "payload/types"

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
      type: "row",
      fields: [
        {
          type: "number",
          name: "priceRangeLow",
          label: "Price Range (Lowest)",
          required: true,
        },
        {
          type: "number",
          name: "priceRangeHigh",
          label: "Price Range (Highest)",
          required: true,
        },
      ],
    },
    {
      type: "text",
      name: "cuisine",
      label: "Cuisine Type",
      required: true,
    },
    {
      type: "array",
      name: "menus",
      label: "Menu",
      fields: [
        {
          type: "upload",
          name: "menu",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "specialAndEvents",
      label: "Special and Events",
      fields: [
        {
          type: "text",
          name: "eventTitle",
          label: "Title",
          required: true,
        },
        {
          type: "text",
          name: "eventDesc",
          label: "Description",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "links",
      label: "Links",
      fields: [
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
    },
  ],
}

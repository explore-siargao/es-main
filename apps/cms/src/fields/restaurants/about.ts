import type { Field } from "payload/types"

export const about: Field = {
  name: "about",
  label: false,
  type: "group",
  fields: [
    {
      type: "textarea",
      name: "aboutPlace",
      label: "About this place",
      required: true,
    },
    {
      type: "textarea",
      name: "aboutSpace",
      label: "About space",
      required: true,
    },
    {
      type: "textarea",
      name: "aboutGuestAccess",
      label: "About guest access",
      required: true,
    },
    {
      type: "textarea",
      name: "otherThings",
      label: "Other things to note",
      required: true,
    },
  ],
}

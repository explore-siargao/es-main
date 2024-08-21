import type { Field } from "payload/types"

export const location: Field = {
  name: "locations",
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
      type: "text",
      name: "address",
      label: "Address",
      required: true,
    },
    {
      type: "text",
      name: "phoneNumber",
      label: "Phone number",
      required: true,
    },
    {
      type: "array",
      name: "businessHours",
      maxRows: 7,
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "day",
              admin: {
                readOnly: true,
              },
            },
            {
              type: "text",
              name: "open",
            },
            {
              type: "text",
              name: "closes",
            },
          ],
        },
      ],
      defaultValue: [
        { day: "Monday", open: "", closes: "" },
        { day: "Tuesday", open: "", closes: "" },
        { day: "Wednesday", open: "", closes: "" },
        { day: "Thursday", open: "", closes: "" },
        { day: "Friday", open: "", closes: "" },
        { day: "Saturday", open: "", closes: "" },
        { day: "Sunday", open: "", closes: "" },
      ],
    },
    {
      type: "text",
      name: "emailAddress",
      label: "Email address",
      required: true,
    },
    {
      type: "text",
      name: "facebookLink",
      label: "Facebook",
    },
    {
      type: "text",
      name: "instagramLink",
      label: "Instagram",
    },
  ],
}

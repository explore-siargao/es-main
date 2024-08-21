import type { Block, Field } from "payload/types"

const AccomodationBlock: Block = {
  slug: "accommodation",
  fields: [
    {
      type: "text",
      name: "accommodationName",
      label: "Name",
      required: true,
    },
    {
      type: "upload",
      name: "accommodationImage",
      label: "image",
      relationTo: "media",
      required: true,
    },
    {
      type: "text",
      name: "accommodationLink",
      label: "Link",
      required: true,
    },
  ],
}

export const content: Field = {
  name: "content",
  label: false,
  type: "group",
  fields: [
    {
      type: "textarea",
      name: "chefNote",
      label: "Chef's Note",
      required: true,
    },
    {
      type: "array",
      name: "amenities",
      label: "Amenities",
      fields: [
        {
          type: "text",
          name: "amenity",
          required: true,
        },
      ],
    },
    {
      type: "blocks",
      name: "nearbyAccommodations",
      blocks: [AccomodationBlock],
    },
  ],
}

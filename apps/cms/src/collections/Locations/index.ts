import type { CollectionConfig } from "payload/types"

import { slugField } from "../../fields/slug"
import { hero } from "../../fields/locations/hero"
import { content } from "../../fields/locations/content"
import { sideContent } from "../../fields/locations/sideContent"

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [content],
        },
        {
          label: "Side Content",
          fields: [sideContent],
        },
      ],
    },
  ],
  endpoints: [
    {
      path: "/guide/:slug",
      method: "get",
      handler: async (req, res) => {
        const { slug } = req.params
        const data = await req.payload.find({
          collection: "locations",
          where: {
            slug: {
              equals: slug,
            },
          },
        })

        if (!data) {
          return res.status(404).json({ message: "Data not found." })
        }

        return res.json(data)
      },
    },
  ],
}

export default Locations

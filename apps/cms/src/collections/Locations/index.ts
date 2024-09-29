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
      hasMany: true,
      admin: {
        position: "sidebar",
      },
      defaultValue: async () => {
        const response = await fetch(
          "/cms/api/categories?limit=1&where[id][equals]=66c411c3cc32a1ba4f9951dd"
        )
        const data = await response.json()
        const [category] = data.docs

        return [category.id]
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
          res.status(404).json({ message: "Data not found." })
        }

        res.json(data)
      },
    },
  ],
}

export default Locations

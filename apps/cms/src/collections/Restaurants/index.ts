import type { CollectionConfig } from "payload/types"

import { hero } from "../../fields/restaurants/hero"
import { slugField } from "../../fields/slug"
import { about } from "../../fields/restaurants/about"
import { location } from "../../fields/restaurants/location"
import { content } from "../../fields/restaurants/content"

const Restaurants: CollectionConfig = {
  slug: "restaurants",
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
          "/cms/api/categories?limit=1&where[id][equals]=66c3f0ac0e847de16240bc0c"
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
          label: "About",
          fields: [about],
        },
        {
          label: "Location",
          fields: [location],
        },
        {
          label: "Content",
          fields: [content],
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
          collection: "restaurants",
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

export default Restaurants

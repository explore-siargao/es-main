import type { CollectionConfig } from "payload/types"

import { slugField } from "../../fields/slug"
import { hero } from "../../fields/blogs/hero"
import { content } from "../../fields/blogs/content"
import { sideContent } from "../../fields/blogs/sideContent"

export const Blogs: CollectionConfig = {
  slug: "blogs",
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
          "/cms/api/categories?limit=1&where[id][equals]=66cbe82510950265d1a3c400"
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
      path: "/general/:slug",
      method: "get",
      handler: async (req, res) => {
        const { slug } = req.params
        const data = await req.payload.find({
          collection: "blogs",
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

export default Blogs

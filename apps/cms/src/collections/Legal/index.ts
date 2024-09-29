import type { CollectionConfig } from "payload/types"

import { slugField } from "../../fields/slug"
import { slateEditor } from "@payloadcms/richtext-slate"

export const Legal: CollectionConfig = {
  slug: "legals",
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

    {
      type: "richText",
      name: "mainContent",
      editor: slateEditor({}),
      required: true,
    },
    slugField(),
  ],
  endpoints: [
    {
      path: "/about/:slug",
      method: "get",
      handler: async (req, res) => {
        const { slug } = req.params
        const data = await req.payload.find({
          collection: "legals",
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

export default Legal

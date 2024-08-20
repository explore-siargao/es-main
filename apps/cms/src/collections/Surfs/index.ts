import { hero } from "../../fields/surfs/hero"
import { slugField } from "../../fields/slug"
import { CollectionConfig } from "payload/types"
import { content } from "../../fields/surfs/content"

const Surfs: CollectionConfig = {
  slug: "surfs",
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: "text",
      name: "title",
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
          collection: "surfs",
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

export default Surfs

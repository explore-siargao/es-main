import { hero } from "../../fields/surfs/hero"
import { slugField } from "../../fields/slug"
import { CollectionConfig } from "payload/types"
import { content } from "../../fields/surfs/content"
import useField from "payload/dist/admin/components/forms/useField"
import React from "react"

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
      hasMany: true,
      admin: {
        position: "sidebar",
      },
      defaultValue: async () => {
        const response = await fetch(
          "/cms/api/categories?limit=1&where[id][equals]=66c3f09f0e847de16240bbf7"
        )
        const data = await response.json()
        const [category] = data.docs

        return [category.id]
      },
    },
    {
      name: "customButton",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: (props) => {
            const { value: slug } = useField({ path: "slug" })
            const { value: status } = useField({ path: "_status" })
            if (status === "published") {
              const baseDomain = window.location.origin
              const externalUrl = `${baseDomain}/siargao/surfing/guides/${slug}`
              return (
                <button
                  type="button"
                  onClick={() => window.open(externalUrl, "_blank")}
                  style={{
                    display: "block",
                    margin: "1rem 0",
                    padding: "10px 15px",
                    background: "white",
                    color: "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Preview blog
                </button>
              )
            }
            return null
          },
        },
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
          res.status(404).json({ message: "Data not found." })
        }

        res.json(data)
      },
    },
  ],
}

export default Surfs

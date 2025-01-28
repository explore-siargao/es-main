import type { CollectionConfig } from "payload/types"
import React from "react"
import { slugField } from "../../fields/slug"
import { hero } from "../../fields/blogs/hero"
import { content } from "../../fields/blogs/content"
import { sideContent } from "../../fields/blogs/sideContent"
import useField from "payload/dist/admin/components/forms/useField"

const webUrl = process.env.NEXT_PUBLIC_WEB_URL

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
              const externalUrl = `${baseDomain}/blogs/${slug}`
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
          res.status(404).json({ message: "Data not found." })
        }

        res.json(data)
      },
    },
  ],
}

export default Blogs

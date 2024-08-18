import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { hero } from '../../fields/hero'
import { slugField } from '../../fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/posts/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    hidden: true,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              type: 'point',
              name: 'location',
              label: 'Location',
              required: true,
            },
            {
              type: 'richText',
              name: 'locationGuide',
              label: 'How to get there?',
              required: true,
            },
            // {
            //   type: 'array',
            //   name: 'idealConditions',
            //   minRows: 1,
            //   required: true,
            //   fields: [
            //     {
            //       type: 'text',
            //       name: 'conditionTitle',
            //       required: true,
            //     },
            //     {
            //       type: 'textarea',
            //       name: 'conditionDesc',
            //       required: true,
            //     },
            //     {
            //       type: 'text',
            //       name: 'overviewTitle',
            //       required: true,
            //     },
            //     {
            //       type: 'number',
            //       name: 'overviewRating',
            //       required: true,
            //     },
            //     {
            //       type: 'text',
            //       name: 'overviewLegend',
            //       required: true,
            //     },
            //     {
            //       type: 'textarea',
            //       name: 'overviewDesc',
            //       required: true,
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
    slugField(),
  ],
  endpoints: [
    {
      path: '/guide/:slug',
      method: 'get',
      handler: async (req, res) => {
        const { slug } = req.params
        const post = await req.payload.find({
          collection: 'posts',
          where: {
            slug: {
              equals: slug,
            },
          },
        })

        if (!post) {
          return res.status(404).json({ message: 'Post not found' })
        }

        return res.json(post)
      },
    },
  ],
}

import type { Field } from 'payload/types'

export const content: Field = {
  name: 'content',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'point',
      name: 'location',
      label: 'Location',
      required: true,
    },
    {
      type: 'textarea',
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
}

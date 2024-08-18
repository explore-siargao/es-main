import type { Field } from 'payload/types'
import richText from '../richText'
import largeBody from '../richText/largeBody'
import label from '../richText/label'

export const about: Field = {
  name: 'about',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'textarea',
      name: 'aboutPlace',
      label: 'About this place',
      required: true,
    },
    {
      type: 'textarea',
      name: 'aboutSpace',
      label: 'About space',
      required: true,
    },
    {
      type: 'textarea',
      name: 'aboutGuestAccess',
      label: 'About guest access',
      required: true,
    },
    {
      type: 'textarea',
      name: 'otherThings',
      label: 'Other things to note',
      required: true,
    },
  ],
}

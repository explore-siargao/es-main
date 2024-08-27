import { slateEditor } from "@payloadcms/richtext-slate"
import { Field } from "payload/types"

export const content: Field = {
  name: "content",
  label: false,
  type: "group",
  fields: [
    {
      type: "richText",
      name: "mainContent",
      editor: slateEditor({}),
      required: true,
    },
  ],
}

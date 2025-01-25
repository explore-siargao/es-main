import { slateEditor } from "@payloadcms/richtext-slate";
import { Field } from "payload/types";

export const content: Field = {
  name: "content",
  label: false,
  type: "group",
  fields: [
    {
      type: "richText",
      name: "mainContent",
      required: true,
      editor: slateEditor({
        admin: {
          elements: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "ul", "ol", "indent", "link", "upload"],
          leaves: ["bold", "italic", "underline", "strikethrough"], // Omit "code"
        },
      }),
    },
  ],
};
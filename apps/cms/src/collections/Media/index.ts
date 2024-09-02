import { S3UploadCollectionConfig } from "payload-s3-upload"

export const Media: S3UploadCollectionConfig = {
  slug: "media",
  upload: {
    staticURL: "/assets",
    staticDir: "assets",
    disableLocalStorage: true,
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
    },
    adminThumbnail: ({ doc }) => `/${doc.filename}`,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
}

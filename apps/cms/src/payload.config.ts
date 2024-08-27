import path from "path"
import { S3Client } from "@aws-sdk/client-s3"
import s3Upload from "payload-s3-upload"

import { payloadCloud } from "@payloadcms/plugin-cloud"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import { buildConfig } from "payload/config"

import Users from "./collections/Users"
import Surfs from "./collections/Surfs"
import Restaurants from "./collections/Restaurants"
import Locations from "./collections/Locations"
import Categories from "./collections/Categories"
import { Media } from "./collections/Media"
import Legal from "./collections/Legal"

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  routes: {
    admin: "/cms/admin",
    api: "/cms/api",
  },
  editor: slateEditor({}),
  collections: [Surfs, Restaurants, Locations, Legal, Media, Categories, Users],
  cors: [process.env.PAYLOAD_URL || "", process.env.WEB_URL || ""].filter(
    Boolean
  ),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadCloud(),
    s3Upload(
      new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      })
    ),
  ],
  db: mongooseAdapter({
    url: process.env.PAYLOAD_DATABASE_URI,
  }),
})
